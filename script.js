
"use strict";

// 1. Cinematic Intro

const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");
const skipIntro = document.getElementById("skipIntro");

function closeIntro() {
    if (intro) {
        intro.classList.add("hidden");
    }

    if (introVideo) {
        introVideo.pause();
    }
}

if (skipIntro) {
    skipIntro.addEventListener("click", closeIntro);
}

if (introVideo) {
    introVideo.addEventListener("ended", closeIntro);
    introVideo.addEventListener("error", closeIntro);
}


// 2. Hieroglyph-Inspired Name Game

const nameForm = document.getElementById("nameForm");
const visitorName = document.getElementById("visitorName");
const hieroglyphOutput = document.getElementById("hieroglyphOutput");
const nameResult = document.getElementById("nameResult");
const downloadName = document.getElementById("downloadName");

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

if (
    nameForm &&
    visitorName &&
    hieroglyphOutput &&
    nameResult &&
    downloadName
) {

    nameForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = visitorName.value
            .trim()
            .toUpperCase()
            .replace(/[^A-Z ]/g, "")
            .replace(/\s+/g, " ");

        if (!name) {
            hieroglyphOutput.textContent =
                "Please enter a name using English letters.";

            nameResult.hidden = false;
            downloadName.hidden = true;

            return;
        }

        currentName = name;

        const result = name
            .split("")
            .map(letter => {
                return letter === " "
                    ? "　"
                    : symbols[letter];
            })
            .join(" ");

        hieroglyphOutput.textContent = result;

        nameResult.querySelector("p").textContent =
            "Your name, inspired by ancient Egyptian symbols:";

        // Show the result
        nameResult.hidden = false;

        // Show download button
        downloadName.hidden = false;

    });


    // 3. Download Name as SVG

    downloadName.addEventListener("click", function() {

        if (!currentName) return;

        const symbolText = hieroglyphOutput.textContent;

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
                  fill="#A77C24">${escapeXML(currentName)}</text>

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

        setTimeout(() => URL.revokeObjectURL(url), 1000);

    });

}


// 4. Background Music (if music player exists)

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

if (backgroundMusic && musicButton) {

    musicButton.addEventListener("click", function() {

        if (backgroundMusic.paused) {

            backgroundMusic.play()
                .then(() => {
                    musicButton.textContent = "♫ Pause Music";
                })
                .catch(() => {
                    musicButton.textContent = "♫ Play Music";
                });

        } else {

            backgroundMusic.pause();
            musicButton.textContent = "♫ Play Music";

        }

    });

}
