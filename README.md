# Interactive English Lessons

React + TypeScript site for interactive English lessons. It is prepared for static hosting on GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Build for GitHub Pages

```bash
npm run build
```

Upload the repository to GitHub and enable Pages with **Source: GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds the site and publishes the `dist` folder automatically after pushes to `main`.

The Vite `base` option is set to `./`, so the site can work from a project Pages path such as `https://username.github.io/repository-name/`.
