export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  year: number;
  status: string;
  links: ProjectLink[];
  featured?: boolean;
  images?: { src: string; alt: string }[];
  specs?: { label: string; value: string }[];
};

const gh = (repo: string) => `https://github.com/bafif/${repo}`;

export const projects: Project[] = [
  {
    id: "rocola",
    code: "BF-01",
    name: "Rocola",
    tagline: "Un pendrive que convierte cualquier PC vieja en una rocola de arcade.",
    description:
      "Sistema operativo mínimo basado en Debian i386 que arranca desde un pendrive con una interfaz de rocola propia. " +
      "Un instalador guiado lo clona al disco interno y la máquina queda como jukebox dedicada: abre sola al prender, " +
      "se maneja con controles de arcade y está pensada para monitores modernos y de tubo, incluidos los de 15 kHz.",
    highlights: [
      "ISO híbrida que arranca por BIOS y por UEFI x64, verificada de punta a punta en QEMU/KVM.",
      "El instalador clona el sistema a un disco vacío y ese disco arranca solo, también probado por BIOS y UEFI; al reinstalar conserva la música.",
      "Soporte CRT: VGA de 31 kHz y arcade/TV de 15 kHz con switchres y modelines, con vuelta segura a VGA.",
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
      { label: "Repositorio", href: gh("rocola") },
      { label: "Descargar ISO", href: `${gh("rocola")}/releases` },
    ],
    featured: true,
    images: [
      { src: "/img/ui-nowplaying.png", alt: "Pantalla de reproducción de Rocola, con la portada del disco" },
      { src: "/img/ui-library.png", alt: "Biblioteca de Rocola por artista, con la cantidad de canciones de cada uno" },
      { src: "/img/ui-menu.png", alt: "Menú de Rocola: salida de audio, información, controles, biblioteca e instalador" },
    ],
  },
  {
    id: "pocket-emu",
    code: "BF-02",
    name: "EX Emulators para Galaxy Pocket Plus",
    tagline: "GBA.emu y GBC.emu con un toolchain de 2026, corriendo en un Android 4.0 de un solo núcleo.",
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
      { label: "Repositorio", href: gh("emu-ex-plus-alpha") },
      { label: "Descargar APK", href: `${gh("emu-ex-plus-alpha")}/releases` },
    ],
    featured: true,
    specs: [
      { label: "SoC", value: "Broadcom BCM21654" },
      { label: "CPU", value: "Cortex-A9, 1 núcleo @ 850 MHz" },
      { label: "RAM", value: "512 MB" },
      { label: "GPU", value: "VideoCore IV · GLES 2.0" },
      { label: "Pantalla", value: "TFT 240×320" },
      { label: "Sistema", value: "Android 4.0.4 · API 15" },
    ],
  },
  {
    id: "urna-abierta",
    code: "BF-03",
    name: "Urna Abierta",
    tagline: "La app libre para organizar a los fiscales de un partido, en cualquier elección.",
    description:
      "Fiscalizar bien una elección hoy exige una estructura que solo tienen los partidos grandes. Urna Abierta es una app " +
      "web instalable para que a una agrupación estudiantil o a un partido chico le alcance con su propio servidor. Cubre la " +
      "elección entera, del padrón y las mesas al escrutinio y la foto del acta, con una vista para cada rol: el fiscal ve " +
      "solo su mesa y tacha a quienes votan aunque no haya señal, y todo se sincroniza cuando vuelve la conexión. El " +
      "proyecto no aloja nada: no hay servidor central ni telemetría. La acompaña un escáner que lee padrones escaneados " +
      "en la propia computadora y los pasa a un formato abierto.",
    highlights: [
      "Protocolo de sincronización propio: con operaciones desordenadas y repetidas el resultado es siempre el mismo, y al " +
        "volver la señal no se pierde ni se duplica ninguna.",
      "Una elección entera en el navegador, de crearla a borrar los nombres: 46 pruebas de punta a punta contra los " +
        "contenedores reales, en Chrome de Android y en WebKit.",
      "Probada en un emulador de Android en modo avión: abre sin señal, sobrevive a un reinicio, avisa antes de perder " +
        "datos con el disco lleno y, al volver la señal, llega todo al servidor.",
      "Instalador de un solo ejecutable, probado instalando por SSH en Ubuntu: deja copias de seguridad cifradas que se " +
        "restauran enteras en otro servidor.",
      "Pensada para servidores gratuitos: con 1 GB de RAM y un cuarto de procesador anduvo con 200 mesas en hora pico, en " +
        "una prueba de laboratorio.",
      "Permisos por rol, un registro que nadie puede cambiar y herramientas para cumplir la ley de datos personales.",
      "Escáner de padrones con OCR local: en dos padrones reales, el 98,4 % de los documentos coincide entre escaneos " +
        "independientes, sin mandar los datos a ningún servicio.",
      "Diseño para quien nunca la abrió: una pregunta por pantalla, un botón principal y cinco temas en modo claro y oscuro.",
    ],
    stack: ["TypeScript", "Svelte", "Fastify", "PostgreSQL", "PWA", "Caddy", "Python", "RapidOCR", "Playwright", "Podman"],
    year: 2026,
    status: "En desarrollo",
    links: [
      { label: "Repositorio", href: gh("urna-abierta") },
      { label: "Escáner de padrones", href: gh("urna-abierta-padrones") },
    ],
    featured: true,
    images: [
      { src: "/img/urna-portada.webp", alt: "Tres pantallas de Urna Abierta: el plan del día, el padrón de la mesa sin señal y el conteo de sobres" },
      { src: "/img/urna-temas.webp", alt: "La lista de quienes ya votaron en los cinco temas de Urna Abierta: Aula, Vidrio, Feria, Tablero y Mate" },
    ],
  },
  {
    id: "xport",
    code: "BF-04",
    name: "xport",
    tagline: "Extractor de tweets por rango de fechas, con un tope de uso garantizado por código.",
    description:
      "Extrae los tweets de una o varias cuentas de X entre dos fechas y genera un CSV por cuenta. Una extensión " +
      "para Chrome y Firefox captura las respuestas que x.com ya carga en la página y un servicio local en FastAPI " +
      "las normaliza, las guarda y arma el CSV. Su núcleo es el Compliance Gate: nunca más de 900.000 objetos en " +
      "cualquier ventana móvil de 24 horas, por debajo del tope de los términos de X, fijado como constante de " +
      "código y registrado en un ledger de auditoría.",
    highlights: [
      "Ventana deslizante de 24 h con ledger de auditoría en SQLite, separado de los datos.",
      "Extensión con WXT que recorre la búsqueda sola, esquiva el corte de ~1000 resultados achicando el rango y " +
        "retoma entre sesiones desde lo ya capturado.",
      "Arquitectura por capas con el backend intercambiable (scraping o API oficial) detrás de una interfaz.",
      "230 tests, tipado estricto con mypy y lint con ruff; servicio en un contenedor Alpine (Podman) detrás de nginx.",
    ],
    stack: ["Python 3.12", "FastAPI", "SQLite", "TypeScript", "WXT", "Podman", "uv", "mypy"],
    year: 2026,
    status: "Beta",
    links: [{ label: "Repositorio", href: gh("xport") }],
  },
  {
    id: "map",
    code: "BF-05",
    name: "Mapa interactivo histórico",
    tagline: "Una enciclopedia que se recorre sobre el mapa.",
    description:
      "Aplicación en Godot para consultar información histórica, geográfica y demográfica directamente sobre un mapa. " +
      "Las provincias se generan a partir de un mapa de bits y su definición, y los asentamientos se crean, guardan y cargan.",
    highlights: [
      "Provincias generadas desde un bitmap de colores y su definición en JSON.",
      "Asentamientos editables con guardado y carga.",
      "Herramientas en Python para convertir los datos de origen.",
    ],
    stack: ["Godot 4", "GDScript", "Python"],
    year: 2025,
    status: "Prototipo",
    links: [{ label: "Repositorio", href: gh("map") }],
  },
  {
    id: "foja",
    code: "BF-06",
    name: "Foja",
    tagline: "Editor de currículums sin código sobre Typst: formularios, vista previa en vivo y exportación a varios formatos.",
    description:
      "Empezó como el generador de mi propio CV: los datos en JSON y Markdown, un perfil por cada postulación que elige " +
      "qué secciones y entradas mostrar, y dos generadores que leen los mismos datos, uno en Python que compone con LaTeX " +
      "y otro en C que escribe el PDF directamente. Foja le pone una interfaz encima: un editor que corre entero en el " +
      "navegador, con formularios en lugar de archivos, Typst por debajo y una vista previa que es el resultado real.",
    highlights: [
      "Un banco de entradas y un perfil por cada tipo de trabajo, cargados con formularios.",
      "Vista previa en vivo con Typst en el navegador, que avisa si el CV entra en una página.",
      "Exporta a PDF, JPG, Word, Typst, LaTeX, Markdown y JSON, sin cuentas ni servidor; funciona sin conexión.",
      "Tres estilos propios, y estilos nuevos escritos en Typst.",
      "La primera versión sigue en el repo: el generador en Python sobre LaTeX y el de C17 que escribe el PDF a mano.",
    ],
    stack: ["TypeScript", "Typst", "Astro", "React", "Python", "C17", "LaTeX"],
    year: 2026,
    status: "En desarrollo",
    links: [
      { label: "Repositorio", href: "https://github.com/foja-cv/foja" },
      { label: "Generador v1.0.0", href: "https://github.com/foja-cv/foja/releases/tag/cvgen-v1.0.0" },
    ],
  },
  {
    id: "morphtools",
    code: "BF-07",
    name: "Morphtools",
    tagline: "Diagramas automáticos de proyectos orientados a objetos.",
    description:
      "Recorre un proyecto en TypeScript y genera un diagrama en Mermaid con sus declaraciones y las importaciones entre " +
      "módulos. Apunta a diagramas de clases UML y a más lenguajes.",
    highlights: ["Salida en Mermaid, lista para documentación.", "Nació para estudiar TypeScript y colaborar en Excalidraw."],
    stack: ["TypeScript", "Node.js", "Mermaid"],
    year: 2025,
    status: "Prototipo",
    links: [{ label: "Repositorio", href: gh("morphtools") }],
  },
  {
    id: "racketarra",
    code: "BF-08",
    name: "Racketarra",
    tagline: "Gestor visual de acordes de guitarra, escrito en Racket.",
    description:
      "Calcula dónde cae cada acorde a lo largo del mástil, deja elegir una nota por cuerda y arma una viñeta con el " +
      "dibujo del acorde. Con varios acordes queda una hoja ordenada para tener a mano mientras se toca.",
    highlights: ["Escrito en Racket mientras cursaba Programación 1 de la Licenciatura."],
    stack: ["Racket"],
    year: 2025,
    status: "Prototipo",
    links: [{ label: "Repositorio", href: gh("racketarra") }],
  },
  {
    id: "alejandria",
    code: "BF-09",
    name: "Alejandría",
    tagline: "Apuntes universitarios hackeables, en Typst.",
    description:
      "Colaboro en un repositorio de apuntes pensados para descargarse, configurarse y compilarse a gusto de cada lector. " +
      "Aporté apuntes de matemática con demostraciones y explicaciones narradas, y un script que recompila los PDF solos.",
    highlights: ["Demostraciones y explicaciones narradas.", "Recompilación automática de los PDF."],
    stack: ["Typst"],
    year: 2025,
    status: "Colaboración",
    links: [{ label: "Repositorio", href: gh("alejandria") }],
  },
  {
    id: "gtk-theme",
    code: "BF-10",
    name: "gtk-bafif-theme",
    tagline: "Tema GTK propio para escritorios XFCE.",
    description: "Tema de escritorio diseñado con Themix, listo para clonar y usar en XFCE y cualquier entorno GTK.",
    highlights: [],
    stack: ["GTK", "SCSS"],
    year: 2022,
    status: "Terminado",
    links: [{ label: "Repositorio", href: gh("gtk-bafif-theme") }],
  },
];
