/*
========================================
MARTIN MEGA BINGO
========================================

HOW TO CUSTOMIZE:

1. TEXT
{
    type: "text",
    content: "Hello World"
}

2. IMAGE
Put image inside:
assets/

Example:
{
    type: "image",
    content: "assets/my-image.jpg"
}

3. AUDIO
Put audio inside:
assets/

Example:
{
    type: "audio",
    content: "assets/my-song.mp3",
    label: "Play Audio 🔊"
}

========================================
*/

const bingoItems = [
    {
        type: "text",
        content: "Coffee Break ☕"
    },

    {
        type: "image",
        content: "assets/sample.jpg"
    },

    {
        type: "audio",
        content: "assets/sample.mp3",
        label: "Play Audio 🔊"
    },

        {
        type: "text",
        content: "MAMAMIA"
    },

    {
        type: "text",
        content: "Bug Found 🐛"
    },

    {
        type: "text",
        content: "Deploy Time 🚀"
    },

    {
        type: "text",
        content: "Snack Attack 🍕"
    },

    {
        type: "text",
        content: "Late Night Coding 🌙"
    },

    {
        type: "text",
        content: "Team Meeting"
    },

    {
        type: "text",
        content: "Keyboard Smash ⌨️"
    }
];

const board = document.getElementById("bingo-board");
const resetBtn = document.getElementById("reset-btn");
const title = document.getElementById("title");

let selectedCells = Array(9).fill(false);
let gameWon = false;

/* ========================================
CREATE BOARD
======================================== */

function createBoard() {

    board.innerHTML = "";

    bingoItems.forEach((item, index) => {

        const cell = document.createElement("div");
        cell.classList.add("bingo-cell");

        // TEXT
        if (item.type === "text") {

            cell.innerHTML = `
                <div class="text-content">
                    ${item.content}
                </div>
            `;
        }

        // IMAGE
        else if (item.type === "image") {

            cell.innerHTML = `
                <img src="${item.content}" alt="Bingo Image">
            `;
        }

        // AUDIO
        else if (item.type === "audio") {

            cell.innerHTML = `
                <button class="audio-button">
                    ${item.label || "Play Audio"}
                </button>
            `;

            const audio = new Audio(item.content);

            const button = cell.querySelector("button");

            button.addEventListener("click", (event) => {

                event.stopPropagation();

                audio.currentTime = 0;
                audio.play();
            });
        }

        cell.addEventListener("click", () => {

            if (gameWon) return;

            selectedCells[index] = !selectedCells[index];

            cell.classList.toggle("active");

            checkWin();
        });

        board.appendChild(cell);
    });
}

/* ========================================
CHECK WIN
======================================== */

function checkWin() {

    const winPatterns = [

        // Horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // Vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // Diagonal
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {

        const hasWon = pattern.every(index => selectedCells[index]);

        if (hasWon) {

            triggerWin();

            return;
        }
    }
}

/* ========================================
WIN EFFECT
======================================== */

function triggerWin() {

    gameWon = true;

    title.classList.add("win-animation");

    // First confetti blast
    confetti({
        particleCount: 250,
        spread: 120,
        origin: { y: 0.6 }
    });

    // Second blast
    setTimeout(() => {

        confetti({
            particleCount: 200,
            spread: 180
        });

    }, 500);

    // Third blast
    setTimeout(() => {

        confetti({
            particleCount: 150,
            spread: 360
        });

    }, 1000);

    setTimeout(() => {
        alert("🎉 BINGO! YOU WON!");
    }, 300);
}

/* ========================================
RESET GAME
======================================== */

resetBtn.addEventListener("click", () => {

    selectedCells = Array(9).fill(false);

    gameWon = false;

    title.classList.remove("win-animation");

    document.querySelectorAll(".bingo-cell").forEach(cell => {

        cell.classList.remove("active");
    });
});

/* ========================================
START GAME
======================================== */

createBoard();
