
"use strict";

// 1. Cinematic intro
const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");
const skipIntro = document.getElementById("skipIntro");

function closeIntro() {
  intro.classList.add("hidden");
  introVideo.pause();
}

skipIntro.addEventListener("click", closeIntro);

// Close the intro when the video finishes
introVideo.addEventListener("ended", closeIntro);

// If the video cannot load, show the main website
introVideo.addEventListener("error", closeIntro);

// 2. Hieroglyph-inspired name game
const nameForm = document.getElementById("nameForm");
const visitorName = document.getElementById("visitorName");
const hieroglyphOutput = document.getElementById("hieroglyphOutput");
const nameResult = document.getElementById("nameResult");
const downloadName = document.getElementById("downloadName");

// Decorative symbols used for this game.
// These are NOT authentic translations of English letters.
const symbols = {
  A: "𓄿",
  B: "𓃀",
  C: "𓎡",
  D: "𓂧",
  E: "𓇋",
  F: "𓆑",
  G: "𓎼",
  H: "𓉔",
  I: "𓇋",
  J: "𓆓",
  K: "𓎡",
  L: "𓃭",
  M: "𓅓",
  N: "𓈖",
  O: "𓅱",
  P: "𓊪",
  Q: "𓈎",
  R: "𓂋",
  S: "𓋴",
  T: "𓏏",
  U: "𓅱",
  V: "𓆑",
  W: "𓅱",
  X: "𓎡𓋴",
  Y: "𓇌",
  Z: "𓊃"
};

let currentName = "";

nameForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = visitorName.value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z ]/g, "")
    .replace(/\s+/g, " ");

  if (!name) {
    hieroglyphOutput.textContent =
      "Please enter a name using English letters.";
    downloadName.hidden = true;
    return;
  }

  currentName = name;

  const result = name
    .split("")
    .map(letter => letter === " " ? "　" : (symbols[letter] || ""))
    .join(" ");

  hieroglyphOutput.textContent = result;
  nameResult.querySelector("p").textContent =
    "Your name, inspired by ancient Egyptian symbols:";
  downloadName.hidden = false;
});

// 3. Download the name design as an SVG image
downloadName.addEventListener("click", function () {
  if (!currentName) return;

  const symbolText = hieroglyphOutput.textContent;
  const safeName = currentName.replace(/[^A-Z ]/g, "");

  const escapeXML = (text) =>
    text.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="1000" height="500" viewBox="0 0 1000 500">
      <rect width="100%" height="100%" fill="#E8DCC2"/>
      <rect x="20" y="20" width="960" height="460"
            fill="none" stroke="#626B43" stroke-width="5"/>
      <text x="500" y="110" text-anchor="middle"
            font-family="Georgia, serif" font-size="36"
            fill="#171714">ANKHORA</text>
      <text x="500" y="205" text-anchor="middle"
            font-family="Georgia, serif" font-size="28"
            fill="#A77C24">${escapeXML(safeName)}</text>
      <text x="500" y="315" text-anchor="middle"
            font-size="65" fill="#A77C24">${escapeXML(symbolText)}</text>
      <text x="500" y="425" text-anchor="middle"
            font-family="Georgia, serif" font-size="20"
            fill="#626B43">A NAME INSPIRED BY ANCIENT EGYPT</text>
    </svg>`;

  const blob = new Blob([svg], {
    type: "image/svg+xml;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "ankhora-name.svg";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
});
