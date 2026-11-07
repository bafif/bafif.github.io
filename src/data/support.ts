// Ways to send a donation, listed on /apoyar/. Paste each alias or address exactly as the app shows it.
// An entry with an empty `value` is left out of the built site; the dev server shows it as a placeholder.

export type SupportMethod = {
  id: string;
  title: string;
  // alias: a bank or wallet alias in Argentina; tag: a user name inside one app ($belotag); address: a crypto address.
  kind: "alias" | "tag" | "address";
  currency: string;
  // Crypto only: the network the address belongs to, as the app names it (for example "Tron (TRC-20)").
  network?: string;
  value: string;
  note: string;
};

export const fromArgentina: SupportMethod[] = [
  {
    id: "mp-ars",
    title: "Mercado Pago, en pesos",
    kind: "alias",
    currency: "ARS",
    value: "",
    note: "Desde cualquier banco o billetera de Argentina.",
  },
  {
    id: "mp-usd",
    title: "Mercado Pago, en dólares",
    kind: "alias",
    currency: "USD",
    value: "",
    note: "Desde una cuenta en dólares de un banco o una billetera de Argentina.",
  },
];

export const crypto: SupportMethod[] = [
  {
    id: "belo-tag",
    title: "Belo, entre usuarios de Belo",
    kind: "tag",
    currency: "USDT",
    value: "",
    note: "Si usás Belo, mandá los USDT a este usuario desde la app: llega al instante y sin comisión.",
  },
  {
    id: "belo-address",
    title: "Belo, desde otra billetera o un exchange",
    kind: "address",
    currency: "USDT",
    network: "",
    value: "",
    note: "Mandá solo USDT y solo por la red indicada.",
  },
  {
    id: "wallet",
    title: "Mi billetera",
    kind: "address",
    currency: "USDT",
    network: "",
    value: "",
    note: "Mandá solo USDT y solo por la red indicada.",
  },
];
