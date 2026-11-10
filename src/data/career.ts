export type Milestone = { year: number; items: string[] };

export const timeline: Milestone[] = [
  { year: 2018, items: ["Empiezo a reparar equipos y a dar clases particulares."] },
  { year: 2022, items: ["Primer proyecto público: un tema GTK propio."] },
  { year: 2024, items: ["Pasantía en tecso: firmware para ATtiny85 y ESP32, y automatización en Raspberry Pi."] },
  { year: 2025, items: ["Mapa interactivo histórico, Racketarra, Generador de CV y Morphtools.", "Aportes a Alejandría."] },
  {
    year: 2026,
    items: [
      "TellMAP, el atlas histórico con sus fuentes, llega a la 0.3.",
      "Urna Abierta, la app libre para fiscales.",
      "Foja, mi editor de CV, queda en línea.",
      "Rocola llega a beta pública.",
      "xport, para bajar tweets a CSV sin pasar el tope de X.",
      "EX Emulators corriendo en el Galaxy Pocket Plus.",
    ],
  },
];
