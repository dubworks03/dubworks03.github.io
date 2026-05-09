const board = document.getElementById("bingoBoard");
const winMessage = document.getElementById("winMessage");

/*
========================================
CUSTOM BINGO ENTRIES
========================================

TYPES:
- text
- image
- audio

EXAMPLES:

{
  type: "text",
  content: "Martin screams"
}

{
  type: "image",
  src: "assets/meme.png"
}

{
  type: "audio",
  src: "assets/funny.mp3",
  label: "Play Sound"
}

========================================
*/

const bingoEntries = [

  {
    type: "text",
    content: "Martin says 'crazy'"
  },

  {
    type: "text",
    content: "Technical difficulties"
  },

  {
    type: "image",
    src: "assets/martin.png"
  },

  {
    type: "audio",
    src: "assets/funny.mp3",
    label: "Funny Sound"
  },

  {
    type: "text",
    content: "Chat goes wild"
  },

  {
    type: "image",
    src: "assets/reaction.jpg"
  },

  {
    type: "text",
    content: "Mentions food"
  },

  {
    type: "audio",
    src: "assets/laugh.mp3",
    label: "Laugh Clip"
  },

  {
    type: "text",
    content: "Unexpected scream"
  }

];

let cells = [];
let hasWon = false;

/*
========================================
GENERATE BOARD
========================================
*/

generateBoard();

function generateBoard() {

  if (bingoEntries.length < 9) {
    alert("You need at least 9 bingo entries.");
    return;
  }

  const shuffled = shuffleArray(bingoEntries).slice(0, 9);

  shuffled.forEach((entry, index) => {

    const cell = document.createElement("div");

    cell.classList.add("cell");
    cell.dataset.index = index;

    /*
    ============================
    TEXT ENTRY
    ============================
    */

    if (entry.type === "text") {

      const text = document.createElement("span");
      text.textContent = entry.content;

      cell.appendChild(text);
    }

    /*
    ============================
    IMAGE ENTRY
    ============================
    */

    if (entry.type === "image") {

      const img = document.createElement("img");

      img.src = entry.src;
      img.alt = "Bingo Image";

      img.classList.add("bingo-image");

      cell.appendChild(img);
    }

    /*
    ============================
    AUDIO ENTRY
    ============================
    */

    if (entry.type === "audio") {

      const audioWrapper = document.createElement("div");

      audioWrapper.classList.add("audio-wrapper");

      const button = document.createElement("button");

      button.classList.add("audio-button");
      button.textContent = entry.label || "Play Audio";

      const audio = document.createElement("audio");

      audio.src = entry.src;

      button.addEventListener("click", (e) => {

        e.stopPropagation();

        audio.currentTime = 0;
        audio.play();
      });

      audioWrapper.appendChild(button);
      audioWrapper.appendChild(audio);

      cell.appendChild(audioWrapper);
    }

    /*
    ============================
    MARK CELL
    ============================
    */

    cell.addEventListener("click", () => {

      cell.classList.toggle("marked");

      checkWin();
    });

    board.appendChild(cell);

    cells.push(cell);
  });
}

/*
========================================
CHECK WIN
========================================
*/

function checkWin() {

  const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
  ];

  const won = winningCombos.some(combo => {

    return combo.every(index => {
      return cells[index].classList.contains("marked");
    });
  });

  if (won && !hasWon) {

    hasWon = true;

    triggerWin();
  }
}

/*
========================================
WIN EFFECT
========================================
*/

function triggerWin() {

  winMessage.classList.remove("hidden");

  confetti({
    particleCount: 250,
    spread: 100,
    origin: { y: 0.6 }
  });

  setTimeout(() => {

    confetti({
      particleCount: 150,
      angle: 60,
      spread: 80,
      origin: { x: 0 }
    });

    confetti({
      particleCount: 150,
      angle: 120,
      spread: 80,
      origin: { x: 1 }
    });

  }, 300);
}

/*
========================================
SHUFFLE
========================================
*/

function shuffleArray(array) {

  const copied = [...array];

  for (let i = copied.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [copied[i], copied[j]] = [copied[j], copied[i]];
  }

  return copied;
}
