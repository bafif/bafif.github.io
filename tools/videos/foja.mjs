// Foja's video (README, "Videos"): type a new subtitle and watch the preview
// follow, then try the three styles. Run with foja-ejemplo.js as --antes, which opens the example CV first.
const pasos = [];
let escrito = -1;
const texto = "Programador y técnico electrónico";

const en = (t, js) => pasos.push({ t, js, hecho: false });

en(
  4.4,
  `[...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Estilo y diseño")?.click()`,
);
for (const [t, nombre] of [
  [6.2, "Banda"],
  [8.8, "Minimal"],
  [11.4, "Legajo"],
]) {
  en(
    t,
    `[...document.querySelectorAll("button, [role=button], [role=radio], label")]
       .filter((b) => b.textContent.includes(${JSON.stringify(nombre)}) && b.getClientRects().length)
       .sort((a, b) => a.textContent.length - b.textContent.length)[0]?.click()`,
  );
}

export default async function guion(pagina, t) {
  // From 0.8 s to 3.4 s the subtitle is typed one letter at a time.
  if (t >= 0.8 && t < 4.0) {
    const n = Math.min(texto.length, Math.floor(((t - 0.8) / 2.6) * texto.length));
    if (n !== escrito) {
      escrito = n;
      await pagina.evaluar(`(() => {
        const el = [...document.querySelectorAll("input")].find((c) => c.labels?.[0]?.textContent.trim() === "Subtítulo");
        if (!el) return;
        el.focus();
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(el, ${JSON.stringify(texto)}.slice(0, ${n}));
        el.dispatchEvent(new Event("input", { bubbles: true }));
      })()`);
    }
  }
  for (const paso of pasos) {
    if (!paso.hecho && t >= paso.t) {
      paso.hecho = true;
      await pagina.evaluar(`(() => { ${paso.js}; return true; })()`);
    }
  }
}
