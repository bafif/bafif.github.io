import type { Localized, Text } from "../i18n";

// Ways to send a donation, listed on /donaciones/ (and /en/donations/). Paste each alias, address or link exactly as the app shows it.
// Anything left empty is left out of the built site; the dev server shows it as a placeholder.

type SupportMethodSource = {
  id: string;
  title: Text;
  // alias: a bank or wallet alias in Argentina; address: a crypto address.
  kind: "alias" | "address";
  currency: string | Text;
  // Crypto only: the networks the address takes, as wallets name them.
  network?: string | Text;
  value: string;
  note: Text;
};
export type SupportMethod = Localized<SupportMethodSource>;

// A payment page that opens in a new tab. An entry can hold several links, one per amount.
type PaymentLinkSource = {
  id: string;
  title: Text;
  note: Text;
  links: { label: string | Text; url: string }[];
};
export type PaymentLink = Localized<PaymentLinkSource>;

export const fromArgentina: SupportMethodSource[] = [
  {
    id: "mp-ars",
    title: { es: "Mercado Pago, en pesos", en: "Mercado Pago, in pesos" },
    kind: "alias",
    currency: "ARS",
    value: "proa.seda.kilo.mp",
    note: { es: "Desde cualquier banco o billetera de Argentina.", en: "From any bank or wallet in Argentina." },
  },
  {
    id: "mp-usd",
    title: { es: "Mercado Pago, en dólares", en: "Mercado Pago, in dollars" },
    kind: "alias",
    currency: "USD",
    value: "edad.cometa.catedral",
    note: {
      es: "Desde una cuenta en dólares de un banco o una billetera de Argentina.",
      en: "From a dollar account at a bank or wallet in Argentina.",
    },
  },
];

const usdtOrUsdc: Text = { es: "USDT o USDC", en: "USDT or USDC" };

// My own wallet: one address that works on every EVM network. Only networks where the wallet can pay the transfer
// fee with the stablecoin itself are listed, so moving the money out never needs a second coin.
//
// Belo's deposit addresses stay here until my own wallet is ready. Each network has its own address, and Belo only
// credits the native version of each coin.
export const crypto: SupportMethodSource[] = [
  {
    id: "belo-bnb",
    title: { es: "Belo, por BNB Chain", en: "Belo, on BNB Chain" },
    kind: "address",
    currency: usdtOrUsdc,
    network: "BNB Chain (BEP-20)",
    value: "0x89794fc2ca30e7aff4aff215e236256698e8286b",
    note: { es: "Solo USDT o USDC, y solo por BNB Chain (BEP-20).", en: "Only USDT or USDC, and only on BNB Chain (BEP-20)." },
  },
  {
    id: "belo-solana",
    title: { es: "Belo, por Solana", en: "Belo, on Solana" },
    kind: "address",
    currency: usdtOrUsdc,
    network: "Solana",
    value: "3u1LfiRoipGF4jXBEyE8trfxFtYCw27KFx1UC68ZBk3h",
    note: { es: "Solo USDT o USDC, y solo por Solana.", en: "Only USDT or USDC, and only on Solana." },
  },
  {
    id: "wallet",
    title: { es: "Mi billetera", en: "My wallet" },
    kind: "address",
    currency: usdtOrUsdc,
    network: { es: "BNB Chain, Arbitrum o Base", en: "BNB Chain, Arbitrum or Base" },
    value: "",
    note: {
      es: "La misma dirección sirve en las tres redes: elegí la que tenga tu billetera o tu exchange.",
      en: "The same address works on all three networks: pick the one your wallet or exchange has.",
    },
  },
];

// Belo payment links are paid with Cash App from the United States. Each one asks for a fixed amount, never expires
// and can be paid by anyone, any number of times.
export const paymentLinks: PaymentLinkSource[] = [
  {
    id: "cashapp",
    title: { es: "Cash App, desde Estados Unidos", en: "Cash App, from the United States" },
    note: {
      es: "Cada botón pide un monto fijo en dólares y se paga desde Cash App.",
      en: "Each button asks for a fixed amount in dollars and is paid from Cash App.",
    },
    links: [
      { label: "1 USD", url: "" },
      { label: "5 USD", url: "" },
      { label: "10 USD", url: "" },
      { label: "20 USD", url: "" },
    ],
  },
  {
    id: "github",
    title: { es: "GitHub Sponsors, con tarjeta", en: "GitHub Sponsors, by card" },
    note: {
      es: "Por única vez o todos los meses, con una cuenta de GitHub. GitHub no cobra comisión.",
      en: "Once or every month, with a GitHub account. GitHub takes no fee.",
    },
    links: [{ label: { es: "Ir a GitHub Sponsors", en: "Go to GitHub Sponsors" }, url: "" }],
  },
];
