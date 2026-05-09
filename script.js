const board = document.getElementById("board");
const calledList = document.getElementById("called-list");
const calledNumberDisplay = document.getElementById("called-number");
const machineBall = document.getElementById("machine-ball");
const winMessage = document.getElementById("win-message");
const scoreDisplay = document.getElementById("score");

let calledNumbers = [];
let availableNumbers = [];
let hasWon = false;
let playerName =
  localStorage.getItem("bingoPlayerName") || "Player";

let leaderboard =
  JSON.parse(localStorage.getItem("bingoLeaderboard")) || [];

let wins = localStorage.getItem("bingoWins") || 0;
scoreDisplay.textContent = wins;

function savePlayerName() {

  const input =
    document.getElementById("player-name");

  const name = input.value.trim();

  if (!name) {
    alert("Please enter a name.");
    return;
  }

  playerName = name;

  localStorage.setItem(
    "bingoPlayerName",
    playerName
  );

  alert("Name saved!");
}

function renderLeaderboard() {

  const leaderboardList =
    document.getElementById("leaderboard-list");

  leaderboardList.innerHTML = "";

  leaderboard
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .forEach((entry, index) => {

      const row = document.createElement("div");

      row.classList.add("leaderboard-entry");

      row.innerHTML = `
        <span class="rank">
          #${index + 1} ${entry.name}
        </span>

        <span>
          ${entry.score} wins
        </span>
      `;

      leaderboardList.appendChild(row);
    });
}

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
  hasWon = false;

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
      }

      checkWin();
    });

    board.appendChild(cell);
  });
}

function setupNumbers() {

  availableNumbers = generateRange(1, 75);
  calledNumbers = [];

  calledList.innerHTML = "";

  calledNumberDisplay.textContent = "--";
  machineBall.textContent = "--";
}

function animateBall(number) {

  machineBall.classList.remove("spin");

  machineBall.style.animation = "none";

  machineBall.offsetHeight;

  machineBall.style.animation = null;

  machineBall.textContent = number;

  machineBall.classList.add("spin");
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

  animateBall(number);

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

  if (hasWon) return;

  const cells = [...document.querySelectorAll(".cell")];

  const grid = [];

  while (cells.length) {
    grid.push(cells.splice(0, 5));
  }

  const isMarked = (r, c) =>
    grid[r][c].classList.contains("marked");

  for (let r = 0; r < 5; r++) {

    if ([0,1,2,3,4].every(c => isMarked(r, c))) {
      return showWin();
    }
  }

  for (let c = 0; c < 5; c++) {

    if ([0,1,2,3,4].every(r => isMarked(r, c))) {
      return showWin();
    }
  }

  if ([0,1,2,3,4].every(i => isMarked(i, i))) {
    return showWin();
  }

  if ([0,1,2,3,4].every(i => isMarked(i, 4 - i))) {
    return showWin();
  }
}

function showWin() {

  hasWon = true;

  winMessage.textContent = "🎉 BINGO! 🎉";

  wins++;

  localStorage.setItem("bingoWins", wins);

  scoreDisplay.textContent = wins;

  confetti({
    particleCount: 300,
    spread: 120,
    origin: { y: 0.6 }
  });
}

function resetGame() {

  setupNumbers();

  generateBoard();
}

setupNumbers();

generateBoard();
