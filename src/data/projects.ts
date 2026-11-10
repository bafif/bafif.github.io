export type ProjectLink = { label: string; href: string };
export type ProjectImage = { src: string; alt: string; width: number; height: number };

/** Each showcase wears its own project's look; the skin picks the component that draws it. */
export type Skin = "tellmap" | "urna" | "xport" | "foja" | "rocola" | "pocket";

export type Showcase = {
  id: string;
  skin: Skin;
  name: string;
  kind: string;
  tagline: string;
  /** One line for the index at the top of the page. */
  short: string;
  description: string;
  highlights: string[];
  stack: string[];
  year: number;
  status: string;
  /** The first link is the main one. */
  links: ProjectLink[];
  images: ProjectImage[];
  specs?: { label: string; value: string }[];
  companion?: { name: string; tagline: string; href: string; image: ProjectImage };
};

export type SmallProject = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  year: number;
  status: string;
  href: string;
};

const gh = (repo: string) => `https://github.com/bafif/${repo}`;
const site = (path: string) => `https://bafif.github.io/${path}/`;
const img = (file: string, alt: string, width: number, height: number): ProjectImage => ({
  src: `/img/proyectos/${file}`,
  alt,
  width,
  height,
});

export const showcases: Showcase[] = [
  {
    id: "tellmap",
    skin: "tellmap",
    name: "TellMAP",
    kind: "Atlas histórico · Godot",
    tagline: "La historia del mundo en un mapa vivo, con sus fuentes a mano.",
    short: "Fronteras, pueblos y fuentes ordenados en el espacio y el tiempo.",
    description:
      "Un atlas para estudiar historia al revés: empezando por el mapa y por las fuentes. Movés la línea de tiempo y se " +
      "corren las fronteras, nacen las ciudades y aparecen los textos que se escribieron en cada lugar. Cada texto tiene " +
      "dos coordenadas: dónde y cuándo se escribió, y de qué lugar y época trata.",
    highlights: [
      "Fronteras de 1637 entidades políticas, de 3400 a. C. a 2024, tomadas de Cliopatria (Seshat Global History " +
        "Databank): 13 400 registros revisados por historiadores.",
      "El mapa se divide en 58 000 unidades que siguen esas fronteras reales, no una grilla que las aproxima.",
      "Cada ficha separa las fuentes primarias de los estudios, dice qué tan segura es su fecha y lleva al texto " +
        "completo cuando está en dominio público: Wikisource, Perseus, el Proyecto Gutenberg o Internet Archive.",
      "Las cifras antiguas son estimaciones publicadas, con su autor y su rango de incertidumbre. Lo que no se sabe, se dice.",
      "Relieve sombreado, ríos, costas con líneas de carta náutica y nombres que se curvan sobre el territorio, con tres " +
        "temas de interfaz y cuatro niveles de calidad gráfica.",
      "La enciclopedia son archivos JSON legibles, por paquetes: hoy trae un piloto completo del antiguo Egipto y una " +
        "muestra de once regiones.",
      "Sin cuentas ni telemetría: corre en la computadora y solo consulta Wikipedia al abrir una ficha, con caché.",
    ],
    stack: ["Godot 4.7", "GDScript", "Shaders", "QGIS", "JSON"],
    year: 2026,
    status: "En desarrollo · v0.3.0",
    links: [
      { label: "Ver el sitio", href: site("tmap") },
      { label: "Descargar 0.3.0", href: `${gh("tmap")}/releases/latest` },
      { label: "Repositorio", href: gh("tmap") },
    ],
    images: [
      img(
        "tellmap-egipto.webp",
        "TellMAP en 1350 a. C.: Egipto seleccionado, con el panel que lista las fuentes escritas ahí en esa época, como las Cartas de Amarna y el Gran Himno a Atón",
        1280,
        683,
      ),
      img(
        "tellmap-mundo.webp",
        "El mundo en 117 d. C.: el Imperio romano en su máxima extensión, los partos, el Imperio kushán, los xianbei y la dinastía Han",
        1280,
        683,
      ),
    ],
  },
  {
    id: "urna-abierta",
    skin: "urna",
    name: "Urna Abierta",
    kind: "App web instalable · fiscalización",
    tagline: "La app libre para organizar a los fiscales de tu partido, en cualquier elección.",
    short: "Fiscales organizados con su propio servidor, aunque no haya señal.",
    description:
      "Fiscalizar bien una elección hoy exige una estructura que solo tienen los partidos grandes. Urna Abierta es una app " +
      "web instalable para que a una agrupación estudiantil o a un partido chico le alcance con su propio servidor. Cubre la " +
      "elección entera, del padrón y las mesas al escrutinio y la foto del acta, con una vista para cada rol: el fiscal ve " +
      "solo su mesa y tacha a quienes votan aunque no haya señal, y todo se sincroniza cuando vuelve la conexión. El " +
      "proyecto no aloja nada: no hay servidor central ni telemetría.",
    highlights: [
      "Protocolo de sincronización propio: con operaciones desordenadas y repetidas el resultado es siempre el mismo, y al " +
        "volver la señal no se pierde ni se duplica ninguna.",
      "50 pruebas de punta a punta recorren una elección entera en el navegador, de crearla a borrar los nombres al " +
        "final, contra los contenedores reales, en Chrome de Android y en WebKit.",
      "Probada en un emulador de Android en modo avión: abre sin señal, sobrevive a un reinicio, avisa antes de perder " +
        "datos con el disco lleno y, al volver la señal, llega todo al servidor.",
      "Instalador de un solo ejecutable, probado instalando por SSH en Ubuntu: deja copias de seguridad cifradas que se " +
        "restauran enteras en otro servidor.",
      "Pensada para servidores gratuitos: con 1 GB de RAM y un cuarto de procesador anduvo con 200 mesas en hora pico, en " +
        "una prueba de laboratorio.",
      "Permisos por rol, un registro que nadie puede cambiar y herramientas para cumplir la ley de datos personales.",
      "Diseño para quien nunca la abrió: una pregunta por pantalla, un botón principal y cinco temas en modo claro y oscuro.",
    ],
    stack: ["TypeScript", "Svelte", "Fastify", "PostgreSQL", "PWA", "Caddy", "Python", "RapidOCR", "Playwright", "Podman"],
    year: 2026,
    status: "En desarrollo",
    links: [
      { label: "Ver el sitio", href: site("urna-abierta") },
      { label: "Repositorio", href: gh("urna-abierta") },
    ],
    images: [
      img(
        "urna-telefonos-claro.webp",
        "Tres pantallas de Urna Abierta en el tema Aula: el plan del día, el padrón de la mesa con 281 votos por delante y el conteo de sobres",
        1200,
        972,
      ),
      img(
        "urna-telefonos-oscuro.webp",
        "Las mismas tres pantallas de Urna Abierta en el tema Aula de noche, verde pizarrón con botones amarillos",
        1200,
        972,
      ),
    ],
    companion: {
      name: "Escáner de padrones",
      tagline:
        "Lee padrones escaneados con OCR en la propia computadora y los pasa al formato abierto que lee la app. En dos " +
        "padrones reales, el 98,4 % de los documentos coincide entre escaneos independientes.",
      href: gh("urna-abierta-padrones"),
      image: img(
        "urna-lector.webp",
        "El escáner de padrones pidiendo revisar una fila dudosa: la imagen escaneada arriba y el DNI marcado para corregir",
        1280,
        800,
      ),
    },
  },
  {
    id: "xport",
    skin: "xport",
    name: "xport",
    kind: "Extensión + servicio local",
    tagline: "Los tweets de una cuenta de X, entre dos fechas, en un CSV.",
    short: "Tweets por rango de fechas a CSV, con el tope de uso fijado en el código.",
    description:
      "Una extensión para Chrome y Firefox recorre la búsqueda de X por vos, copia lo que la página ya descargó y se lo " +
      "pasa a un servicio local en FastAPI, que lo guarda sin repetir y arma un CSV por cuenta. Todo gira alrededor de un " +
      "tope: nunca más de 900.000 posts en cualquier ventana de 24 horas, por debajo del millón que permiten los términos " +
      "de X. El tope es una constante del código, no una opción de configuración.",
    highlights: [
      "Ventana deslizante de 24 h, con su registro en una base SQLite aparte: borrar los tweets no pone la cuenta en cero.",
      "La extensión, hecha con WXT, recorre la búsqueda sola, esquiva el corte de unos 1000 resultados achicando el rango " +
        "y retoma entre sesiones desde lo ya capturado.",
      "Arquitectura por capas con el backend intercambiable (scraping o API oficial) detrás de una interfaz.",
      "Más de 300 tests, tipado estricto con mypy y lint con ruff; el servicio corre en un contenedor Alpine (Podman) detrás de nginx.",
    ],
    stack: ["Python 3.12", "FastAPI", "SQLite", "TypeScript", "WXT", "Podman", "uv", "mypy"],
    year: 2026,
    status: "Beta",
    links: [
      { label: "Ver el sitio", href: site("xport") },
      { label: "Repositorio", href: gh("xport") },
    ],
    images: [
      img(
        "xport-popup.webp",
        "El popup de xport con datos de ejemplo: servicio local, cuenta, rango de fechas, los botones Capturar y Exportar CSV y el uso de las últimas 24 horas",
        720,
        1232,
      ),
    ],
  },
  {
    id: "foja",
    skin: "foja",
    name: "Foja",
    kind: "Editor web · Typst",
    tagline: "Tu CV en Typst, sin escribir código.",
    short: "Un editor de currículums con formularios y la vista previa real.",
    description:
      "Empezó como el generador de mi propio CV: los datos en JSON y Markdown, un perfil por postulación que elige qué " +
      "mostrar, y dos generadores sobre los mismos datos, uno en Python que compone con LaTeX y otro en C17 que escribe " +
      "el PDF a mano. Los dos siguen en el repo. Foja le pone una interfaz encima: un editor que corre entero en el " +
      "navegador, con formularios en lugar de archivos, Typst por debajo y una vista previa que es el resultado real.",
    highlights: [
      "Un banco de entradas y un perfil por cada tipo de trabajo, cargados con formularios.",
      "Vista previa en vivo con Typst en el navegador, que avisa si el CV entra en una página.",
      "Exporta a PDF, JPG, Word, Typst, LaTeX, Markdown y JSON, sin cuentas ni servidor; funciona sin conexión.",
      "Tres estilos propios, y estilos nuevos escritos en Typst.",
    ],
    stack: ["TypeScript", "Typst", "Astro", "React", "Python", "C17", "LaTeX"],
    year: 2026,
    status: "En línea · en desarrollo",
    links: [
      { label: "Abrir el editor", href: site("foja") },
      { label: "Repositorio", href: gh("foja") },
      { label: "Generador v1.0.0", href: `${gh("foja")}/releases/tag/cvgen-v1.0.0` },
    ],
    images: [
      img(
        "foja-editor.webp",
        "El editor de Foja: a la izquierda el panel Estilo y diseño con los estilos Legajo, Banda y Minimal, a la derecha la vista previa de un CV de ejemplo",
        1200,
        720,
      ),
    ],
  },
  {
    id: "rocola",
    skin: "rocola",
    name: "Rocola",
    kind: "Sistema booteable · Debian i386",
    tagline: "Un pendrive que convierte cualquier PC vieja en una rocola de arcade.",
    short: "Un pendrive que vuelve rocola a una PC vieja, con temas de rocolas de época.",
    description:
      "Sistema operativo mínimo basado en Debian i386 que arranca desde un pendrive con una interfaz de rocola propia. " +
      "Un instalador guiado lo clona al disco interno y la máquina queda como jukebox dedicada: abre sola al prender, " +
      "se maneja con controles de arcade y está pensada para monitores modernos y de tubo, incluidos los de 15 kHz.",
    highlights: [
      "ISO híbrida que arranca por BIOS y por UEFI x64, verificada de punta a punta en QEMU/KVM.",
      "El instalador clona el sistema a un disco vacío y ese disco arranca solo, también probado por BIOS y UEFI; al reinstalar conserva la música.",
      "Soporte CRT: VGA de 31 kHz y arcade/TV de 15 kHz con switchres y modelines, con vuelta segura a VGA.",
      "Cuatro temas de rocolas de época, ya diseñados: Ámbar (fines de los 40, con tubos de burbujas), Cromo (mediados " +
        "de los 50), Neón (los 60 y 70) y Display (los 80, de LED y pensado para 240p). Ámbar va a venir por defecto desde la v0.1.2.",
      "Interfaz propia en SDL2 (Python y pygame) sobre MPD: biblioteca por artista y álbum, portada del disco al reproducir, logos y tema reemplazables y controles reasignables desde la configuración.",
      "Importa la música de un segundo pendrive apenas se enchufa: lo monta solo lectura, no duplica y la biblioteca se actualiza sola.",
      "Salida de audio por PipeWire elegible desde la interfaz: analógica, HDMI, USB o parlantes Bluetooth.",
      "Tests de la interfaz sin pantalla (SDL dummy y un MPD simulado), CI con ruff y shellcheck.",
      "Build reproducible en contenedores (Podman) y releases con sumas SHA-256 publicadas.",
    ],
    stack: ["Debian i386", "Python", "SDL2", "MPD", "Podman", "GRUB"],
    year: 2026,
    status: "Beta pública · v0.1.1",
    links: [
      { label: "Descargar la ISO", href: `${gh("rocola")}/releases` },
      { label: "Repositorio", href: gh("rocola") },
    ],
    images: [
      img(
        "rocola-ambar-reproduciendo.webp",
        "Maqueta de Reproduciendo con el tema Ámbar: un disco de 45 que gira con la portada como etiqueta, el brazo del tocadiscos, la tarjeta de la canción, lámparas de avance y volumen, y tubos de burbujas a los costados",
        980,
        740,
      ),
      img("rocola-ambar.webp", "Selector con el tema Ámbar: marquesina en arco ámbar, tubos de burbujas y tarjetas de papel con franja bordó", 980, 740),
      img("rocola-cromo.webp", "Selector con el tema Cromo: marquesina cromada con letra cursiva coral, fondo turquesa y tarjetas blancas con pestaña cromada", 980, 740),
      img("rocola-neon.webp", "Selector con el tema Neón: pared de ladrillo, marquesina de neón rojo y tarjetas oscuras con borde de neón cian", 980, 740),
      img("rocola-display.webp", "Selector con el tema Display: panel negro, letras de LED rojo y ámbar y cursor verde", 980, 740),
    ],
  },
  {
    id: "pocket-emu",
    skin: "pocket",
    name: "EX Emulators para Galaxy Pocket Plus",
    kind: "Port a ARMv7 · Android 4.0",
    tagline: "GBA.emu y GBC.emu con un toolchain de 2026, corriendo en un Android 4.0 de un solo núcleo.",
    short: "Dos emuladores compilados en 2026 para un teléfono de 2012 sin división por hardware.",
    description:
      "Fork de EX Emulators, de Robert Broglia, adaptado a un Samsung GT-S5301L. Compila con Clang 23, C++26 y CMake 4.4 " +
      "para un CPU sin división entera por hardware, y los dos emuladores corren fluidos en el equipo real.",
    highlights: [
      "Diagnóstico a nivel de instrucción: el Cortex-A9 del equipo no tiene udiv/sdiv y cualquier división por hardware termina en SIGILL.",
      "Auditoría automática de cada libmain.so: cero divisiones por hardware y todos los símbolos presentes en las bibliotecas del propio teléfono.",
      "APKs firmados con el esquema v1 que exige el Package Manager de Android 4.0.",
      "Ajustes de rendimiento para que GBA.emu ande bien en un solo núcleo a 850 MHz.",
    ],
    stack: ["C++26", "Clang 23", "CMake", "Android NDK", "ARMv7"],
    year: 2026,
    status: "Release · v1.5.85-pocket1",
    links: [
      { label: "Descargar el APK", href: `${gh("emu-ex-plus-alpha")}/releases` },
      { label: "Repositorio", href: gh("emu-ex-plus-alpha") },
    ],
    images: [],
    specs: [
      { label: "SoC", value: "Broadcom BCM21654" },
      { label: "CPU", value: "Cortex-A9, 1 núcleo @ 850 MHz" },
      { label: "RAM", value: "512 MB" },
      { label: "GPU", value: "VideoCore IV · GLES 2.0" },
      { label: "Pantalla", value: "TFT 240×320" },
      { label: "Sistema", value: "Android 4.0.4 · API 15" },
    ],
  },
];

export const smallProjects: SmallProject[] = [
  {
    id: "morphtools",
    name: "Morphtools",
    tagline: "Diagramas automáticos de proyectos orientados a objetos.",
    description:
      "Recorre un proyecto en TypeScript y genera un diagrama en Mermaid con sus declaraciones y las importaciones entre " +
      "módulos. Apunta a diagramas de clases UML y a más lenguajes.",
    stack: ["TypeScript", "Node.js", "Mermaid"],
    year: 2025,
    status: "Prototipo",
    href: gh("morphtools"),
  },
  {
    id: "racketarra",
    name: "Racketarra",
    tagline: "Gestor visual de acordes de guitarra, escrito en Racket.",
    description:
      "Calcula dónde cae cada acorde a lo largo del mástil, deja elegir una nota por cuerda y arma una viñeta con el " +
      "dibujo del acorde. Lo escribí mientras cursaba Programación 1 de la Licenciatura.",
    stack: ["Racket"],
    year: 2025,
    status: "Prototipo",
    href: gh("racketarra"),
  },
  {
    id: "alejandria",
    name: "Alejandría",
    tagline: "Apuntes universitarios hackeables, en Typst.",
    description:
      "Colaboro en un repositorio de apuntes pensados para descargarse, configurarse y compilarse a gusto de cada lector. " +
      "Aporté apuntes de matemática con demostraciones y explicaciones narradas, y un script que recompila los PDF solos.",
    stack: ["Typst"],
    year: 2025,
    status: "Colaboración",
    href: gh("alejandria"),
  },
  {
    id: "gtk-theme",
    name: "gtk-bafif-theme",
    tagline: "Tema GTK propio para escritorios XFCE.",
    description: "Tema de escritorio diseñado con Themix, listo para clonar y usar en XFCE y cualquier entorno GTK.",
    stack: ["GTK", "SCSS"],
    year: 2022,
    status: "Terminado",
    href: gh("gtk-bafif-theme"),
  },
];
