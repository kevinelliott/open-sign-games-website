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

## Deploy to Cloudflare Pages

Stage only the browser runtime files, then deploy the generated directory:

```sh
node scripts/stage-cloudflare.mjs
npx wrangler pages deploy .cloudflare-dist \
  --project-name open-sign-restaurant-group \
  --branch main
```

The production project uses `opensign.rest` as its custom domain. The staged
artifact includes Cloudflare Pages security headers but excludes repository
documentation, design records, and verification tooling.

The repository also remains compatible with GitHub Pages from the repository
root; `.nojekyll` keeps that published output untouched.

## Project structure

```text
index.html           semantic content and inline geometric scenes
styles.css           responsive visual system and authored motion
script.js            optional progressive restaurant preview controls
favicon.svg          code-native group mark
assets/open-sign-mark.svg  scalable group identity mark
assets/tezos-mark.svg      Tezos chain identity mark
assets/restaurants/  optimized restaurant environment artwork
assets/fonts/        self-hosted open fonts and their licenses
```

The core page remains readable and navigable when JavaScript, motion, or custom
fonts are unavailable.
