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
      "se maneja con controles de arcade y funciona en monitores modernos y de tubo, incluidos los de 15 kHz.",
    highlights: [
      "ISO híbrida que arranca por BIOS y por UEFI x64, verificada de punta a punta en QEMU/KVM.",
      "Soporte CRT real: VGA de 31 kHz y arcade/TV de 15 kHz con switchres y modelines.",
      "Interfaz propia en SDL2 (Python y pygame-ce) sobre MPD, con logos y tema reemplazables.",
      "Build reproducible en Docker y releases con sumas SHA-256 publicadas.",
    ],
    stack: ["Debian i386", "Python", "SDL2", "MPD", "Docker", "GRUB"],
    year: 2026,
    status: "Beta pública · v0.1.1",
    links: [
      { label: "Repositorio", href: gh("rocola") },
      { label: "Descargar ISO", href: `${gh("rocola")}/releases` },
    ],
    featured: true,
    images: [
      { src: "/img/ui-nowplaying.png", alt: "Pantalla de reproducción de la interfaz de Rocola" },
      { src: "/img/ui-menu.png", alt: "Menú de la biblioteca de música de Rocola" },
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
    id: "xport",
    code: "BF-03",
    name: "xport",
    tagline: "Extractor de tweets por rango de fechas, con un tope de uso garantizado por código.",
    description:
      "Extrae los tweets de una o varias cuentas de X entre dos fechas y genera un CSV por cuenta. Su núcleo es el " +
      "Compliance Gate: nunca más de 900.000 objetos en cualquier ventana móvil de 24 horas, por debajo del tope de " +
      "los términos de X, fijado como constante de código y registrado en un ledger de auditoría.",
    highlights: [
      "Ventana deslizante de 24 h con ledger de auditoría en SQLite, separado de los datos.",
      "Tipado estricto con mypy, lint con ruff y tests con pytest.",
      "Entorno reproducible con uv.",
    ],
    stack: ["Python 3.12", "SQLite", "uv", "pytest", "mypy"],
    year: 2026,
    status: "En desarrollo",
    links: [{ label: "Repositorio", href: gh("xport") }],
  },
  {
    id: "map",
    code: "BF-04",
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
    id: "curriculum",
    code: "BF-05",
    name: "Generador de CV",
    tagline: "Currículums en PDF a partir de datos en JSON y Markdown.",
    description:
      "Toma la información personal en JSON y Markdown y la compone en un currículum con LaTeX. Separar los datos del " +
      "diseño permite mantener una sola fuente y sacar versiones distintas sin tocar la maqueta.",
    highlights: [
      "Datos y presentación separados: JSON y Markdown de un lado, plantillas LaTeX del otro.",
      "Incluye mi propio CV como ejemplo.",
    ],
    stack: ["Python", "LaTeX", "JSON"],
    year: 2025,
    status: "Prototipo",
    links: [{ label: "Repositorio", href: gh("curriculum") }],
  },
  {
    id: "morphtools",
    code: "BF-06",
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
    code: "BF-07",
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
    code: "BF-08",
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
    code: "BF-09",
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
