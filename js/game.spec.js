describe('game module tests', function () {

    beforeEach(function () {

        viewModule = {
            innerText: function (element, text) { },
            textContent: function (element) { },
            getById: function (id) { },
            innerText: function (element, text) { },
            popup: function (text) { }
        };

        spyOn(viewModule, "innerText");
        spyOn(viewModule, "textContent");
        spyOn(viewModule, "getById");

    })

    /////
    it('should check state game when moves.length < 5', function () {

        //given
        var moves = [{ id: "1", player: "O" }, { id: "2", player: "X" }, { id: "3", player: "X" }];
        //when
        var victory = gameModule.checkStateGame("X", moves, false);
        //then
        expect(victory).toBe(false);

    });


    it('should check state game', function () {

        //given
        var moves = [{ id: "3", player: "O" }, { id: "6", player: "O" }, { id: "4", player: "X" }, { id: "9", player: "O" },
        { id: "7", player: "X" }];
        var player = "O";
        //when
        var victory = gameModule.checkStateGame(player, moves);
        //then
        expect(victory).toBe(true);

    });

    it('should check state game (draw)', function () {

        //given
        var moves = [{ id: "1", player: "O" }, { id: "2", player: "X" }, { id: "3", player: "X" }, { id: "4", player: "X" },
        { id: "5", player: "O" }, { id: "6", player: "O" }, { id: "7", player: "O" }, { id: "8", player: "X" },
        { id: "9", player: "X" }];
        //when
        var victory = gameModule.checkStateGame("X", moves, false);
        //then
        expect(victory).toBe("draw");

    });

    it('should clean board', function () {

        //given
        var moves = [{ id: 3, player: "O" }, { id: 6, player: "O" }, { id: 4, player: "X" }, { id: 9, player: "O" }];
        //when
        gameModule.cleanBoard(moves);
        //then
        expect(gameModule.moves.length).toBe(0);
        expect(gameModule.moves).toEqual([]);
    });

    it('should clean board with zero moves', function () {

        //given
        var moves = [];
        //when
        gameModule.cleanBoard(moves);
        //then
        expect(gameModule.moves.length).toBe(0);
        expect(gameModule.moves).toEqual([]);
    });

    it('should change player (first move)', function () {

        //given
        var player = "X";
        var moves = [];
        //when
        var newPlayer = gameModule.changePlayer(moves, player);
        //then
        expect(newPlayer).toBe("X");

    });

    it('should change player (second move)', function () {

        //given
        var player = "X";
        var moves = [{ id: 3, player: "O" }];
        //when
        var newPlayer = gameModule.changePlayer(moves, player);
        //then
        expect(newPlayer).toBe("O");

    });

    it('should check call function in makeMove', function () {

        //given
        var player = "X";
        //when
        gameModule.makeMove(false, false, player);
        //then
        expect(viewModule.textContent).toHaveBeenCalled();

    });

});
