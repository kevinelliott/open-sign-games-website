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

if (!html.startsWith("<!doctype html>")) fail("index.html must use the HTML5 doctype");
if (!html.includes("<title>Open Sign Restaurant Group</title>")) fail("page title is not exact");
if ((html.match(/<h1\b/g) ?? []).length !== 1) fail("page must contain exactly one h1");
if (!html.includes("Powered by Tezos")) fail("Tezos attribution is missing");
if (!html.toLowerCase().includes("a crypto blockchain")) fail("Tezos needs a plain-language description");
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

if (!html.includes("assets/open-sign-mark.svg")) fail("group identity mark is missing");

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
  .filter((reference) => !reference.startsWith("http") && !reference.startsWith("mailto:"));

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
      scriptSyntax: "ok",
      designSystem: "ok",
    },
    null,
    2,
  ),
);
