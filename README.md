# remix-of-verityguard-project-generator
Project from Orchids.app - remix-of-verityguard-project-generator

## Live preview (fixes 404)

This repo includes a minimal static site in `site/` and a GitHub Actions workflow to publish it to GitHub Pages. This avoids 404 errors and gives you a shareable live link.

### How it works

- `site/index.html` — homepage so Pages doesn’t 404
- `site/404.html` — SPA-friendly redirect for deep links
- `site/.nojekyll` — disables Jekyll processing
- `.github/workflows/pages.yml` — deploys `site/` to GitHub Pages on every push to `main`

### Enable GitHub Pages

1. Push the `main` branch with these files.
2. In GitHub: Settings → Pages → Build and deployment → Source: "GitHub Actions" (the workflow is already configured).
3. Wait for the workflow to finish. The live URL will appear in the workflow summary and under Settings → Pages.

The expected URL for a project site is:

```
https://samrudh2006.github.io/remix-of-verityguard-project-generator/
```

If your username or repository name differs, adjust accordingly.

### Preview locally (Windows PowerShell)

You can open the static site locally without a server:

1. Open `site/index.html` in your browser, or
2. Serve the folder with a tiny static server (optional):

```
# Using Python 3 if available
python -m http.server -d site 5173
# Then open: http://localhost:5173/
```

On Windows without Python, you can simply double-click `site/index.html`.

### Replacing with your app

When you’re ready, replace the contents of `site/` with your built app (for example, `dist/` output). Update the workflow’s `path:` if you change the folder.

