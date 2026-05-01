document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const statusText = document.getElementById("status");
    const pvpBtn = document.getElementById("pvpBtn");
    const cpuBtn = document.getElementById("cpuBtn");
    const resetBtn = document.getElementById("resetBtn");

    let currentPlayer = "X";
    let gameActive = false;
    let mode = null;
    let cells = [];

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function init() {
        createBoard();
        bindEvents();
        statusText.textContent = "Choose a mode to start";
    }

    function bindEvents() {
        pvpBtn.addEventListener("click", () => startGame("pvp", pvpBtn));
        cpuBtn.addEventListener("click", () => startGame("cpu", cpuBtn));
        resetBtn.addEventListener("click", resetGame);
    }

    function setActiveButton(activeBtn) {
        pvpBtn.classList.remove("active");
        cpuBtn.classList.remove("active");
        activeBtn.classList.add("active");
    }

    function createBoard() {
        board.innerHTML = "";
        cells = [];

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div"); cell.className = "cell"; cell.dataset.index = i;
            cell.addEventListener("click", handleClick); board.appendChild(cell); cells.push(cell);
        }
    } function
        startGame(selectedMode, btn) {
            mode = selectedMode; setActiveButton(btn); resetGame();
        statusText.textContent = (mode === "pvp" ? "Duel Mode" : "Vs Computer") + " - X's Turn";
    } function handleClick(e) {
        const cell = e.target; if (!gameActive || cell.textContent !== "") return; makeMove(cell, currentPlayer); if
            (checkGameEnd()) return; switchPlayer(); if (mode === "cpu" && currentPlayer === "O") { setTimeout(cpuMove, 400); }
    }
    function makeMove(cell, player) { cell.textContent = player; } function switchPlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X"; statusText.textContent = `${currentPlayer}'s Turn`;
    } function
        cpuMove() {
            const emptyCells = cells.filter(c => c.textContent === "");
        if (emptyCells.length === 0) return;

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        makeMove(randomCell, currentPlayer);

        if (checkGameEnd()) return;

        switchPlayer();
    }

    function checkGameEnd() {
        if (checkWinner()) {
            statusText.textContent = `${currentPlayer} Wins! 🎉`;
            gameActive = false;
            return true;
        }

        if (cells.every(cell => cell.textContent !== "")) {
            statusText.textContent = "It's a Draw! 🤝";
            gameActive = false;
            return true;
        }

        return false;
    }

    function checkWinner() {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;

            if (
                cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent
            ) {
                highlightWin(combo);
                return true;
            }
        }
        return false;
    }

    function highlightWin(combo) {
        combo.forEach(index => {
            cells[index].classList.add("win");
        });
    }

    function resetGame() {
        createBoard();
        currentPlayer = "X";
        gameActive = true;
    }

    init();
});