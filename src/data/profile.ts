import type { Text } from "../i18n";

export const profile = {
  name: "Bautista Fiori",
  fullName: "Bautista Damián Fiori",
  location: "Rosario, Argentina",
  email: "bautistafiori6@gmail.com",
  github: "https://github.com/bafif",
  githubHandle: "bafif",
  lead: {
    es:
      "Hago herramientas completas, pensadas para que alguien las use de verdad: un atlas de la historia con sus " +
      "fuentes, una app para que un partido chico fiscalice con su propio servidor, un editor de CV que corre entero " +
      "en el navegador y un pendrive que vuelve rocola a cualquier PC vieja.",
    en:
      "I build complete tools, made for someone to actually use: an atlas of history with its sources, an app for a " +
      "small party to watch the polls with its own server, a CV editor that runs entirely in the browser and a USB " +
      "stick that turns any old PC into a jukebox.",
  } satisfies Text,
};

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
