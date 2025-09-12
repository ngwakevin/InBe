# InBeas — Belgium integration starter site

A simple, static website to help newcomers and experts navigate life in Belgium. Design inspired by modern step-by-step "How it works" pages, with original content (no third‑party text or assets copied).

## Structure
- index.html — Landing page with onboarding
- guides.html — Filterable guide cards (sample data)
- resources.html — Curated official links
- about.html — Mission
- join.html — Mock signup (client-side only)
- privacy.html — Simple privacy page
- css/styles.css — Styling
- js/app.js — Nav, year, onboarding routing
- js/guides.js — Guide rendering and filtering

## Run locally
Option A: Double-click `index.html` to open in your browser.

Option B: Serve with a local server (recommended for routing):

```sh
# macOS (zsh)
cd /Users/kngwa/Desktop/MGIBACkUP/INBe
python3 -m http.server 5500
# then open http://localhost:5500
```

## Customization
- Brand: Edit the `.logo` text or replace with an SVG in `assets/`.
- Colors: Update CSS variables at the top of `css/styles.css`.
- Guides: Edit the `guides` array in `js/guides.js`.
- Navigation: Update links in the header/footer of each page.

## Notes
- All copy here is original; reference sites were used only for layout inspiration.
- No build step or framework required. Works on any static host.
