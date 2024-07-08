var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}


var board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')


document.getElementById('GetPuzzle').onclick = async function () {
    try {
        const response = await fetch('https://sugoku.onrender.com/board?difficulty=hard');
        const data = await response.json();
        console.log(data);
        board = data.board;
        FillBoard(board);
    } catch (error) {
        console.error('Error fetching puzzle:', error);
    }
};


SolvePuzzle.onclick = () => {
    solveSudoku(board, 0, 0);
};
function isValid(board, num, row, col) {
    for (let clm = 0; clm < 9; clm++) {
        if (board[row][clm] == num)
            return false;
    }
    for (let rw = 0; rw < 9; rw++) {
        if (board[rw][col] == num)
            return false;
    }
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] == num)
                return false;
        }
    }
    return true;
}

function solveSudoku(board, row, col) {
    if (row == 9) {

        FillBoard(board);
        return true;
    }
    if (col == 9) {
        return solveSudoku(board, row + 1, 0);
    }
    if (board[row][col] != 0) {
        return solveSudoku(board, row, col + 1);
    }
    for (let num = 1; num <= 9; num++) {
        if (isValid(board, num, row, col)) {
            board[row][col] = num;

            if (solveSudoku(board, row, col + 1))
                return true;
            else
                board[row][col] = 0;
        }
    }
    return false;
}