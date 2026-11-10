// The site in Spanish (at the root) and English (under /en/), built from the same components. Every text a
// visitor reads is written in both languages, side by side, as `{ es, en }`; `localize` picks one and stops the
// build when a text is missing in either language.

export type Lang = "es" | "en";
export const langs: Lang[] = ["es", "en"];
export type Text = { es: string; en: string };

/** A value with its texts resolved to one language. */
export type Localized<T> = T extends Text
  ? string
  : T extends readonly (infer U)[]
    ? Localized<U>[]
    : T extends object
      ? { [K in keyof T]: Localized<T[K]> }
      : T;

const isText = (value: object): boolean => "es" in value || "en" in value;

function resolve(value: unknown, lang: Lang, path: string): unknown {
  if (Array.isArray(value)) return value.map((v, i) => resolve(v, lang, `${path}[${i}]`));
  if (!value || typeof value !== "object") return value;
  if (isText(value)) {
    for (const l of langs) {
      const text = (value as Record<string, unknown>)[l];
      if (typeof text !== "string" || !text.trim()) throw new Error(`${path || "text"}: missing its ${l === "es" ? "Spanish" : "English"} version`);
    }
    return (value as Text)[lang];
  }
  return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(v, lang, path ? `${path}.${k}` : k)]));
}

/** The value in one language: every `{ es, en }` inside becomes the text in `lang`. */
export function localize<T>(value: T, lang: Lang): Localized<T> {
  return resolve(value, lang, "") as Localized<T>;
}

/** Each page in both languages. The Spanish addresses are the ones the site always had (/privacy/ cannot move). */
export const routes = {
  inicio: { es: "/", en: "/en/" },
  donaciones: { es: "/donaciones/", en: "/en/donations/" },
  privacidad: { es: "/privacy/", en: "/en/privacy/" },
} as const satisfies Record<string, Record<Lang, string>>;
export type Route = keyof typeof routes;

/** The texts shared by every page: header, footer, the language and theme switches. */
const ui = {
  saltar: { es: "Saltar al contenido", en: "Skip to content" },
  secciones: { es: "Secciones", en: "Sections" },
  proyectos: { es: "Proyectos", en: "Projects" },
  recorrido: { es: "Recorrido", en: "Timeline" },
  contacto: { es: "Contacto", en: "Contact" },
  correo: { es: "Correo", en: "Email" },
  donaciones: { es: "Donaciones", en: "Donations" },
  privacidad: { es: "Privacidad", en: "Privacy" },
  tema: { es: "Cambiar entre Albiceleste (claro) y Rojinegro (oscuro)", en: "Switch between Albiceleste (light) and Rojinegro (dark)" },
  idioma: { es: "Idioma", en: "Language" },
  /** The link to the other version, written in that version's language. */
  otroIdioma: { es: "English", en: "Español" },
  ogAlt: {
    es: "Los proyectos de Bautista Fiori, con capturas de TellMAP, Urna Abierta, Rocola, Foja, xport y EX Emulators",
    en: "Bautista Fiori's projects, with screenshots of TellMAP, Urna Abierta, Rocola, Foja, xport and EX Emulators",
  },
};

export const t = { es: localize(ui, "es"), en: localize(ui, "en") };
