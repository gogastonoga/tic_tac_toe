describe('winner-checker module tests', function () {

    beforeEach(function () {

        viewModule = {
            innerText: function (element, text) { },
            textContent: function (element) { },
            getById: function (id) { },
            popup: function (text) { }
        }

        spyOn(viewModule, "innerText");
        spyOn(viewModule, "textContent");
        spyOn(viewModule, "getById");

    })

    it('should winner return (moves in line)', function () {

        //given
        var playerMoves = ["1", "2", "3", "4"];
        var playerMovesWinner = [];
        var playerMovesWinner = winnerCheckerModule.winnerBoards();
        //when
        var result = winnerCheckerModule.containsAll(playerMovesWinner[0], playerMoves);
        //then
        expect(result).toBe(true);

    });

    it('should winner return (moves in cross)', function () {

        //given
        var playerMoves = ["3", "9", "5", "6"];
        var playerMovesWinner = [];
        var playerMovesWinner = winnerCheckerModule.winnerBoards();
        //when
        var result = winnerCheckerModule.containsAll(playerMovesWinner[5], playerMoves);
        //then
        expect(result).toBe(true);

    });

    it('should lost return', function () {

        //given
        var playerMoves = ["1", "9", "5", "6"];
        var playerMovesWinner = [];
        var playerMovesWinner = winnerCheckerModule.winnerBoards();
        //when
        var result = winnerCheckerModule.containsAll(playerMovesWinner[5], playerMoves);
        //then
        expect(result).toBe(false);

    });

    it('should create array with players X draw', function () {

        //given
        var moves = [{ id: "1", player: "O" }, { id: "2", player: "X" }, { id: "3", player: "X" }, { id: "4", player: "X" },
        { id: "5", player: "O" }, { id: "6", player: "O" }, { id: "7", player: "O" }, { id: "8", player: "X" },
        { id: "9", player: "X" }];
        //when
        var result = winnerCheckerModule.createMovesOfPlayer("X", moves);
        //then
        expect(result).toEqual(["2", "3", "4", "8", "9"]);
    });


    it('should create array with players X moves', function () {

        //given
        var moves = [{ id: 3, player: "X" }, { id: 5, player: "X" }, { id: 9, player: "O" }];
        //when
        var result = [];
        result = winnerCheckerModule.createMovesOfPlayer("X", moves);
        //then
        var expected = [3, 5];
        expect(result).toEqual(expected);
    });

    it('should create array with players O moves', function () {

        //given
        var moves = [{ id: 3, player: "O" }, { id: 6, player: "O" }, { id: 4, player: "X" }, { id: 9, player: "O" }];
        //when
        var result = [];
        result = winnerCheckerModule.createMovesOfPlayer("O", moves);
        //then
        expect(result).toEqual([3, 6, 9]);
    });

    it('should return empty array with players X moves', function () {

        //given
        var moves = [{ id: "3", player: "O" }];
        //when
        var result = [];
        result = winnerCheckerModule.createMovesOfPlayer("X", moves);
        //then
        expect(result).toEqual([]);
    });

    it('should return empty array with players O moves', function () {

        //given
        var moves = [{ id: "8", player: "X" }];
        //when
        var result = [];
        result = winnerCheckerModule.createMovesOfPlayer("O", moves);
        //then
        expect(result).toEqual([]);
    });

    it('should return winner (O)', function () {

        //given
        var moves = [{ id: "3", player: "O" }, { id: "6", player: "O" }, { id: "4", player: "X" }, { id: "9", player: "O" }, { id: "5", player: "X" }];
        //when
        var result = winnerCheckerModule.checkWinner("O", moves);
        //then
        expect(result).toBe(true);
    });

    it('should return winner (X)', function () {

        //given
        var moves = [{ id: "1", player: "X" }, { id: "6", player: "O" }, { id: "5", player: "X" }, { id: "9", player: "X" }, { id: "5", player: "O" }];
        //when
        var result = winnerCheckerModule.checkWinner("X", moves);
        //then
        expect(result).toBe(true);
    });

    it('should return lost (X)', function () {

        //given
        var moves = [{ id: "1", player: "X" }, { id: "6", player: "O" }, { id: "5", player: "X" }, { id: "9", player: "X" }, { id: "5", player: "O" }];
        //when
        var result = winnerCheckerModule.checkWinner("O", moves);
        //then
        expect(result).toBe(false);
    });

    it('should check call two functions in calculateStats', function () {

        //given
        var player = "X";
        //when
        var points = winnerCheckerModule.calculateStats(player);
        //then
        expect(viewModule.textContent).toHaveBeenCalled();
        expect(viewModule.innerText).toHaveBeenCalled();
    });

});