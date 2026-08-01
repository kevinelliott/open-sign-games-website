const games = {
  dos: {
    name: "Dos Esposas",
    fantasy: "Experiment inside a lively pixel cantina.",
    description:
      "Compose ingredients, commit a kitchen action, then inspect the exact result and consequence.",
    rhythm: "Exploratory",
    pressure: "Transformation choices",
    signature: "Inspectable consequence",
    status: "Active build",
    href: "#dos-esposas",
  },
  samurai: {
    name: "Samurai Sushi",
    fantasy: "Run an intimate sushi counter with precision and care.",
    description:
      "Prepare, sequence, plate, and read the guest while a small counter turns craft into quiet rhythm.",
    rhythm: "Quiet 6–10 minute shifts",
    pressure: "Counter space and attention",
    signature: "Rice, knife, and forming choreography",
    status: "Specification",
    href: "#samurai-sushi",
  },
  tender: {
    name: "The Tender Baron",
    fantasy: "Restore a warm steakhouse as fire captain and gracious host.",
    description:
      "Rake a readable coal bed, rest each cut, and land the whole table together before carving.",
    rhythm: "Slow-burn 12–18 minute services",
    pressure: "Heat, rest space, table promises",
    signature: "Deterministic doneness at carving",
    status: "Product foundation",
    href: "#tender-baron",
  },
  fry: {
    name: "Fry Signal",
    fantasy: "Conduct a neon drive-through during announced traffic waves.",
    description:
      "Forecast the rush, commit a batch, rewire the route, and recover the wrong turn without sacrificing care.",
    rhythm: "Setup lulls and 2–3 minute rushes",
    pressure: "Throughput and freshness",
    signature: "Tactile routing board",
    status: "Pre-release build",
    href: "#fry-signal",
  },
};

const keys = Object.keys(games);
const blockStage = document.querySelector(".block-stage");
const selectors = [...document.querySelectorAll("[data-game-select]")];
const facades = [...document.querySelectorAll("[data-game-facade]")];
const arrowButtons = [...document.querySelectorAll("[data-direction]")];
const detail = {
  name: document.querySelector("#signal-name"),
  fantasy: document.querySelector("#signal-fantasy"),
  description: document.querySelector("#signal-description"),
  rhythm: document.querySelector("#signal-rhythm"),
  pressure: document.querySelector("#signal-pressure"),
  signature: document.querySelector("#signal-signature"),
  status: document.querySelector("#signal-status"),
  link: document.querySelector("#signal-link"),
};

let activeKey = "dos";
let switchTimer;

document.body.classList.add("js-ready");

function setText(node, value) {
  if (node) node.textContent = value;
}

function activateGame(key, { focus = false } = {}) {
  const game = games[key];
  if (!game || key === activeKey) return;

  activeKey = key;
  blockStage.dataset.activeGame = key;
  blockStage.classList.remove("is-switching");
  window.clearTimeout(switchTimer);
  window.requestAnimationFrame(() => {
    blockStage.classList.add("is-switching");
    switchTimer = window.setTimeout(() => blockStage.classList.remove("is-switching"), 720);
  });

  selectors.forEach((selector) => {
    const selected = selector.dataset.gameSelect === key;
    selector.setAttribute("aria-current", selected ? "true" : "false");
    const state = selector.querySelector(".selector-state");
    if (state) state.textContent = selected ? "Selected" : "Preview";
  });

  facades.forEach((facade) => {
    const selected = facade.dataset.gameFacade === key;
    facade.classList.toggle("is-active", selected);
    if (selected && focus) facade.focus({ preventScroll: true });
  });

  setText(detail.name, game.name);
  setText(detail.fantasy, game.fantasy);
  setText(detail.description, game.description);
  setText(detail.rhythm, game.rhythm);
  setText(detail.pressure, game.pressure);
  setText(detail.signature, game.signature);
  setText(detail.status, game.status);
  detail.link.href = game.href;
}

function previewFromTarget(event) {
  const key = event.currentTarget.dataset.gameSelect ?? event.currentTarget.dataset.gameFacade;
  activateGame(key);
}

selectors.forEach((selector) => {
  selector.addEventListener("focus", previewFromTarget);
  selector.addEventListener("pointerenter", previewFromTarget);
  selector.addEventListener("click", previewFromTarget);
});

facades.forEach((facade) => {
  facade.addEventListener("focus", previewFromTarget);
  facade.addEventListener("pointerenter", previewFromTarget);
  facade.addEventListener("click", previewFromTarget);
});

arrowButtons.forEach((button) => {
  button.parentElement?.removeAttribute("aria-hidden");
  button.addEventListener("click", () => {
    const direction = button.dataset.direction === "next" ? 1 : -1;
    const currentIndex = keys.indexOf(activeKey);
    const nextIndex = (currentIndex + direction + keys.length) % keys.length;
    activateGame(keys[nextIndex], { focus: true });
  });
});

const hashKey = {
  "#dos-esposas": "dos",
  "#samurai-sushi": "samurai",
  "#tender-baron": "tender",
  "#fry-signal": "fry",
}[window.location.hash];

if (hashKey) {
  activeKey = "";
  activateGame(hashKey);
} else {
  blockStage.dataset.activeGame = activeKey;
}

const year = document.querySelector("#current-year");
if (year) year.textContent = new Date().getFullYear().toString();
