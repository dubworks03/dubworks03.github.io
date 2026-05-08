const board = document.getElementById("board");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateBoard() {
  const input = document.getElementById("phrases").value.trim();

  let phrases = input
    .split("\n")
    .map(p => p.trim())
    .filter(Boolean);

  if (phrases.length < 24) {
    alert("Please enter at least 24 phrases.");
    return;
  }

  phrases = shuffle(phrases);

  board.innerHTML = "";

  const selected = phrases.slice(0, 24);

  selected.splice(12, 0, "FREE SPACE");

  selected.forEach((text, index) => {
    const cell = document.createElement("div");

    cell.classList.add("cell");

    if (text === "FREE SPACE") {
      cell.classList.add("free", "marked");
    }

    cell.textContent = text;

    cell.addEventListener("click", () => {
      if (text !== "FREE SPACE") {
        cell.classList.toggle("marked");
      }
    });

    board.appendChild(cell);
  });
}

function resetBoard() {
  document.querySelectorAll(".cell").forEach(cell => {
    if (!cell.classList.contains("free")) {
      cell.classList.remove("marked");
    }
  });
}
