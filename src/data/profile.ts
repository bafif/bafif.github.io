export const profile = {
  name: "Bautista Fiori",
  fullName: "Bautista Damián Fiori",
  location: "Rosario, Argentina",
  email: "bautistafiori6@gmail.com",
  github: "https://github.com/bafif",
  githubHandle: "bafif",
  lead:
    "Técnico electrónico y estudiante de Ciencias de la Computación e Inteligencia Artificial en la UNR. " +
    "Escribo software que llega hasta el hardware: sistemas booteables para PCs de 32 bits, ports de " +
    "emuladores a CPUs ARM de una década atrás y herramientas de datos con garantías verificadas por código.",
  features: [
    "Del circuito al deploy: electrónica, firmware y software.",
    "Linux de punta a punta: Arch, Debian, Docker y nginx.",
    "C, C++, Python, TypeScript, GDScript y Racket.",
    "Inglés C2 general y C1 técnico.",
  ],
  strengths: [
    {
      title: "Resolución",
      body: "Encuentro por mi cuenta la solución a los problemas y trabajo enfocado en llegar al resultado, también bajo presión.",
    },
    {
      title: "Ritmo sostenido",
      body: "Avanzo sin frustrarme ante la dificultad, sin perder el hilo, y levanto la mano apenas algo se traba.",
    },
    {
      title: "Comunicación técnica",
      body: "Explico e informo sin ambigüedades. Leer documentación técnica es parte de mi día a día.",
    },
  ],
} as const;

// DIP-16 pinout shown in the hero. Pins 1-8 run down the left side, 9-16 up the right side.
export const pinout: readonly string[] = [
  "C",
  "C++",
  "Python",
  "TypeScript",
  "GDScript",
  "Racket",
  "Bash",
  "GND",
  "Git",
  "Typst",
  "LaTeX",
  "AVR",
  "nginx",
  "Docker",
  "Linux",
  "VCC",
];
