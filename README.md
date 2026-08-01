# Open Sign Restaurant Group

A dependency-free static homepage for four distinct pixel restaurant games:
Dos Esposas, Samurai Sushi, The Tender Baron, and Fry Signal.

## Run locally

No install or build step is required.

```sh
python3 -m http.server 8080
```

Then open <http://127.0.0.1:8080>.

Run the dependency-free source verification with:

```sh
node scripts/verify.mjs
```

## Deploy

The repository is ready for GitHub Pages. Configure Pages to deploy from the
repository branch and root directory; `index.html` is the entry point and
`.nojekyll` keeps the published output untouched.

## Project structure

```text
index.html           semantic content and inline geometric scenes
styles.css           responsive visual system and authored motion
script.js            optional progressive restaurant preview controls
favicon.svg          code-native group mark
assets/fonts/        self-hosted open fonts and their licenses
```

The core page remains readable and navigable when JavaScript, motion, or custom
fonts are unavailable.
