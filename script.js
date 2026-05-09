const board = document.getElementById("board");
const calledList = document.getElementById("called-list");
const calledNumberDisplay = document.getElementById("called-number");
const winMessage = document.getElementById("win-message");

let calledNumbers = [];
let availableNumbers = [];

function generateRange(start, end) {
  return Array.from(
    { length: end - start + 1 },
    (_, i) => i + start
  );
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createColumn(start, end) {
  return shuffle(generateRange(start, end)).slice(0, 5);
}

function generateBoard() {
  board.innerHTML = "";
  winMessage.textContent = "";

  const columns = [
    createColumn(1, 15),
    createColumn(16, 30),
    createColumn(31, 45),
    createColumn(46, 60),
    createColumn(61, 75)
  ];

  const card = [];

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {

      let value = columns[col][row];

      if (row === 2 && col === 2) {
        value = "FREE";
      }

      card.push(value);
    }
  }

  card.forEach((value) => {
    const cell = document.createElement("div");

    cell.classList.add("cell");

    if (value === "FREE") {
      cell.classList.add("free", "marked");
    }

    cell.textContent = value;

    cell.addEventListener("click", () => {
      if (value !== "FREE") {
        cell.classList.toggle("marked");
        checkWin();
      }
    });

    board.appendChild(cell);
  });
}

function setupNumbers() {
  availableNumbers = generateRange(1, 75);
  calledNumbers = [];
  calledList.innerHTML = "";
  calledNumberDisplay.textContent = "--";
}

function drawNumber() {

  if (availableNumbers.length === 0) {
    alert("All numbers have been called.");
    return;
  }

  const randomIndex = Math.floor(
    Math.random() * availableNumbers.length
  );

  const number = availableNumbers.splice(randomIndex, 1)[0];

  calledNumbers.push(number);

  calledNumberDisplay.textContent = number;

  const ball = document.createElement("div");
  ball.classList.add("called-ball");
  ball.textContent = number;

  calledList.prepend(ball);

  autoMark(number);
}

function autoMark(number) {
  document.querySelectorAll(".cell").forEach(cell => {

    if (cell.textContent == number) {
      cell.classList.add("marked");
    }
  });

  checkWin();
}

function checkWin() {

  const cells = [...document.querySelectorAll(".cell")];

  const grid = [];

  while (cells.length) {
    grid.push(cells.splice(0, 5));
  }

  const isMarked = (r, c) =>
    grid[r][c].classList.contains("marked");

  // Rows
  for (let r = 0; r < 5; r++) {
    if ([0,1,2,3,4].every(c => isMarked(r, c))) {
      return showWin();
    }
  }

  // Columns
  for (let c = 0; c < 5; c++) {
    if ([0,1,2,3,4].every(r => isMarked(r, c))) {
      return showWin();
    }
  }

  // Diagonal 1
  if ([0,1,2,3,4].every(i => isMarked(i, i))) {
    return showWin();
  }

  // Diagonal 2
  if ([0,1,2,3,4].every(i => isMarked(i, 4 - i))) {
    return showWin();
  }
}

function showWin() {
  winMessage.textContent = "🎉 BINGO! 🎉";
}

function resetGame() {
  setupNumbers();
  generateBoard();
}

setupNumbers();
generateBoard();
