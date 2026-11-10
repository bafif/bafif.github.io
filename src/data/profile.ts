export const profile = {
  name: "Bautista Fiori",
  fullName: "Bautista Damián Fiori",
  location: "Rosario, Argentina",
  email: "bautistafiori6@gmail.com",
  github: "https://github.com/bafif",
  githubHandle: "bafif",
  lead:
    "Técnico electrónico y estudiante de Ciencias de la Computación y de Inteligencia Artificial en la UNR. " +
    "Hago herramientas completas, pensadas para que alguien las use de verdad: un atlas de la historia con sus " +
    "fuentes, una app para que un partido chico fiscalice con su propio servidor, un editor de CV que corre entero " +
    "en el navegador y un pendrive que vuelve rocola a cualquier PC vieja.",
  features: [
    "Del circuito al deploy: electrónica, firmware y software.",
    "Linux de punta a punta: Arch, Debian, Podman y nginx.",
    "C, C++, Python, TypeScript, GDScript y Racket.",
    "Inglés C2 general y C1 técnico.",
  ],
  strengths: [
    {
      title: "Resolución",
      body: "Cuando algo no anda, bajo hasta encontrar por qué. El port al Galaxy Pocket se destrabó cuando vi que su procesador no tiene instrucción para dividir.",
    },
    {
      title: "Ritmo sostenido",
      body: "Avanzo sin frustrarme ante la dificultad y levanto la mano apenas algo se traba, en vez de esconderlo.",
    },
    {
      title: "Comunicación técnica",
      body: "Escribo la documentación que me gustaría encontrar: qué hace cada cosa, qué no y qué falta probar. Doy clases desde 2018: explicar es parte de mi día a día.",
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
  "Podman",
  "Linux",
  "VCC",
];
