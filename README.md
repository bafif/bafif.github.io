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

- `src/data/projects.ts`: the showcases (`showcases`) and the smaller projects (`smallProjects`). Only public
  repositories go here.
- `src/data/career.ts`: experience, education and timeline.
- `src/data/profile.ts`: name, lead text and contact links.
- `src/data/support.ts`: the aliases, crypto address and payment links listed on `/donaciones/`
  (`src/pages/donaciones.astro`). Anything left empty is left out of the built page.
- `src/pages/privacy.astro`: privacy policy, also the privacy URL of the "Automatizaciones de Bautista Fiori" OAuth app (Google Cloud project `bafif-obsidian`).

## Look

The site itself wears Fiori, my personal brand: Albiceleste in light mode, Rojinegro in dark mode, Fraunces,
Instrument Sans and JetBrains Mono. Its tokens, fonts and emblem are copied from the brand kit into
`src/styles/marca/` and `public/marca/`; the mode follows the system and the toggle pins it with `data-tema`.

Each project is shown in its own look instead. `src/styles/pieles.css` holds one skin per project, taken from
that project's repository (palette, typefaces, motif), and `src/components/vitrinas/` has one component per
project that fills the shared layout (`Vitrina.astro`) with its own details and screenshots. The same skin class
dresses the project's tile in the index at the top. The projects' typefaces live in `src/styles/proyectos/`, with
their licenses, and the screenshots in `public/img/proyectos/`.

To add a project: an entry in `showcases`, a skin in `pieles.css`, a component in `vitrinas/` and its line in the
`skins` map of `src/pages/index.astro`. Check the skin's text colors in normal and protan vision before
publishing (I see as a protan): nothing told apart by hue alone, and no red as thin text on black.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it with GitHub Pages
(Settings → Pages → Source: GitHub Actions).
