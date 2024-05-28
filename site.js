const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const grid = 30;
const cols = canvas.width / grid;
const rows = canvas.height / grid;

const tetrominoes = [
    [[1, 1, 1, 1]],
    [[1, 0, 0], [1, 1, 1]],
    [[0, 0, 1], [1, 1, 1]],
    [[1, 1], [1, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[0, 1, 0], [1, 1, 1]],
    [[1, 1, 0], [0, 1, 1]]
];

let board = Array.from({ length: rows }, () => Array(cols).fill(0));
let tetromino;
let tetrominoRow;
let tetrominoCol;
let score = 0;
let level = 1;
let walletId = null;
let isPlaying = false;
let isPaused = false;
let scoreTable = JSON.parse(localStorage.getItem('scoreTable')) || [];

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
        updateScoreTable();
        score = 0;
        level = 1;
        document.getElementById('score').innerText = score;
        document.getElementById('level').innerText = level;
        isPlaying = false;
        document.getElementById('playButton').disabled = false;
        document.getElementById('pauseButton').disabled = true;
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
    if (isPaused) return;
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
    if (isPlaying && !isPaused) {
        moveTetromino();
        drawBoard();
        drawTetromino();
    }
    setTimeout(update, 500 / level);
}

function updateScoreTable() {
    const existingEntry = scoreTable.find(entry => entry.walletId === walletId);
    if (existingEntry) {
        if (score > existingEntry.score) {
            existingEntry.score = score;
        }
    } else {
        scoreTable.push({ walletId, score });
    }

    scoreTable.sort((a, b) => b.score - a.score);

    const tbody = document.getElementById('scoreTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    scoreTable.forEach(entry => {
        const row = document.createElement('tr');
        const walletIdCell = document.createElement('td');
        walletIdCell.innerText = entry.walletId;
        const scoreCell = document.createElement('td');
        scoreCell.innerText = entry.score;
        row.appendChild(walletIdCell);
        row.appendChild(scoreCell);
        tbody.appendChild(row);
    });

    localStorage.setItem('scoreTable', JSON.stringify(scoreTable));
}

document.getElementById('playButton').addEventListener('click', async () => {
    await connectWallet();
    if (walletId) {
        isPlaying = true;
        isPaused = false;
        document.getElementById('playButton').disabled = true;
        document.getElementById('pauseButton').disabled = false;
    }
});

document.getElementById('pauseButton').addEventListener('click', () => {
    isPaused = !isPaused;
    document.getElementById('pauseButton').innerText = isPaused ? 'Continuar' : 'Pausa';
});

function loadScoreTable() {
    const storedScoreTable = JSON.parse(localStorage.getItem('scoreTable')) || [];
    scoreTable = storedScoreTable;
    updateScoreTable();
}

resetTetromino();
loadScoreTable();
update();























        















