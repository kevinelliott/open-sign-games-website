import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, ".cloudflare-dist");
const runtimeFiles = [
  "_headers",
  "favicon.svg",
  "index.html",
  "script.js",
  "styles.css",
];

fs.rmSync(output, { force: true, recursive: true });
fs.mkdirSync(output, { recursive: true });

for (const file of runtimeFiles) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}

fs.cpSync(path.join(root, "assets"), path.join(output, "assets"), {
  recursive: true,
});

console.log(
  JSON.stringify(
    {
      output: path.relative(root, output),
      runtimeFiles,
      assets: fs.readdirSync(path.join(output, "assets"), { recursive: true }).length,
    },
    null,
    2,
  ),
);
