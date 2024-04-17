let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', '']; 


function move(cellIndex) {
    if (board[cellIndex] === '') { 
        board[cellIndex] = currentPlayer;
        display();
        if (winnerCheck()) {
            showMessage(currentPlayer + " wins!");
            disableBoard();
        } else if (checkDraw()) {
            showMessage("It's a draw!");
            disableBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function winnerCheck() {
    const winSet = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for (let combo of winSet) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function display() {  //to display value in screen
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function showMessage(message) {
    document.getElementById('message').textContent = message;
}

function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.removeEventListener('click', cellClickHandler);
    });
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    display();
    showMessage('');
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', cellClickHandler);
    });
}

function cellClickHandler() {
    const cellIndex = this.dataset.index;
    move(cellIndex);
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', cellClickHandler);
});

document.getElementById('reset-btn').addEventListener('click', resetGame);

display();