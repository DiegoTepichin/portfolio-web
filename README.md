# Diego Tepichin — Portfolio

Personal portfolio of Diego Tepichin, systems engineer and founder of [CAFE](https://cafe-pricing.com).
A single typographic sheet: a fixed frame, an index of work that opens row by row, and a small
interactive demo inside each project.

**Live:** [diegotepichin.vercel.app](https://diegotepichin.vercel.app)

## What is in it

- **Real data only.** Repository figures (commits, languages) come from the public GitHub API and
  are snapshotted into `src/data/github.json`. Per-project facts are taken from each repository's
  README. The ISR demo uses the same 2026 tariff as
  [calculadoras-mx](https://github.com/DiegoTepichin/calculadoras-mx).
- **Spanish and English**, switched from the top bar. All copy lives in `src/content.js`.
- **Light and dark themes**, following the system until the visitor chooses.
- **Light on the wire.** React is the only runtime dependency. Layout, motion and scroll-driven
  animation are plain CSS; `prefers-reduced-motion` is respected.

## Run it

Requires Node.js 22+.

```bash
npm install
npm run dev          # http://localhost:5173
npm run lint
npm run build        # static output in dist/
npm run sync:github  # refresh src/data/github.json (set GITHUB_TOKEN to raise the rate limit)
```

## Structure

```
scripts/sync-github.mjs   Snapshot of the public GitHub profile
src/
├── content.js            All copy, in Spanish and English
├── data/                 github.json (generated) and the ISR 2026 tariff
├── i18n/                 Language context and provider
├── hooks/                useFitText, useMagnetic
├── components/
│   ├── Frame.jsx         Title bar, section rail, status bar
│   ├── Hero.jsx          Name poster with pointer-reactive weight
│   ├── Principles.jsx
│   ├── Work.jsx          The index of projects
│   ├── demos/            Elasticity curve, ISR calculator, MCP tools, pipeline flow
│   ├── Figures.jsx
│   └── Contact.jsx
└── index.css             The whole design system
```

## Contact

- GitHub: [github.com/DiegoTepichin](https://github.com/DiegoTepichin)
- LinkedIn: [linkedin.com/in/diego-duron-tepichin](https://www.linkedin.com/in/diego-duron-tepichin)
- Email: [durontepichindiego@gmail.com](mailto:durontepichindiego@gmail.com)
