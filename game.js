'use strict'
var tabOfMoveHistory = [],
    board = new Array(9),
    boxInserted = 0,
    wonO = 0,
    wonX = 0,
    draw = 0,
    result = false;
const PLAYER_O = 'O',
    PLAYER_X = 'X',
    GAME_OVER = 'Game over',
    EMPTY = '',
    RESULT_DRAW = 'draw',
    RED = 'red',
    GREEN = 'green';

function startGame() {
    clearMoveHistory();
    switchPlayer();
    setMessage("Player starts: " + document.turn);
}

function nextMove(box) {
    if (document.winner) {
        setMessage(GAME_OVER);
    }
    else if (box.innerText === EMPTY) {
        box.innerText = document.turn;
        board[box.id] = document.turn;
        updateMoveHistory(box.id);
        switchMoveOrEndGame(box);
    }
}

function switchMoveOrEndGame(box) {
    if (isGameEnded(box));
    else {
        switchMove(box);
    }
}
function isGameEnded(box) {
    if (checkIfPlayerIsWinner(document.turn)) {
        setColor(box);
        informUserWin();
        updateWinStats();
        return true;
    }
    else if (checkIsGameStatusDraw()) {
        setColor(box);
        informUserDraw();
        updateDrawStats();
        return true;
    }
    return false;
}
function switchMove(box) {
    if (document.turn === PLAYER_X) {
        setColor(box);
        document.turn = PLAYER_O;
    } else {
        setColor(box);
        document.turn = PLAYER_X;
    }
}

function setColor(box) {
    box.style.color = RED;
    if (document.turn == PLAYER_O) {
        box.style.color = GREEN;
    }
}

function informUserDraw() {
    document.winner = RESULT_DRAW;
    setMessage(GAME_OVER);
    setTimeout(function () { alert("It's a " + document.winner) }, 5);
}

function informUserWin() {
    setMessage(GAME_OVER);
    setTimeout(function () { alert("Player " + document.winner + " won") }, 5);
}

function updateDrawStats() {
    draw++;
    document.getElementById("scoreDraw").innerText = draw;
}

function switchPlayer() {
    if (isSliderChecked()) {
        document.turn = PLAYER_X;
        return document.turn;
    }
    else {
        document.turn = PLAYER_O;
        return document.turn;
    }
}
function isSliderChecked() {
    return document.getElementById("slide").checked;
}

function resetGame() {
    resetBoard();
    resetStatistics();
    startGame();
}

function resetBoard() {
    for (var i = 0; i < 9; i++) {
        board[i] = undefined;
    }
    resetViewOfBoard();
}

function resetViewOfBoard() {
    for (var i = 0; i < 9; i++) {
        document.getElementById(i).innerText = EMPTY;
    }
}

function resetStatistics() {
    document.winner = undefined;
    result = false;
    wonO = 0;
    wonX = 0;
    draw = 0;
    resetViewOfStatistics();
}

function resetViewOfStatistics() {
    document.getElementById("scoreX").innerText = wonX;
    document.getElementById("scoreO").innerText = wonO;
    document.getElementById("scoreDraw").innerText = draw;
}

function nextRound() {
    resetBoard();
    document.winner = undefined;
    result = false;
    startGame();
}

function updateWinStats() {
    if (document.turn === 'X') {
        wonX++;
        document.getElementById("scoreX").innerText = wonX;
    }
    else {
        wonO++;
        document.getElementById("scoreO").innerText = wonO;
    }
}

function updateMoveHistory(id) {
    tabOfMoveHistory[boxInserted] = id;
    boxInserted++;
}
function clearMoveHistory() {
    tabOfMoveHistory = [];
    boxInserted = 0;
}

function moveBack() {
    if (boxInserted > 0) {
        boxInserted--;
        board[tabOfMoveHistory[boxInserted]] = undefined;
        moveBackView(boxInserted);
        tabOfMoveHistory[boxInserted] = undefined;
    }
}

function moveBackView(boxInserted){
    document.turn = document.getElementById(tabOfMoveHistory[boxInserted]).innerText;
    var box = document.getElementById(tabOfMoveHistory[boxInserted]);
    box.innerText = EMPTY;
}

function setMessage(msg) {
    document.getElementById("playerStartInfo").innerText = msg;
}
