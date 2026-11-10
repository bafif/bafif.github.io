import type { Localized, Text } from "../i18n";

type MilestoneSource = { year: number; items: Text[] };
export type Milestone = Localized<MilestoneSource>;

export const timeline: MilestoneSource[] = [
  { year: 2022, items: [{ es: "Primer proyecto público: un tema GTK propio.", en: "First public project: a GTK theme of my own." }] },
  {
    year: 2025,
    items: [
      {
        es: "Mapa interactivo histórico, Racketarra, Morphtools y el generador de CV que dio origen a Foja.",
        en: "An interactive historical map, Racketarra, Morphtools and the CV generator Foja grew out of.",
      },
      { es: "Aportes a Alejandría.", en: "Contributions to Alejandría." },
    ],
  },
  {
    year: 2026,
    items: [
      { es: "TellMAP, el atlas histórico con sus fuentes, llega a la 0.3.", en: "TellMAP, the historical atlas with its sources, reaches 0.3." },
      { es: "Urna Abierta, la app libre para fiscales.", en: "Urna Abierta, the free app for poll watchers." },
      { es: "Foja, mi editor de CV, queda en línea.", en: "Foja, my CV editor, goes online." },
      { es: "Rocola llega a beta pública.", en: "Rocola reaches public beta." },
      {
        es: "xport, para bajar tweets a CSV sin pasar el tope de X.",
        en: "xport, to download tweets to CSV without going over X's cap.",
      },
      { es: "EX Emulators corriendo en el Galaxy Pocket Plus.", en: "EX Emulators running on the Galaxy Pocket Plus." },
    ],
  },
];
