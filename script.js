const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restart");

let board, currentPlayer, gameActive;

function initializeGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  renderBoard();
  setStatus(`Player ${currentPlayer}'s turn`);
}

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, idx) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.dataset.index = idx;
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", onCellClick);
    boardElement.appendChild(cellDiv);
  });
}

function onCellClick(e) {
  const idx = e.target.dataset.index;
  if (!gameActive || board[idx] !== "") return;

  board[idx] = currentPlayer;
  renderBoard();

  if (checkWin(currentPlayer)) {
    setStatus(`Player ${currentPlayer} wins!`);
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    setStatus(`It's a draw!`);
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    setStatus(`Player ${currentPlayer}'s turn`);
  }
}

function setStatus(message) {
  statusElement.textContent = message;
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];
  return winPatterns.some(pattern =>
    pattern.every(idx => board[idx] === player)
  );
}

restartButton.addEventListener("click", initializeGame);

initializeGame();