var winnerCheckerModule = (function () {

    'use strict'
    
    var winnerBoards = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"],
    ["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]];
    var points;

    function containsAll(subArray, array) {
        for (var n = 0; n < subArray.length; n++) {
            if ($.inArray(subArray[n], array) == -1) return false;
        }
        return true;
    }

    var checkWinner = function (player, moves) {
        var currentyPlayerMoves = createMovesOfPlayer(player, moves);
        for (var j = 0; j < winnerBoards.length; j++) {
            if (containsAll(winnerBoards[j], currentyPlayerMoves)) {
                calculateStats(player);
                return true;
            }
        }
        return false;
    }

    var calculateStats = function (player) {
        var statsPlayer = viewModule.getById("stats" + player);
        points = 1 + parseInt(viewModule.textContent(statsPlayer));
        viewModule.innerText(statsPlayer, points);
        return points;
    }

    var createMovesOfPlayer = function (_player, moves) {
        var currentyPlayerMoves = [];
        for (var k = 0; k < moves.length; k++) {
            if (moves[k].player === _player) {
                currentyPlayerMoves.push(moves[k].id);
            }
        }
        return currentyPlayerMoves;
    }

    return {
        checkWinner: checkWinner,
        containsAll: containsAll,
        createMovesOfPlayer: createMovesOfPlayer,
        calculateStats: calculateStats,
        winnerBoards: function(){
            return winnerBoards;
        }
    }
})();

