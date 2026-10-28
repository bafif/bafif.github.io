import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const hmrClientPort = process.env.HMR_CLIENT_PORT
  ? Number(process.env.HMR_CLIENT_PORT)
  : undefined;

export default defineConfig({
  site: "https://bafif.github.io",
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: hmrClientPort ? { clientPort: hmrClientPort } : undefined,
    },
  },
});
