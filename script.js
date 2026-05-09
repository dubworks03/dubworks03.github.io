const generateBtn = document.getElementById("generateBtn");
const board = document.getElementById("bingoBoard");
const entriesInput = document.getElementById("entries");
const winMessage = document.getElementById("winMessage");

let cells = [];

generateBtn.addEventListener("click", generateBoard);

function generateBoard() {
  const entries = entriesInput.value
    .split("\n")
    .map(entry => entry.trim())
    .filter(entry => entry !== "");

  if (entries.length < 9) {
    alert("Please enter at least 9 entries.");
    return;
  }

  board.innerHTML = "";
  winMessage.classList.add("hidden");

  const shuffled = shuffleArray(entries).slice(0, 9);

  cells = [];

  shuffled.forEach((text, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = text;

    cell.dataset.index = index;

    cell.addEventListener("click", () => {
      cell.classList.toggle("marked");
      checkWin();
    });

    board.appendChild(cell);
    cells.push(cell);
  });
}

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

  const hasWon = winningCombos.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains("marked");
    });
  });

  if (hasWon) {
    triggerWin();
  }
}

function triggerWin() {
  winMessage.classList.remove("hidden");

  confetti({
    particleCount: 200,
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
  }, 400);
}

function shuffleArray(array) {
  const copied = [...array];

  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copied[i], copied[j]] = [copied[j], copied[i]];
  }

  return copied;
}
