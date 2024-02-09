document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const message = document.getElementById("message");
  const resetButton = document.getElementById("reset-button");

  let currentPlayer = "X";
  let gameOver = false;
  const boardState = ["", "", "", "", "", "", "", "", ""];

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a];
      }
    }

    if (boardState.includes("") === false) {
      return "draw";
    }

    return null;
  }

  function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute("data-index"));

    if (boardState[cellIndex] || gameOver) return;

    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    const winner = checkWinner();
    if (winner) {
      if (winner === "draw") {
        message.textContent = "It's a draw!";
      } else {
        message.textContent = `${winner} wins!`;
      }
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `Current player: ${currentPlayer}`;
    }
  }

  function resetGame() {
    boardState.fill("");
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("X", "O");
    });
    message.textContent = "Let's play!";
    currentPlayer = "X";
    gameOver = false;
  }

  // Generate the game board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }

  resetButton.addEventListener("click", resetGame);
  resetGame();
});
