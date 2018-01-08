'use strict';
function checkIfPlayerIsWinner(turn) {
    document.winner = null;
    if (combination(0, 1, 2, turn) || combination(3, 4, 5, turn) || combination(6, 7, 8, turn) ||
        combination(0, 4, 8, turn) || combination(2, 4, 6, turn) || combination(0, 3, 6, turn) ||
        combination(1, 4, 7, turn) || combination(2, 5, 8, turn)) {
        document.winner = document.turn;
        result = true;
    }
    return result;
}
function combination(posOne, posTwo, posThree, turn) {
    return (getBox(posOne) === turn && getBox(posTwo) === turn && getBox(posThree) === turn);
}
function getBox(numberId) {
    return board[numberId];
}
function checkIsGameStatusDraw() {
    for (var i = 0; i < 9; i++) {
        if (getBox(i) === undefined) {
            return false;
        }
    }
    return true;
}
