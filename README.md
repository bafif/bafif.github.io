# bafif.github.io

Personal portfolio of Bautista Fiori, published at <https://bafif.github.io>.

Built with Astro, TypeScript and Tailwind CSS. Fonts (IBM Plex) are self-hosted; the site loads nothing from third
parties.

## Development

Everything runs inside Docker; never run `npm install` on the host.

```sh
docker compose up --build      # http://localhost:8080 (nginx → Astro dev server, with HMR)
docker compose run --rm web npm run build   # type-check and build into dist/
```

## Content

- `src/data/projects.ts`: project entries. Only public repositories go here.
- `src/data/career.ts`: experience, education and timeline.
- `src/data/profile.ts`: name, lead text, contact links and the hero pinout.
- `src/pages/privacy.astro`: privacy policy, also used as the OAuth privacy URL for personal Google tools.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it with GitHub Pages
(Settings → Pages → Source: GitHub Actions).
