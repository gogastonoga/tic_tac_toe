var gameModule = (function () {

    'use strict'

    var firstPlayer = "X";
    var player = "O";
    var isEmptyField;
    var moves = [];
    var victory = false;

    function PlayerMove(id, player) {
        this.id = id;
        this.player = player;
    }

    $(".newPlayer").each(function (index) {
        $(this).click(function () {
            var id = $(this).attr('id');
            id === "newPlayerX" ? firstPlayer = "X" : firstPlayer = "O";
        });
    });

    $(".box").each(function (index) {
        $(this).click(function () {
            makeMove(this, victory, player);
        });
    });

    var makeMove = function (box, _victory, _player) {
        if (_victory === false) {
            if (viewModule.textContent(box) === "") {
                changePlayer(moves, player);
                viewModule.innerText(box, player);
                var playerMove = new PlayerMove(box.id, player);
                moves.push(playerMove);
                checkStateGame(player, moves, _victory);
            } else {
                viewModule.popup("Niedozwolony ruch!");
            }
        }
    }

    var checkStateGame = function (_player, moves, _victory) {
        if (moves.length > 4) {
            if (winnerCheckerModule.checkWinner(_player, moves)) {
                viewModule.popup("Zwycięzcą jest gracz " + _player + "!");
                victory = true;
                return victory;
            }
        }
        if (moves.length === 9 && _victory === false) {
            viewModule.popup("Remis :)");
            victory = "draw";
        }
        return victory;
    }


    var changePlayer = function (moves, player_) {
        if (moves.length === 0) {
            player = firstPlayer;
        } else {
            player === "X" ? player = "O" : player = "X";
        }
        return player;
    }

    $("#remove-last-move").click(function () {
        if (moves.length > 0 && victory === false) {
            var lastMove = moves.pop(moves[moves.length - 1]);
            var lastField = viewModule.getById(lastMove.id);
            changePlayer(moves, player);
            viewModule.innerText(lastField, "");
        }
    });

    var cleanBoard = function (moves) {
        $('.box').each(function (index) {
            $(this).text("");
            moves.length = 0;
        });
    }

    $("#new-game").click(function () {
        victory = false;
        $("#statsX").text("0");
        $("#statsO").text("0");
        cleanBoard(moves);
    });

    $("#reset").click(function () {
        victory = false;
        cleanBoard(moves);
    });

    return {
        moves: moves,
        makeMove: makeMove,
        cleanBoard: cleanBoard,
        changePlayer: changePlayer,
        checkStateGame: checkStateGame
    }

})();