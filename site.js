const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const grid = 30;
const cols = canvas.width / grid;
const rows = canvas.height / grid;

const tetrominoes = [
    // I
    [[1, 1, 1, 1]],
    // J
    [[1, 0, 0], [1, 1, 1]],
    // L
    [[0, 0, 1], [1, 1, 1]],
    // O
    [[1, 1], [1, 1]],
    // S
    [[0, 1, 1], [1, 1, 0]],
    // T
    [[0, 1, 0], [1, 1, 1]],
    // Z
    [[1, 1, 0], [0, 1, 1]]
];

let board = Array.from({ length: rows }, () => Array(cols).fill(0));
let tetromino;
let tetrominoRow;
let tetrominoCol;
let score = 0;
let level = 1;
let walletId = null;

async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const resp = await window.solana.connect();
            walletId = resp.publicKey.toString();
            document.getElementById('walletId').innerText = walletId;
        } catch (err) {
            console.error('Failed to connect to wallet:', err);
            document.getElementById('walletId').innerText = 'Falha ao conectar';
        }
    } else {
        alert('Solana wallet not found. Please install Phantom wallet.');
    }
}

function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * grid, y * grid, grid - 1, grid - 1);
    ctx.strokeRect(x * grid, y * grid, grid, grid);
}

function drawBoard() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            drawCell(col, row, board[row][col] ? 'blue' : 'white');
        }
    }
}

function drawTetromino() {
    for (let row = 0; row < tetromino.length; row++) {
        for (let col = 0; col < tetromino[row].length; col++) {
            if (tetromino[row][col]) {
                drawCell(tetrominoCol + col, tetrominoRow + row, 'blue');
            }
        }
    }
}

function collision(x, y, shape) {
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] && (
                board[row + y] && board[row + y][col + x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function merge() {
    for (let row = 0; row < tetromino.length; row++) {
        for (let col = 0; col < tetromino[row].length; col++) {
            if (tetromino[row][col]) {
                board[tetrominoRow + row][tetrominoCol + col] = 1;
            }
        }
    }
}

function resetTetromino() {
    tetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
    tetrominoRow = 0;
    tetrominoCol = Math.floor(cols / 2) - Math.floor(tetromino[0].length / 2);
    if (collision(tetrominoCol, tetrominoRow, tetromino)) {
        board = Array.from({ length: rows }, () => Array(cols).fill(0));
        alert('Game Over');
        score = 0;
        level = 1;
        document.getElementById('score').innerText = score;
        document.getElementById('level').innerText = level;
    }
}

function clearLines() {
    for (let row = rows - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            board.splice(row, 1);
            board.unshift(Array(cols).fill(0));
            score += 10;
            document.getElementById('score').innerText = score;
            if (score % 100 === 0) {
                level++;
                document.getElementById('level').innerText = level;
            }
        }
    }
}

function moveTetromino() {
    tetrominoRow++;
    if (collision(tetrominoCol, tetrominoRow, tetromino)) {
        tetrominoRow--;
        merge();
        resetTetromino();
        clearLines();
    }
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && !collision(tetrominoCol - 1, tetrominoRow, tetromino)) {
        tetrominoCol--;
    } else if (event.key === 'ArrowRight' && !collision(tetrominoCol + 1, tetrominoRow, tetromino)) {
        tetrominoCol++;
    } else if (event.key === 'ArrowDown' && !collision(tetrominoCol, tetrominoRow + 1, tetromino)) {
        moveTetromino();
    } else if (event.key === 'ArrowUp') {
        const rotated = rotate(tetromino);
        if (!collision(tetrominoCol, tetrominoRow, rotated)) {
            tetromino = rotated;
        }
    }
});

function rotate(shape) {
    return shape[0].map((_, index) => shape.map(row => row[index]).reverse());
}

function update() {
    moveTetromino();
    drawBoard();
    drawTetromino();
    setTimeout(update, 500 / level);
}

connectWallet();
resetTetromino();
update();






















        















