# bafif.github.io

Personal portfolio of Bautista Fiori, published at <https://bafif.github.io>.

Built with Astro, TypeScript and Tailwind CSS. Fonts (IBM Plex) are self-hosted; the site loads nothing from third
parties.

## Development

Everything runs in rootless Podman containers; never run `npm install` on the host. The repository is mounted
read-only, so nothing that runs inside can change the sources or `.git`: dependencies and the build live in
volumes. Astro's cache is a tmpfs, new in every container: Astro 7 keeps its dev server's pid there and stops
that pid on the next start, which in a fresh container can be the new server itself.

```sh
mkdir -p node_modules .astro dist            # once: their mount points
podman compose up --build                    # http://localhost:8080 (nginx → Astro dev server, with HMR)
podman compose run --rm web npm run build    # type-check and build (into the dist volume)
```

## Content

- `src/data/projects.ts`: project entries. Only public repositories go here.
- `src/data/career.ts`: experience, education and timeline.
- `src/data/profile.ts`: name, lead text, contact links and the hero pinout.
- `src/data/support.ts`: the aliases, crypto address and payment links listed on `/donaciones/`
  (`src/pages/donaciones.astro`). Anything left empty is left out of the built page.
- `src/pages/privacy.astro`: privacy policy, also the privacy URL of the "Automatizaciones de Bautista Fiori" OAuth app (Google Cloud project `bafif-obsidian`).

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it with GitHub Pages
(Settings → Pages → Source: GitHub Actions).
