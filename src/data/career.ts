export type Milestone = { year: number; items: string[] };

export const timeline: Milestone[] = [
  { year: 2022, items: ["Primer proyecto público: un tema GTK propio."] },
  { year: 2025, items: ["Mapa interactivo histórico, Racketarra, Morphtools y el generador de CV que dio origen a Foja.", "Aportes a Alejandría."] },
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
