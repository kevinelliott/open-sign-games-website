import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const fail = (message) => {
  throw new Error(message);
};

const html = read("index.html");
const css = read("styles.css");
const script = read("script.js");
const design = read("DESIGN.md");
const designSidecar = JSON.parse(read(".impeccable/design.json"));
const cloudflareHeaders = read("_headers");

if (!html.startsWith("<!doctype html>")) fail("index.html must use the HTML5 doctype");
if (!html.includes("<title>Open Sign Restaurant Group</title>")) fail("page title is not exact");
if ((html.match(/<h1\b/g) ?? []).length !== 1) fail("page must contain exactly one h1");
if (!html.includes("Starting with Tezos")) fail("Tezos attribution is missing");
if (!html.includes("Our first planned blockchain")) fail("Tezos needs an exact future-state description");
if (!html.includes('src="assets/tezos-mark.svg"')) fail("Tezos mark is missing");
const tezosMarkReferences = html.split('src="assets/tezos-mark.svg"').length - 1;
if (tezosMarkReferences < 6) fail("Tezos identity must appear at the threshold, commitment strip, and all four restaurant chapters");
if ((html.match(/class="chapter-chain"/g) ?? []).length !== 4) {
  fail("every restaurant chapter needs its own Tezos first-chain marker");
}
if (!html.includes("First planned chain") || !html.includes("Planned first blockchain")) {
  fail("expanded Tezos references need exact future-state language");
}
if (html.includes("Powered by Tezos")) fail("Tezos must not be presented as a current deployment");
if (html.includes("https://github.com/")) fail("visitor-facing GitHub links are not allowed");

for (const title of ["Dos Esposas", "Samurai Sushi", "The Tender Baron", "Fry Signal"]) {
  if (!html.includes(title)) fail(`missing restaurant title: ${title}`);
}

for (const artwork of [
  "assets/restaurants/dos-esposas-kitchen.webp",
  "assets/restaurants/samurai-sushi-counter.webp",
  "assets/restaurants/tender-baron-hearth.webp",
  "assets/restaurants/fry-signal-kitchen.webp",
]) {
  const references = html.split(artwork).length - 1;
  if (references !== 2) {
    fail(`restaurant artwork must appear once in the façade and once in the chapter: ${artwork}`);
  }
}

if ((html.match(/class="facade-art"/g) ?? []).length !== 4) {
  fail("opening block must contain four restaurant artwork previews");
}

if (!css.includes("grid-template-rows: 74px minmax(0, 1fr) 42px")) {
  fail("façade artwork needs a shared full-height fill track");
}

if (!css.includes("min-height: 260px") || !css.includes("min-height: 300px")) {
  fail("façade artwork needs explicit responsive minimum heights");
}

const facadeArtRule = css.match(/\.facade-art\s*\{([\s\S]*?)\}/)?.[1] ?? "";
if (facadeArtRule.includes("transform:")) {
  fail("façade artwork state must not change image scale");
}

for (const overlay of [
  "awning",
  "facade-mullion",
  "noren",
  "baron-arch",
  "signal-lamps",
  "dispatch-window",
]) {
  if (html.includes(`class="${overlay}`)) {
    fail(`façade artwork must remain unobstructed: ${overlay}`);
  }
}

if (!facadeArtRule.includes("object-fit: cover") || !facadeArtRule.includes("object-position: center")) {
  fail("façade artwork needs one shared centered cover crop");
}

const blockStageRule = css.match(/\.block-stage\s*\{([^}]*)\}/)?.[1] ?? "";
if (!blockStageRule.includes("grid-template-rows: minmax(112px, auto) minmax(300px, 1fr) auto")) {
  fail("desktop stage must give surplus viewport height to façade artwork only");
}

if (!html.includes("assets/open-sign-mark.svg")) fail("group identity mark is missing");

const mark = read("assets/open-sign-mark.svg");
if (!mark.includes('data-part="os-monogram"') || !mark.includes('data-part="restaurant-color-rule"')) {
  fail("group mark must combine the OS house monogram and restaurant color rule");
}

const tezosMark = read("assets/tezos-mark.svg");
if (!tezosMark.includes('fill="#2C7DF7"') || !tezosMark.includes("Tezos")) {
  fail("Tezos mark must preserve the identified brand asset");
}
const lockupCount = [...html.matchAll(/class="[^"]*\bbrand-lockup\b[^"]*"/g)].length;
if (lockupCount !== 2 || html.includes('class="group-name"')) {
  fail("the canonical house lockup must appear exactly in the nav and threshold");
}

if (!html.includes('class="threshold-wire threshold-wire--left"') ||
    !html.includes('class="threshold-wire threshold-wire--right"') ||
    html.includes('class="group-circuit"')) {
  fail("threshold rails must terminate independently beside the canonical lockup");
}

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length) fail(`duplicate IDs: ${[...new Set(duplicateIds)].join(", ")}`);

const fragments = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
const brokenFragments = fragments.filter((fragment) => !ids.includes(fragment));
if (brokenFragments.length) fail(`broken fragment links: ${brokenFragments.join(", ")}`);

const localReferences = [
  ...html.matchAll(/(?:href|src)="([^"#][^"]*)"/g),
  ...css.matchAll(/url\("([^"]+)"\)/g),
]
  .map((match) => match[1])
  .filter((reference) => !reference.startsWith("http") && !reference.startsWith("mailto:"))
  .map((reference) => reference.split(/[?#]/, 1)[0]);

const missingFiles = [...new Set(localReferences)].filter(
  (reference) => !fs.existsSync(path.join(root, reference)),
);
if (missingFiles.length) fail(`missing local files: ${missingFiles.join(", ")}`);

for (const forbidden of ["react", "next/", "vue", "bootstrap", "node_modules"]) {
  if (html.toLowerCase().includes(forbidden)) fail(`runtime dependency leaked into HTML: ${forbidden}`);
}

if (!css.includes("prefers-reduced-motion: reduce")) fail("reduced-motion support is missing");
if (!css.includes("@media (max-width: 620px)")) fail("small-screen layout is missing");
if (!design.includes("Creative North Star")) fail("DESIGN.md is missing its north star");
if (designSidecar.schemaVersion !== 2) fail("design sidecar must use schemaVersion 2");
if (!cloudflareHeaders.includes("Content-Security-Policy:") ||
    !cloudflareHeaders.includes("X-Content-Type-Options: nosniff")) {
  fail("Cloudflare Pages security headers are incomplete");
}

new vm.Script(script, { filename: "script.js" });

console.log(
  JSON.stringify(
    {
      title: "Open Sign Restaurant Group",
      ids: ids.length,
      fragmentLinks: fragments.length,
      localReferences: new Set(localReferences).size,
      runtimeDependencies: 0,
      visitorGithubLinks: 0,
      restaurantArtwork: 4,
      facadeArtworkPreviews: 4,
      tezosAttribution: "ok",
      tezosMarkReferences,
      scriptSyntax: "ok",
      designSystem: "ok",
    },
    null,
    2,
  ),
);
