const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let cells = Array(9).fill('');
let gameActive = true;
function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', onCellClick);
    board.appendChild(cell);
  });
}
function onCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || cells[index]) return;
  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }
  if (cells.every(cell => cell)) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}
function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], 
    [0,3,6],[1,4,7],[2,5,8], 
    [0,4,8],[2,4,6]          
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}
resetBtn.addEventListener('click', () => {
  currentPlayer = 'X';
  cells = Array(9).fill('');
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
});
createBoard();