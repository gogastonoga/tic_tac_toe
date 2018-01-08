'use strict';
describe("Should ", function () {
    beforeEach(function () {
        for (var i = 0; i < 9; i++) {
            board[i] = undefined;
        }
        result = false;
    });

    it("detect win when X is an active player", function () {
        //given
        board[0] = 'X';
        board[3] = 'X';
        board[6] = 'X';
        //when then
        expect(checkIfPlayerIsWinner('X')).toBe(true);
    });

    it("detect win when O is an active player", function () {
        //given
        board[0] = 'O';
        board[1] = 'O';
        board[2] = 'O';
        //when then
        expect(checkIfPlayerIsWinner('O')).toBe(true);
    });

    it("detect win when X is an active player", function () {
        //given
        board[0] = 'X';
        board[4] = 'X';
        board[8] = 'X';
        //when then
        expect(checkIfPlayerIsWinner('X')).toBe(true);
    });

    it("detect win when O is an active player", function () {
        //given
        board[1] = 'O';
        board[4] = 'O';
        board[7] = 'O';
        //when then
        expect(checkIfPlayerIsWinner('O')).toBe(true);
    });

    it("not detect win when X is an active player", function () {
        //given
        board[0] = 'X';
        board[7] = 'X';
        board[8] = 'X';
        //when then
        expect(checkIfPlayerIsWinner('X')).toBeFalsy();
    });

    it("not detect win when O is an active player", function () {
        //given
        board[0] = 'O';
        board[3] = 'O';
        board[4] = 'O';
        //when then
        expect(checkIfPlayerIsWinner('O')).toBeFalsy();
    });

    it("not detect win when O is an active player", function () {
        //given
        board[0] = 'X';
        board[4] = 'X';
        board[8] = 'X';
        //when then
        expect(checkIfPlayerIsWinner('O')).toBeFalsy();
    });

    it("detect win when X is an active player", function () {
        //given
        board[1] = 'O';
        board[4] = 'O';
        board[7] = 'O';
        //when then
        expect(checkIfPlayerIsWinner('X')).toBeFalsy();
    });
});

describe("Should ", function () {
    beforeEach(function () {
        for (var i = 0; i < 9; i++) {
            board[i] = undefined;
        }
        result = false;
    });

    it("detect draw", function () {
        //given
        board[0] = 'X';
        board[1] = 'X';
        board[2] = 'O';
        board[3] = 'X';
        board[4] = 'O';
        board[5] = 'X';
        board[6] = 'O';
        board[7] = 'X';
        board[8] = 'O';
        //when then
        expect(checkIsGameStatusDraw()).toBeTruthy();
    });

    it("not detect draw", function () {
        //given
        board[0] = 'X';
        board[3] = 'X';
        board[6] = 'X';
        //when 
        checkIsGameStatusDraw()
        //then
        expect(checkIsGameStatusDraw()).toBeFalsy();
    });


});

describe("Should ", function () {

    it("switch player to X", function () {
        //given
        var turn = 'X';
        spyOn(window, 'isSliderChecked').and.returnValue(true);
        //when 
        //then
        expect(switchPlayer()).toBe(turn);
    });

    it("switch player to O", function () {
        //given
        var turn = 'O';
        spyOn(window, 'isSliderChecked').and.returnValue(false);
        //when 
        //then
        expect(switchPlayer()).toBe(turn);
    });

});

describe("Should ", function () {

    beforeEach(function () {
        spyOn(window, 'setMessage');
        spyOn(window, 'isSliderChecked').and.returnValue(true);
        startGame();
        board = [];
    });

    it(' set X on empty field', function () {
        //given 
        var box = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(box);
        box.innerText = EMPTY;
        box.id = 1;
        //when
        nextMove(box);
        //then
        expect(box.innerText).toEqual(PLAYER_X);
        expect(tabOfMoveHistory.length).toEqual(1);
    });

    it('set message end game and not add to history and board', function () {
        //given 
        var box = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(box);
        box.innerText = PLAYER_X;
        document.winner = PLAYER_X;
        //when
        nextMove(box);
        //then
        expect(tabOfMoveHistory.length).toEqual(0);
        expect(board.length).toEqual(0);
    });

});

describe("Should ", function () {

    beforeEach(function () {
        resetGame();
        spyOn(window, 'setMessage');
        spyOn(window, 'setTimeout');
        spyOn(window, 'setColor');
    });

    it(' update user win stats and assign winner', function () {
        //given 
        spyOn(window, 'checkIfPlayerIsWinner').and.returnValue(true);
        var box = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(box);
        document.turn = PLAYER_X;
        //when
        switchMoveOrEndGame(box);
        //then
        expect(wonX).toEqual(1);
        expect(isGameEnded()).toBeTruthy();
        expect(window.setMessage).toHaveBeenCalled();
        expect(window.setTimeout).toHaveBeenCalled();
        expect(window.setColor).toHaveBeenCalled();
    });

    it('update user draw stats and assign draw', function () {
        //given 
        spyOn(window, 'checkIfPlayerIsWinner').and.returnValue(false);
        spyOn(window, 'checkIsGameStatusDraw').and.returnValue(true);
        var box = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(box);
        document.turn = PLAYER_X;
        //when
        switchMoveOrEndGame(box);
        //then
        expect(draw).toEqual(1);
        expect(isGameEnded()).toBeTruthy();
        expect(window.setMessage).toHaveBeenCalled();
        expect(window.setTimeout).toHaveBeenCalled();
        expect(window.setColor).toHaveBeenCalled();
    });

    it('switch player from X to O', function () {
        //given 
        spyOn(window, 'checkIfPlayerIsWinner').and.returnValue(false);
        spyOn(window, 'checkIsGameStatusDraw').and.returnValue(false);
        var box = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(box);
        document.turn = PLAYER_X;
        //when
        switchMoveOrEndGame(box);
        //then
        expect(document.turn).toBe(PLAYER_O);
        expect(isGameEnded()).toBeFalsy();
        expect(window.setColor).toHaveBeenCalled();
    });

    it('switch player from O to X', function () {
        //given 
        spyOn(window, 'checkIfPlayerIsWinner').and.returnValue(false);
        spyOn(window, 'checkIsGameStatusDraw').and.returnValue(false);
        var box = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(box);
        document.turn = PLAYER_O;
        //when
        switchMoveOrEndGame(box);
        //then
        expect(document.turn).toBe(PLAYER_X);
        expect(isGameEnded()).toBeFalsy();
        expect(window.setColor).toHaveBeenCalled();
    });
});

describe("Should", function () {

    beforeEach(function () {
        document.winner = undefined;
        result = false;
        wonO = 0;
        wonX = 0;
        draw = 0;
    });

    it('reset statistics', function () {
        //given 
        spyOn(window, 'resetViewOfStatistics');
        document.winner = PLAYER_X;
        wonO = 1;
        wonX = 2;
        draw = 9;
        result = true;
        //when
        resetStatistics();
        //then
        expect(wonX).toEqual(0);
        expect(wonO).toEqual(0);
        expect(draw).toEqual(0);
        expect(document.winner).toBe(undefined);
        expect(result).toEqual(false);
    });

    it('reset board', function () {
        //given 
        spyOn(window, 'resetViewOfBoard');
        board[0] = 'X';
        board[1] = 'X';
        board[2] = 'O';
        //when
        resetBoard();
        //then
        expect(board[0]).toBe(undefined);
        expect(board[1]).toBe(undefined);
        expect(board[2]).toBe(undefined);
    });
});

describe("Should", function () {

    beforeEach(function () {
        board = [];
        tabOfMoveHistory = [];
        boxInserted = 0;
    });

    it('update move history', function () {
        //given 
        var id = 2;
        //when
        updateMoveHistory(id);
        //then
        expect(boxInserted).toEqual(1);
        expect(tabOfMoveHistory[0]).toEqual(id);
    });

    it('clear move history', function () {
        //given 
        var id = 2;
        updateMoveHistory(id);
        //when
        clearMoveHistory();
        //then
        expect(boxInserted).toEqual(0);
        expect(tabOfMoveHistory[0]).toEqual(undefined);
    });

    
    it('move back', function () {
        //given 
        spyOn(window, 'moveBackView');
        var idFirst = 2;
        var idSecond = 5;
        updateMoveHistory(idFirst);
        updateMoveHistory(idSecond);
        //when
        moveBack();
        //then
        expect(boxInserted).toEqual(1);
        expect(tabOfMoveHistory[1]).toEqual(undefined);
        expect(tabOfMoveHistory[0]).toEqual(idFirst);
    });
});