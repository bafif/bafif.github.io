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
- `src/data/career.ts`: the timeline.
- `src/data/profile.ts`: name, lead text, contact links and the pinout of the DIP-16 chip in the hero.
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

## Motion

Each showcase comes in as it scrolls into view and has a small animation of its own, taken from what the project
does: the TellMAP map drifts inside its frame, a scan line sweeps Urna's reader, the xport query types itself out,
EX Emulators crosses out the flag that crashes. Rocola's now-playing screen is not a screenshot but the Ámbar theme
drawn in HTML and CSS (`src/components/vitrinas/RocolaPantalla.astro`), with the bubbles, the turning 45, the
chasing bulbs and a clock that follows the song. The chip in the hero runs a signal around its pins.

All of it lives in `src/styles/animaciones.css` and waits for the `anima` class, which `src/layouts/Base.astro`
sets only when the visitor hasn't asked for reduced motion; without it, or without JavaScript, the page is the
same page standing still. Animations stop while they are off screen.

## Videos

`public/video/` holds a short silent loop of a project running, with a poster of the same name (its first frame).
A showcase that has one (`video` in `src/data/projects.ts`) plays it while it is on screen; with reduced motion it
shows the poster and the browser's controls. They are recorded, not edited:

```sh
tools/videos/tellmap.sh                      # TellMAP in Godot, headless inside cage (needs ~/tmap)
node tools/grabar.mjs video https://bafif.github.io/foja/editor/ public/video/foja.mp4 --ancho 1440 --alto 860 \
  --esperar 5000 --segundos 14 --lento 0.25 --antes @tools/videos/foja-ejemplo.js --guion tools/videos/foja.mjs
node tools/grabar.mjs video http://localhost:8080/ public/video/rocola.mp4 --ancho 1366 --alto 900 --escala 2 \
  --selector .rc-bisel --recorte .rc-bisel --segundos 10 --lento 0.12      # with the dev stack up
```

`tools/grabar.mjs` drives headless Chrome: it slows every animation down, captures frames as fast as it can, stamps
each with the page's own time and lets ffmpeg resample them to a steady 30 frames per second, so the video is smooth
even though a capture takes much longer than a frame. A `--guion` module can scroll, type or click on the way.
Make each poster from the first frame (`ffmpeg -i x.mp4 -frames:v 1 x.png`, then `magick x.png -quality 80 x.webp`)
and keep each video under 2 MB.

## Link preview

`public/og.jpg` is the image WhatsApp, Telegram and LinkedIn show when the link is shared (Open Graph tags in
`src/layouts/Base.astro`). Its source is `tools/og-image.html`; after changing it, render it again at 1200×630
from the repository root and keep the JPEG under 300 KB:

```sh
google-chrome --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 \
  --virtual-time-budget=8000 --screenshot=og.png "file://$PWD/tools/og-image.html"
magick og.png -strip -quality 86 -interlace JPEG public/og.jpg && rm og.png
```

WhatsApp keeps a preview per link for a while: a link already shared before the change can keep showing the old
one.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it with GitHub Pages
(Settings → Pages → Source: GitHub Actions).
