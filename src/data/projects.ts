import type { Localized, Text } from "../i18n";

// Every text a visitor reads is written in Spanish and English, side by side: `{ es: "…", en: "…" }`. The pages
// get them in one language through `localize` (src/i18n.ts), which stops the build when one is missing.

type ProjectLinkSource = { label: Text; href: string };
type ProjectImageSource = { src: string; alt: Text; width: number; height: number };
/** A short silent loop of the project running; the poster is its first frame. */
type ProjectVideoSource = { src: string; poster: string; label: Text; caption: Text; width: number; height: number };

/** Each showcase wears its own project's look; the skin picks the component that draws it. */
export type Skin = "tellmap" | "urna" | "xport" | "foja" | "rocola" | "pocket";

type ShowcaseSource = {
  id: string;
  skin: Skin;
  name: string | Text;
  kind: Text;
  tagline: Text;
  /** One line for the index at the top of the page. */
  short: Text;
  description: Text;
  highlights: Text[];
  stack: string[];
  year: number;
  status: string | Text;
  /** The first link is the main one. */
  links: ProjectLinkSource[];
  images: ProjectImageSource[];
  video?: ProjectVideoSource;
  specs?: { label: string | Text; value: string | Text }[];
  companion?: { name: Text; tagline: Text; href: string; image: ProjectImageSource };
};

type SmallProjectSource = {
  id: string;
  name: string;
  tagline: Text;
  description: Text;
  stack: string[];
  year: number;
  status: Text;
  href: string;
};

/** A showcase in one language, as the components get it. */
export type Showcase = Localized<ShowcaseSource>;
export type SmallProject = Localized<SmallProjectSource>;
export type ProjectImage = Localized<ProjectImageSource>;
export type ProjectVideo = Localized<ProjectVideoSource>;

const gh = (repo: string) => `https://github.com/bafif/${repo}`;
const site = (path: string) => `https://bafif.github.io/${path}/`;
const img = (file: string, alt: Text, width: number, height: number): ProjectImageSource => ({
  src: `/img/proyectos/${file}`,
  alt,
  width,
  height,
});
// Videos live in public/video/, each with a poster of the same name.
const video = (name: string, label: Text, caption: Text, width: number, height: number): ProjectVideoSource => ({
  src: `/video/${name}.mp4`,
  poster: `/video/${name}.webp`,
  label,
  caption,
  width,
  height,
});
const repository: Text = { es: "Repositorio", en: "Repository" };
const seeSite: Text = { es: "Ver el sitio", en: "See the site" };
const inDevelopment: Text = { es: "En desarrollo", en: "In development" };
const prototype: Text = { es: "Prototipo", en: "Prototype" };

export const showcases: ShowcaseSource[] = [
  {
    id: "tellmap",
    skin: "tellmap",
    name: "TellMAP",
    kind: { es: "Atlas histórico · Godot", en: "Historical atlas · Godot" },
    tagline: {
      es: "La historia del mundo en un mapa vivo, con sus fuentes a mano.",
      en: "The history of the world on a living map, with its sources at hand.",
    },
    short: {
      es: "Fronteras, pueblos y fuentes ordenados en el espacio y el tiempo.",
      en: "Borders, peoples and sources laid out in space and time.",
    },
    description: {
      es:
        "Un atlas para estudiar historia al revés: empezando por el mapa y por las fuentes. Movés la línea de tiempo y se " +
        "corren las fronteras, nacen las ciudades y aparecen los textos que se escribieron en cada lugar. Cada texto tiene " +
        "dos coordenadas: dónde y cuándo se escribió, y de qué lugar y época trata.",
      en:
        "An atlas for studying history the other way round: starting from the map and from the sources. Move the timeline " +
        "and the borders shift, cities are founded and the texts written in each place appear. Every text has two " +
        "coordinates: where and when it was written, and which place and period it is about.",
    },
    highlights: [
      {
        es:
          "Fronteras de 1637 entidades políticas, de 3400 a. C. a 2024, tomadas de Cliopatria (Seshat Global History " +
          "Databank): 13 400 registros revisados por historiadores.",
        en:
          "Borders of 1637 political entities, from 3400 BC to 2024, taken from Cliopatria (Seshat Global History " +
          "Databank): 13,400 records reviewed by historians.",
      },
      {
        es: "El mapa se divide en 58 000 unidades que siguen esas fronteras reales, no una grilla que las aproxima.",
        en: "The map is divided into 58,000 units that follow those real borders, not a grid that approximates them.",
      },
      {
        es:
          "Cada ficha separa las fuentes primarias de los estudios, dice qué tan segura es su fecha y lleva al texto " +
          "completo cuando está en dominio público: Wikisource, Perseus, el Proyecto Gutenberg o Internet Archive.",
        en:
          "Each entry keeps the primary sources apart from the studies, says how certain its date is and leads to the " +
          "full text when it is in the public domain: Wikisource, Perseus, Project Gutenberg or the Internet Archive.",
      },
      {
        es: "Las cifras antiguas son estimaciones publicadas, con su autor y su rango de incertidumbre. Lo que no se sabe, se dice.",
        en: "Ancient figures are published estimates, with their author and their range of uncertainty. When something isn't known, it says so.",
      },
      {
        es:
          "Relieve sombreado, ríos, costas con líneas de carta náutica y nombres que se curvan sobre el territorio, con tres " +
          "temas de interfaz y cuatro niveles de calidad gráfica.",
        en:
          "Shaded relief, rivers, coastlines drawn like a nautical chart and names that curve over the land, with three " +
          "interface themes and four levels of graphics quality.",
      },
      {
        es:
          "La enciclopedia son archivos JSON legibles, por paquetes: hoy trae un piloto completo del antiguo Egipto y una " +
          "muestra de once regiones.",
        en:
          "The encyclopedia is plain, readable JSON files in packs: today it carries a complete pilot of ancient Egypt and " +
          "a sample of eleven regions.",
      },
      {
        es: "Sin cuentas ni telemetría: corre en la computadora y solo consulta Wikipedia al abrir una ficha, con caché.",
        en: "No accounts and no telemetry: it runs on your computer and only asks Wikipedia when you open an entry, with a cache.",
      },
    ],
    stack: ["Godot 4.7", "GDScript", "Shaders", "QGIS", "JSON"],
    year: 2026,
    status: { es: "En desarrollo · v0.3.0", en: "In development · v0.3.0" },
    links: [
      { label: seeSite, href: site("tmap") },
      { label: { es: "Descargar 0.3.0", en: "Download 0.3.0" }, href: `${gh("tmap")}/releases/latest` },
      { label: repository, href: gh("tmap") },
    ],
    images: [
      img(
        "tellmap-egipto.webp",
        {
          es: "TellMAP en 1350 a. C.: Egipto seleccionado, con el panel que lista las fuentes escritas ahí en esa época, como las Cartas de Amarna y el Gran Himno a Atón",
          en: "TellMAP in 1350 BC: Egypt selected, with the panel that lists the sources written there at the time, such as the Amarna letters and the Great Hymn to the Aten",
        },
        1280,
        683,
      ),
    ],
    video: video(
      "tellmap",
      {
        es: "Video de TellMAP: la línea de tiempo corre de 1350 a. C. a 117 d. C. sobre el Mediterráneo, la República romana se vuelve imperio y el mapa vuela a Roma y abre su ficha",
        en: "Video of TellMAP: the timeline runs from 1350 BC to AD 117 over the Mediterranean, the Roman Republic becomes an empire and the map flies to Rome and opens its entry",
      },
      {
        es: "De 1350 a. C. a 117 d. C.: las fronteras cambian con la línea de tiempo, Roma pasa de república a imperio y al tocarla se abre su ficha.",
        en: "From 1350 BC to AD 117: the borders change with the timeline, Rome goes from republic to empire, and touching it opens its entry.",
      },
      1280,
      682,
    ),
  },
  {
    id: "urna-abierta",
    skin: "urna",
    name: "Urna Abierta",
    kind: { es: "App web instalable · fiscalización", en: "Installable web app · poll watching" },
    tagline: {
      es: "La app libre para organizar a los fiscales de tu partido, en cualquier elección.",
      en: "The free app to organize your party's poll watchers, in any election.",
    },
    short: {
      es: "Fiscales organizados con su propio servidor, aunque no haya señal.",
      en: "Poll watchers organized on their own server, even without signal.",
    },
    description: {
      es:
        "Fiscalizar bien una elección hoy exige una estructura que solo tienen los partidos grandes. Urna Abierta es una app " +
        "web instalable para que a una agrupación estudiantil o a un partido chico le alcance con su propio servidor. Cubre la " +
        "elección entera, del padrón y las mesas al escrutinio y la foto del acta, con una vista para cada rol: el fiscal ve " +
        "solo su mesa y tacha a quienes votan aunque no haya señal, y todo se sincroniza cuando vuelve la conexión. El " +
        "proyecto no aloja nada: no hay servidor central ni telemetría.",
      en:
        "Watching the polls properly today takes an organization only big parties have. Urna Abierta is an installable web " +
        "app so that a student group or a small party can do it with a server of its own. It covers the whole election, from " +
        "the voter roll and the polling tables to the count and the photo of the tally sheet, with a view for each role: a " +
        "poll watcher sees only their own table and crosses off whoever votes even without signal, and everything syncs " +
        "when the connection comes back. The project hosts nothing: there is no central server and no telemetry.",
    },
    highlights: [
      {
        es:
          "Protocolo de sincronización propio: con operaciones desordenadas y repetidas el resultado es siempre el mismo, y al " +
          "volver la señal no se pierde ni se duplica ninguna.",
        en:
          "A sync protocol of its own: with operations out of order and repeated, the result is always the same, and when " +
          "the signal comes back none is lost or duplicated.",
      },
      {
        es:
          "50 pruebas de punta a punta recorren una elección entera en el navegador, de crearla a borrar los nombres al " +
          "final, contra los contenedores reales, en Chrome de Android y en WebKit.",
        en:
          "50 end-to-end tests run through a whole election in the browser, from creating it to erasing the names at the " +
          "end, against the real containers, in Chrome for Android and in WebKit.",
      },
      {
        es:
          "Probada en un emulador de Android en modo avión: abre sin señal, sobrevive a un reinicio, avisa antes de perder " +
          "datos con el disco lleno y, al volver la señal, llega todo al servidor.",
        en:
          "Tested on an Android emulator in airplane mode: it opens without signal, survives a restart, warns before losing " +
          "data when the disk is full and, when the signal returns, everything reaches the server.",
      },
      {
        es:
          "Instalador de un solo ejecutable, probado instalando por SSH en Ubuntu: deja copias de seguridad cifradas que se " +
          "restauran enteras en otro servidor.",
        en:
          "A single-executable installer, tested by installing over SSH on Ubuntu: it leaves encrypted backups that restore " +
          "in full on another server.",
      },
      {
        es:
          "Pensada para servidores gratuitos: con 1 GB de RAM y un cuarto de procesador anduvo con 200 mesas en hora pico, en " +
          "una prueba de laboratorio.",
        en:
          "Made for free servers: with 1 GB of RAM and a quarter of a CPU it handled 200 polling tables at peak time, in a " +
          "lab test.",
      },
      {
        es: "Permisos por rol, un registro que nadie puede cambiar y herramientas para cumplir la ley de datos personales.",
        en: "Permissions by role, a log nobody can change and tools to comply with the personal data protection law.",
      },
      {
        es: "Diseño para quien nunca la abrió: una pregunta por pantalla, un botón principal y cinco temas en modo claro y oscuro.",
        en: "Designed for someone who has never opened it: one question per screen, one main button and five themes in light and dark mode.",
      },
    ],
    stack: ["TypeScript", "Svelte", "Fastify", "PostgreSQL", "PWA", "Caddy", "Python", "RapidOCR", "Playwright", "Podman"],
    year: 2026,
    status: inDevelopment,
    links: [
      { label: seeSite, href: site("urna-abierta") },
      { label: repository, href: gh("urna-abierta") },
    ],
    images: [
      img(
        "urna-telefonos-claro.webp",
        {
          es: "Tres pantallas de Urna Abierta en el tema Aula: el plan del día, el padrón de la mesa con 281 votos por delante y el conteo de sobres",
          en: "Three Urna Abierta screens in the Aula theme: the day's plan, the polling table's voter roll with 281 votes to go and the envelope count",
        },
        1200,
        972,
      ),
      img(
        "urna-telefonos-oscuro.webp",
        {
          es: "Las mismas tres pantallas de Urna Abierta en el tema Aula de noche, verde pizarrón con botones amarillos",
          en: "The same three Urna Abierta screens in the Aula theme at night, blackboard green with yellow buttons",
        },
        1200,
        972,
      ),
    ],
    companion: {
      name: { es: "Escáner de padrones", en: "Voter roll scanner" },
      tagline: {
        es:
          "Lee padrones escaneados con OCR en la propia computadora y los pasa al formato abierto que lee la app. En dos " +
          "padrones reales, el 98,4 % de los documentos coincide entre escaneos independientes.",
        en:
          "Reads scanned voter rolls with OCR on your own computer and turns them into the open format the app reads. On " +
          "two real voter rolls, 98.4% of the ID numbers match between independent scans.",
      },
      href: gh("urna-abierta-padrones"),
      image: img(
        "urna-lector.webp",
        {
          es: "El escáner de padrones pidiendo revisar una fila dudosa: la imagen escaneada arriba y el DNI marcado para corregir",
          en: "The voter roll scanner asking to check a doubtful row: the scanned image on top and the ID number marked for correction",
        },
        1280,
        800,
      ),
    },
  },
  {
    id: "xport",
    skin: "xport",
    name: "xport",
    kind: { es: "Extensión + servicio local", en: "Extension + local service" },
    tagline: {
      es: "Los tweets de una cuenta de X, entre dos fechas, en un CSV.",
      en: "An X account's tweets, between two dates, in a CSV.",
    },
    short: {
      es: "Tweets por rango de fechas a CSV, con el tope de uso fijado en el código.",
      en: "Tweets by date range to CSV, with the usage cap fixed in the code.",
    },
    description: {
      es:
        "Una extensión para Chrome y Firefox recorre la búsqueda de X por vos, copia lo que la página ya descargó y se lo " +
        "pasa a un servicio local en FastAPI, que lo guarda sin repetir y arma un CSV por cuenta. Todo gira alrededor de un " +
        "tope: nunca más de 900.000 posts en cualquier ventana de 24 horas, por debajo del millón que permiten los términos " +
        "de X. El tope es una constante del código, no una opción de configuración.",
      en:
        "A Chrome and Firefox extension goes through X's search for you, copies what the page has already downloaded and " +
        "hands it to a local FastAPI service, which stores it without repeats and builds a CSV per account. Everything turns " +
        "on a cap: never more than 900,000 posts in any 24-hour window, below the million X's terms allow. The cap is a " +
        "constant in the code, not a setting.",
    },
    highlights: [
      {
        es: "Ventana deslizante de 24 h, con su registro en una base SQLite aparte: borrar los tweets no pone la cuenta en cero.",
        en: "A sliding 24-hour window, logged in a separate SQLite database: deleting the tweets doesn't reset the count.",
      },
      {
        es:
          "La extensión, hecha con WXT, recorre la búsqueda sola, esquiva el corte de unos 1000 resultados achicando el rango " +
          "y retoma entre sesiones desde lo ya capturado.",
        en:
          "The extension, built with WXT, goes through the search by itself, gets around the cutoff at about 1000 results " +
          "by narrowing the range and resumes across sessions from what it already captured.",
      },
      {
        es: "Arquitectura por capas con el backend intercambiable (scraping o API oficial) detrás de una interfaz.",
        en: "A layered architecture with a swappable backend (scraping or the official API) behind an interface.",
      },
      {
        es: "Más de 300 tests, tipado estricto con mypy y lint con ruff; el servicio corre en un contenedor Alpine (Podman) detrás de nginx.",
        en: "Over 300 tests, strict typing with mypy and linting with ruff; the service runs in an Alpine container (Podman) behind nginx.",
      },
    ],
    stack: ["Python 3.12", "FastAPI", "SQLite", "TypeScript", "WXT", "Podman", "uv", "mypy"],
    year: 2026,
    status: "Beta",
    links: [
      { label: seeSite, href: site("xport") },
      { label: repository, href: gh("xport") },
    ],
    images: [
      img(
        "xport-popup.webp",
        {
          es: "El popup de xport con datos de ejemplo: servicio local, cuenta, rango de fechas, los botones Capturar y Exportar CSV y el uso de las últimas 24 horas",
          en: "xport's popup with sample data: local service, account, date range, the capture and CSV export buttons and the usage over the last 24 hours",
        },
        720,
        1232,
      ),
    ],
  },
  {
    id: "foja",
    skin: "foja",
    name: "Foja",
    kind: { es: "Editor web · Typst", en: "Web editor · Typst" },
    tagline: { es: "Tu CV en Typst, sin escribir código.", en: "Your CV in Typst, without writing code." },
    short: {
      es: "Un editor de currículums con formularios y la vista previa real.",
      en: "A CV editor with forms and the real preview.",
    },
    description: {
      es:
        "Empezó como el generador de mi propio CV: los datos en JSON y Markdown, un perfil por postulación que elige qué " +
        "mostrar, y dos generadores sobre los mismos datos, uno en Python que compone con LaTeX y otro en C17 que escribe " +
        "el PDF a mano. Los dos siguen en el repo. Foja le pone una interfaz encima: un editor que corre entero en el " +
        "navegador, con formularios en lugar de archivos, Typst por debajo y una vista previa que es el resultado real.",
      en:
        "It started as the generator of my own CV: the data in JSON and Markdown, one profile per application that picks " +
        "what to show, and two generators over the same data, one in Python that typesets with LaTeX and one in C17 that " +
        "writes the PDF by hand. Both are still in the repository. Foja puts an interface on top: an editor that runs " +
        "entirely in the browser, with forms instead of files, Typst underneath and a preview that is the real output.",
    },
    highlights: [
      {
        es: "Un banco de entradas y un perfil por cada tipo de trabajo, cargados con formularios.",
        en: "A bank of entries and a profile for each kind of job, filled in with forms.",
      },
      {
        es: "Vista previa en vivo con Typst en el navegador, que avisa si el CV entra en una página.",
        en: "A live preview with Typst in the browser, which tells you whether the CV fits on one page.",
      },
      {
        es: "Exporta a PDF, JPG, Word, Typst, LaTeX, Markdown y JSON, sin cuentas ni servidor; funciona sin conexión.",
        en: "Exports to PDF, JPG, Word, Typst, LaTeX, Markdown and JSON, with no accounts or server; works offline.",
      },
      { es: "Tres estilos propios, y estilos nuevos escritos en Typst.", en: "Three styles of its own, and new styles written in Typst." },
    ],
    stack: ["TypeScript", "Typst", "Astro", "React", "Python", "C17", "LaTeX"],
    year: 2026,
    status: { es: "En línea · en desarrollo", en: "Online · in development" },
    links: [
      { label: { es: "Abrir el editor", en: "Open the editor" }, href: site("foja") },
      { label: repository, href: gh("foja") },
      { label: { es: "Generador v1.0.0", en: "Generator v1.0.0" }, href: `${gh("foja")}/releases/tag/cvgen-v1.0.0` },
    ],
    images: [
      img(
        "foja-editor.webp",
        {
          es: "El editor de Foja: a la izquierda el formulario de una entrada de experiencia, a la derecha la vista previa de mi CV, con esa entrada resaltada",
          en: "Foja's editor: on the left the form of a work experience entry, on the right the preview of my CV, with that entry highlighted",
        },
        1200,
        720,
      ),
    ],
    video: video(
      "foja",
      {
        es: "Video del editor de Foja: se escribe un subtítulo nuevo y la vista previa lo muestra enseguida; después el mismo CV pasa por los estilos Banda, Minimal y Legajo",
        en: "Video of Foja's editor: a new subtitle is typed and the preview shows it right away; then the same CV goes through the Banda, Minimal and Legajo styles",
      },
      {
        es: "Lo que escribís aparece en la vista previa enseguida, y el mismo CV pasa por los tres estilos: Banda, Minimal y Legajo.",
        en: "What you type shows up in the preview right away, and the same CV goes through the three styles: Banda, Minimal and Legajo.",
      },
      1440,
      860,
    ),
  },
  {
    id: "rocola",
    skin: "rocola",
    name: "Rocola",
    kind: { es: "Sistema booteable · Debian i386", en: "Bootable system · Debian i386" },
    tagline: {
      es: "Un pendrive que convierte cualquier PC vieja en una rocola de arcade.",
      en: "A USB stick that turns any old PC into an arcade jukebox.",
    },
    short: {
      es: "Un pendrive que vuelve rocola a una PC vieja, con temas de rocolas de época.",
      en: "A USB stick that turns an old PC into a jukebox, with themes from vintage jukeboxes.",
    },
    description: {
      es:
        "Sistema operativo mínimo basado en Debian i386 que arranca desde un pendrive con una interfaz de rocola propia. " +
        "Un instalador guiado lo clona al disco interno y la máquina queda como jukebox dedicada: abre sola al prender, " +
        "se maneja con controles de arcade y está pensada para monitores modernos y de tubo, incluidos los de 15 kHz.",
      en:
        "A minimal operating system based on Debian i386 that boots from a USB stick into a jukebox interface of its own. " +
        "A guided installer clones it to the internal disk and the machine becomes a dedicated jukebox: it opens by itself " +
        "at power-on, it is driven with arcade controls and it is made for modern and CRT monitors, 15 kHz ones included.",
    },
    highlights: [
      {
        es: "ISO híbrida que arranca por BIOS y por UEFI x64, verificada de punta a punta en QEMU/KVM.",
        en: "A hybrid ISO that boots on BIOS and on UEFI x64, checked end to end in QEMU/KVM.",
      },
      {
        es: "El instalador clona el sistema a un disco vacío y ese disco arranca solo, también probado por BIOS y UEFI; al reinstalar conserva la música.",
        en: "The installer clones the system to an empty disk and that disk boots by itself, also tested on BIOS and UEFI; reinstalling keeps the music.",
      },
      {
        es: "Soporte CRT: VGA de 31 kHz y arcade/TV de 15 kHz con switchres y modelines, con vuelta segura a VGA.",
        en: "CRT support: 31 kHz VGA and 15 kHz arcade/TV with switchres and modelines, with a safe fallback to VGA.",
      },
      {
        es:
          "Cuatro temas de rocolas de época, ya diseñados: Ámbar (fines de los 40, con tubos de burbujas), Cromo (mediados " +
          "de los 50), Neón (los 60 y 70) y Display (los 80, de LED y pensado para 240p). Ámbar va a venir por defecto desde la v0.1.2.",
        en:
          "Four themes from vintage jukeboxes, already designed: Ámbar (late '40s, with bubble tubes), Cromo (mid-'50s), " +
          "Neón (the '60s and '70s) and Display (the '80s, LED, made for 240p). Ámbar will be the default from v0.1.2.",
      },
      {
        es: "Interfaz propia en SDL2 (Python y pygame) sobre MPD: biblioteca por artista y álbum, portada del disco al reproducir, logos y tema reemplazables y controles reasignables desde la configuración.",
        en: "Its own SDL2 interface (Python and pygame) on top of MPD: library by artist and album, the record's cover while it plays, replaceable logos and theme, and controls that can be remapped from the settings.",
      },
      {
        es: "Importa la música de un segundo pendrive apenas se enchufa: lo monta solo lectura, no duplica y la biblioteca se actualiza sola.",
        en: "Imports the music from a second USB stick as soon as it is plugged in: it mounts it read-only, never duplicates, and the library updates by itself.",
      },
      {
        es: "Salida de audio por PipeWire elegible desde la interfaz: analógica, HDMI, USB o parlantes Bluetooth.",
        en: "Audio output through PipeWire, picked from the interface: analog, HDMI, USB or Bluetooth speakers.",
      },
      {
        es: "Tests de la interfaz sin pantalla (SDL dummy y un MPD simulado), CI con ruff y shellcheck.",
        en: "Interface tests without a screen (SDL's dummy driver and a simulated MPD), CI with ruff and shellcheck.",
      },
      {
        es: "Build reproducible en contenedores (Podman) y releases con sumas SHA-256 publicadas.",
        en: "A reproducible build in containers (Podman) and releases with published SHA-256 sums.",
      },
    ],
    stack: ["Debian i386", "Python", "SDL2", "MPD", "Podman", "GRUB"],
    year: 2026,
    status: { es: "Beta pública · v0.1.1", en: "Public beta · v0.1.1" },
    links: [
      { label: { es: "Descargar la ISO", en: "Download the ISO" }, href: `${gh("rocola")}/releases` },
      { label: repository, href: gh("rocola") },
    ],
    images: [
      img(
        "rocola-ambar-reproduciendo.webp",
        {
          es: "Maqueta de Reproduciendo con el tema Ámbar: un disco de 45 que gira con la portada como etiqueta, el brazo del tocadiscos, la tarjeta de la canción, lámparas de avance y volumen, y tubos de burbujas a los costados",
          en: "Mockup of the now-playing screen in the Ámbar theme: a 45 that turns with the cover as its label, the tonearm, the song's card, progress and volume lamps, and bubble tubes on both sides",
        },
        980,
        740,
      ),
      img(
        "rocola-ambar.webp",
        {
          es: "Selector con el tema Ámbar: marquesina en arco ámbar, tubos de burbujas y tarjetas de papel con franja bordó",
          en: "The selector in the Ámbar theme: an amber arched marquee, bubble tubes and paper cards with a burgundy stripe",
        },
        980,
        740,
      ),
      img(
        "rocola-cromo.webp",
        {
          es: "Selector con el tema Cromo: marquesina cromada con letra cursiva coral, fondo turquesa y tarjetas blancas con pestaña cromada",
          en: "The selector in the Cromo theme: a chrome marquee with coral script lettering, a turquoise background and white cards with a chrome tab",
        },
        980,
        740,
      ),
      img(
        "rocola-neon.webp",
        {
          es: "Selector con el tema Neón: pared de ladrillo, marquesina de neón rojo y tarjetas oscuras con borde de neón cian",
          en: "The selector in the Neón theme: a brick wall, a red neon marquee and dark cards with a cyan neon edge",
        },
        980,
        740,
      ),
      img(
        "rocola-display.webp",
        {
          es: "Selector con el tema Display: panel negro, letras de LED rojo y ámbar y cursor verde",
          en: "The selector in the Display theme: a black panel, red and amber LED lettering and a green cursor",
        },
        980,
        740,
      ),
    ],
  },
  {
    id: "pocket-emu",
    skin: "pocket",
    name: { es: "EX Emulators para Galaxy Pocket Plus", en: "EX Emulators for the Galaxy Pocket Plus" },
    kind: { es: "Port a ARMv7 · Android 4.0", en: "ARMv7 port · Android 4.0" },
    tagline: {
      es: "GBA.emu y GBC.emu con un toolchain de 2026, corriendo en un Android 4.0 de un solo núcleo.",
      en: "GBA.emu and GBC.emu with a 2026 toolchain, running on a single-core Android 4.0.",
    },
    short: {
      es: "Dos emuladores compilados en 2026 para un teléfono de 2012 sin división por hardware.",
      en: "Two emulators built in 2026 for a 2012 phone without hardware division.",
    },
    description: {
      es:
        "Fork de EX Emulators, de Robert Broglia, adaptado a un Samsung GT-S5301L. Compila con Clang 23, C++26 y CMake 4.4 " +
        "para un CPU sin división entera por hardware, y los dos emuladores corren fluidos en el equipo real.",
      en:
        "A fork of Robert Broglia's EX Emulators, adapted to a Samsung GT-S5301L. It builds with Clang 23, C++26 and CMake " +
        "4.4 for a CPU without hardware integer division, and both emulators run smoothly on the real device.",
    },
    highlights: [
      {
        es: "Diagnóstico a nivel de instrucción: el Cortex-A9 del equipo no tiene udiv/sdiv y cualquier división por hardware termina en SIGILL.",
        en: "Diagnosis down to the instruction: the device's Cortex-A9 has no udiv/sdiv, and any hardware division ends in SIGILL.",
      },
      {
        es: "Auditoría automática de cada libmain.so: cero divisiones por hardware y todos los símbolos presentes en las bibliotecas del propio teléfono.",
        en: "An automatic audit of every libmain.so: zero hardware divisions, and every symbol present in the phone's own libraries.",
      },
      {
        es: "APKs firmados con el esquema v1 que exige el Package Manager de Android 4.0.",
        en: "APKs signed with the v1 scheme that Android 4.0's Package Manager requires.",
      },
      {
        es: "Ajustes de rendimiento para que GBA.emu ande bien en un solo núcleo a 850 MHz.",
        en: "Performance tweaks so GBA.emu runs well on a single core at 850 MHz.",
      },
    ],
    stack: ["C++26", "Clang 23", "CMake", "Android NDK", "ARMv7"],
    year: 2026,
    status: "Release · v1.5.85-pocket1",
    links: [
      { label: { es: "Descargar el APK", en: "Download the APK" }, href: `${gh("emu-ex-plus-alpha")}/releases` },
      { label: repository, href: gh("emu-ex-plus-alpha") },
    ],
    images: [],
    specs: [
      { label: "SoC", value: "Broadcom BCM21654" },
      { label: "CPU", value: { es: "Cortex-A9, 1 núcleo @ 850 MHz", en: "Cortex-A9, 1 core @ 850 MHz" } },
      { label: "RAM", value: "512 MB" },
      { label: "GPU", value: "VideoCore IV · GLES 2.0" },
      { label: { es: "Pantalla", en: "Screen" }, value: "TFT 240×320" },
      { label: { es: "Sistema", en: "System" }, value: "Android 4.0.4 · API 15" },
    ],
  },
];

export const smallProjects: SmallProjectSource[] = [
  {
    id: "morphtools",
    name: "Morphtools",
    tagline: {
      es: "Diagramas automáticos de proyectos orientados a objetos.",
      en: "Automatic diagrams of object-oriented projects.",
    },
    description: {
      es:
        "Recorre un proyecto en TypeScript y genera un diagrama en Mermaid con sus declaraciones y las importaciones entre " +
        "módulos. Apunta a diagramas de clases UML y a más lenguajes.",
      en:
        "Goes through a TypeScript project and draws a Mermaid diagram of its declarations and the imports between " +
        "modules. It aims at UML class diagrams and more languages.",
    },
    stack: ["TypeScript", "Node.js", "Mermaid"],
    year: 2025,
    status: prototype,
    href: gh("morphtools"),
  },
  {
    id: "racketarra",
    name: "Racketarra",
    tagline: {
      es: "Gestor visual de acordes de guitarra, escrito en Racket.",
      en: "A visual guitar chord manager, written in Racket.",
    },
    description: {
      es:
        "Calcula dónde cae cada acorde a lo largo del mástil, deja elegir una nota por cuerda y arma una viñeta con el " +
        "dibujo del acorde. Lo escribí mientras cursaba Programación 1 de la Licenciatura.",
      en:
        "Works out where each chord falls along the neck, lets you pick one note per string and draws the chord in a " +
        "diagram. I wrote it while taking Programming 1 at university.",
    },
    stack: ["Racket"],
    year: 2025,
    status: prototype,
    href: gh("racketarra"),
  },
  {
    id: "alejandria",
    name: "Alejandría",
    tagline: { es: "Apuntes universitarios hackeables, en Typst.", en: "Hackable university notes, in Typst." },
    description: {
      es:
        "Colaboro en un repositorio de apuntes pensados para descargarse, configurarse y compilarse a gusto de cada lector. " +
        "Aporté apuntes de matemática con demostraciones y explicaciones narradas, y un script que recompila los PDF solos.",
      en:
        "I contribute to a repository of notes meant to be downloaded, configured and compiled to each reader's taste. I " +
        "added math notes with proofs and step-by-step explanations, and a script that rebuilds the PDFs by itself.",
    },
    stack: ["Typst"],
    year: 2025,
    status: { es: "Colaboración", en: "Contribution" },
    href: gh("alejandria"),
  },
  {
    id: "gtk-theme",
    name: "gtk-bafif-theme",
    tagline: { es: "Tema GTK propio para escritorios XFCE.", en: "A GTK theme of my own for XFCE desktops." },
    description: {
      es: "Tema de escritorio diseñado con Themix, listo para clonar y usar en XFCE y cualquier entorno GTK.",
      en: "A desktop theme designed with Themix, ready to clone and use in XFCE or any GTK desktop.",
    },
    stack: ["GTK", "SCSS"],
    year: 2022,
    status: { es: "Terminado", en: "Finished" },
    href: gh("gtk-bafif-theme"),
  },
];
