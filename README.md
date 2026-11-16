# career-portfolio

Personal portfolio of Guilherme Ludescher, live at https://gludescher.github.io.

Built with Astro, React islands, Tailwind CSS and Motion. Available in English (`/`) and Brazilian Portuguese (`/pt/`), with dark and light themes.

## Development

```sh
npm install
npm run dev        # http://localhost:4321
npm run check      # type check
npm run build      # static build in dist/
```

## Content

- `src/data/site.ts`: name, links, photo, and the per-language profile (tagline, about, skills, experience).
- `src/i18n.ts`: interface strings for each language.
- `src/content/projects/{en,pt}/<slug>.md`: one case study per project and language.
- `public/projects/<slug>/`: screenshots used by the case studies.

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages (`.github/workflows/deploy.yml`).
