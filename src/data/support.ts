// Ways to send a donation, listed on /donaciones/. Paste each alias, address or link exactly as the app shows it.
// Anything left empty is left out of the built site; the dev server shows it as a placeholder.

export type SupportMethod = {
  id: string;
  title: string;
  // alias: a bank or wallet alias in Argentina; address: a crypto address.
  kind: "alias" | "address";
  currency: string;
  // Crypto only: the networks the address takes, as wallets name them.
  network?: string;
  value: string;
  note: string;
};

// A payment page that opens in a new tab. An entry can hold several links, one per amount.
export type PaymentLink = {
  id: string;
  title: string;
  note: string;
  links: { label: string; url: string }[];
};

export const fromArgentina: SupportMethod[] = [
  {
    id: "mp-ars",
    title: "Mercado Pago, en pesos",
    kind: "alias",
    currency: "ARS",
    value: "proa.seda.kilo.mp",
    note: "Desde cualquier banco o billetera de Argentina.",
  },
  {
    id: "mp-usd",
    title: "Mercado Pago, en dólares",
    kind: "alias",
    currency: "USD",
    value: "edad.cometa.catedral",
    note: "Desde una cuenta en dólares de un banco o una billetera de Argentina.",
  },
];

// My own wallet: one address that works on every EVM network. Only networks where the wallet can pay the transfer
// fee with the stablecoin itself are listed, so moving the money out never needs a second coin.
//
// Belo's deposit addresses stay here until my own wallet is ready. Each network has its own address, and Belo only
// credits the native version of each coin.
export const crypto: SupportMethod[] = [
  {
    id: "belo-bnb",
    title: "Belo, por BNB Chain",
    kind: "address",
    currency: "USDT o USDC",
    network: "BNB Chain (BEP-20)",
    value: "0x89794fc2ca30e7aff4aff215e236256698e8286b",
    note: "Solo USDT o USDC, y solo por BNB Chain (BEP-20).",
  },
  {
    id: "belo-solana",
    title: "Belo, por Solana",
    kind: "address",
    currency: "USDT o USDC",
    network: "Solana",
    value: "3u1LfiRoipGF4jXBEyE8trfxFtYCw27KFx1UC68ZBk3h",
    note: "Solo USDT o USDC, y solo por Solana.",
  },
  {
    id: "wallet",
    title: "Mi billetera",
    kind: "address",
    currency: "USDT o USDC",
    network: "BNB Chain, Arbitrum o Base",
    value: "",
    note: "La misma dirección sirve en las tres redes: elegí la que tenga tu billetera o tu exchange.",
  },
];

// Belo payment links are paid with Cash App from the United States. Each one asks for a fixed amount, never expires
// and can be paid by anyone, any number of times.
export const paymentLinks: PaymentLink[] = [
  {
    id: "cashapp",
    title: "Cash App, desde Estados Unidos",
    note: "Cada botón pide un monto fijo en dólares y se paga desde Cash App.",
    links: [
      { label: "1 USD", url: "" },
      { label: "5 USD", url: "" },
      { label: "10 USD", url: "" },
      { label: "20 USD", url: "" },
    ],
  },
  {
    id: "github",
    title: "GitHub Sponsors, con tarjeta",
    note: "Por única vez o todos los meses, con una cuenta de GitHub. GitHub no cobra comisión.",
    links: [{ label: "Ir a GitHub Sponsors", url: "" }],
  },
];
