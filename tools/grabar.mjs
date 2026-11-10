#!/usr/bin/env node
// Records a web page (or a part of it) to video, or takes still captures, with headless Chrome.
// No dependencies: Node 22+ (fetch and WebSocket) and google-chrome. Run from the host, like the link preview.
//
//   node tools/grabar.mjs captura <url> <out-dir> [--ancho 1366 --alto 900 --esperar 1500] [selector...]
//   node tools/grabar.mjs video <url> <out.mp4> [--ancho 1280 --alto 720 --segundos 8 --cps 30
//                                   --selector css --recorte css --oscuro --guion file.mjs]
//
// Video: every CSS animation and transition is slowed down (Animation.setPlaybackRate), frames are captured as fast
// as Chrome gives them, each frame is stamped with the page's own animation time, and ffmpeg resamples them to a
// steady frame rate. The result is smooth even though a capture takes far longer than a frame. --guion loads a
// module whose default export `async (pagina, t) => {}` runs before every frame with the animation time t in
// seconds; it can scroll or type to tell a story (pagina.evaluar runs an expression in the page).

import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [modo, url, salida, ...resto] = process.argv.slice(2);
if (!modo || !url || !salida) {
  console.error("uso: grabar.mjs captura|video <url> <salida> [opciones]");
  process.exit(2);
}

const opciones = { ancho: 1280, alto: 720, esperar: 1500, segundos: 8, cps: 30, lento: 0.1 };
const selectores = [];
for (let i = 0; i < resto.length; i++) {
  const a = resto[i];
  if (a === "--oscuro") opciones.oscuro = true;
  else if (a === "--quieto") opciones.quieto = true;
  else if (a.startsWith("--")) opciones[a.slice(2)] = resto[++i];
  else selectores.push(a);
}
for (const k of ["ancho", "alto", "esperar", "segundos", "cps", "lento", "escala"]) {
  if (opciones[k] !== undefined) opciones[k] = Number(opciones[k]);
}

const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const perfil = mkdtempSync(join(tmpdir(), "grabar-"));
const puerto = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn(
  process.env.CHROME ?? "google-chrome",
  [
    "--headless=new",
    `--remote-debugging-port=${puerto}`,
    `--user-data-dir=${perfil}`,
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--window-size=${opciones.ancho},${opciones.alto}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

async function conectar() {
  for (let i = 0; i < 100; i++) {
    try {
      const pestañas = await (await fetch(`http://127.0.0.1:${puerto}/json/list`)).json();
      const pagina = pestañas.find((p) => p.type === "page");
      if (pagina) return pagina.webSocketDebuggerUrl;
    } catch {}
    await espera(100);
  }
  throw new Error("Chrome no respondió");
}

const ws = new WebSocket(await conectar());
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let siguiente = 0;
const pendientes = new Map();
const oyentes = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pendientes.has(m.id)) {
    const { ok, mal } = pendientes.get(m.id);
    pendientes.delete(m.id);
    m.error ? mal(new Error(`${m.error.message} ${m.error.data ?? ""}`)) : ok(m.result);
  } else if (m.method && oyentes.has(m.method)) {
    for (const f of oyentes.get(m.method)) f(m.params);
  }
});
const cdp = (method, params = {}) =>
  new Promise((ok, mal) => {
    const id = ++siguiente;
    pendientes.set(id, { ok, mal });
    ws.send(JSON.stringify({ id, method, params }));
  });
const evento = (method) =>
  new Promise((r) => {
    const lista = oyentes.get(method) ?? [];
    const f = (p) => {
      lista.splice(lista.indexOf(f), 1);
      r(p);
    };
    lista.push(f);
    oyentes.set(method, lista);
  });
const evaluar = async (expression) =>
  (await cdp("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;

await cdp("Page.enable");
await cdp("Runtime.enable");
await cdp("Animation.enable");
await cdp("Emulation.setDeviceMetricsOverride", {
  width: opciones.ancho,
  height: opciones.alto,
  deviceScaleFactor: opciones.escala ?? 1,
  mobile: false,
});
await cdp("Emulation.setEmulatedMedia", {
  features: [
    { name: "prefers-color-scheme", value: opciones.oscuro ? "dark" : "light" },
    { name: "prefers-reduced-motion", value: opciones.quieto ? "reduce" : "no-preference" },
  ],
});

const cargada = evento("Page.loadEventFired");
await cdp("Page.navigate", { url });
await cargada;
await evaluar("document.fonts.ready.then(() => true)");

async function recorte(selector) {
  const caja = await evaluar(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height };
  })()`);
  if (!caja) throw new Error(`no encontré ${selector}`);
  return { ...caja, scale: 1 };
}

async function captura(clip) {
  const { data } = await cdp("Page.captureScreenshot", { format: "png", ...(clip ? { clip } : {}) });
  return Buffer.from(data, "base64");
}

if (modo === "captura") {
  mkdirSync(salida, { recursive: true });
  const lista = selectores.length ? selectores : ["body"];
  for (const [i, selector] of lista.entries()) {
    await evaluar(`document.querySelector(${JSON.stringify(selector)})?.scrollIntoView({ block: "start", behavior: "instant" })`);
    await espera(opciones.esperar);
    const nombre = selector.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "pagina";
    writeFileSync(join(salida, `${String(i + 1).padStart(2, "0")}-${nombre}.png`), await captura());
  }
} else if (modo === "video") {
  const guion = opciones.guion ? (await import(pathToFileURL(resolve(opciones.guion)).href)).default : null;
  const pagina = { evaluar, cdp, espera };
  if (opciones.selector) {
    await evaluar(`document.querySelector(${JSON.stringify(opciones.selector)})?.scrollIntoView({ block: "center", behavior: "instant" })`);
  }
  await espera(opciones.esperar);
  await cdp("Animation.setPlaybackRate", { playbackRate: opciones.lento });
  const cuadros = mkdtempSync(join(tmpdir(), "cuadros-"));
  const lista = [];
  const inicio = performance.now();
  let t = 0;
  let n = 0;
  while (t < opciones.segundos) {
    if (guion) await guion(pagina, t);
    const clip = opciones.recorte ? await recorte(opciones.recorte) : null;
    const png = await captura(clip);
    const archivo = join(cuadros, `${String(n++).padStart(5, "0")}.png`);
    writeFileSync(archivo, png);
    lista.push({ archivo, t });
    t = ((performance.now() - inicio) / 1000) * opciones.lento;
  }
  // Each frame lasts until the next one; ffmpeg turns that into a steady rate.
  const concat = lista
    .map((c, i) => `file '${c.archivo}'\nduration ${((lista[i + 1]?.t ?? opciones.segundos) - c.t).toFixed(4)}`)
    .join("\n");
  writeFileSync(join(cuadros, "lista.txt"), `${concat}\nfile '${lista.at(-1).archivo}'\n`);
  const webm = salida.endsWith(".webm");
  const args = [
    "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", join(cuadros, "lista.txt"),
    "-vf", `fps=${opciones.cps},scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p`,
    ...(webm
      ? ["-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1"]
      : ["-c:v", "libx264", "-preset", "slow", "-crf", "24", "-movflags", "+faststart"]),
    "-an", salida,
  ];
  await new Promise((ok, mal) =>
    spawn("ffmpeg", args, { stdio: "inherit" }).on("exit", (c) => (c ? mal(new Error(`ffmpeg ${c}`)) : ok())),
  );
  console.error(`${lista.length} cuadros capturados para ${opciones.segundos} s → ${salida}`);
  rmSync(cuadros, { recursive: true, force: true });
} else {
  console.error(`modo desconocido: ${modo}`);
}

ws.close();
chrome.kill();
await espera(300);
rmSync(perfil, { recursive: true, force: true });
