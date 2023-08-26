import Gameboard from './gameboard';

const gameboard = Gameboard();

// checkPieceIsWithinBoard horizontal piece

test('checkPieceIsWithinBoard horizontal ship longer than one within board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, 0, 0, true))
        .toEqual({isValid: true, x: 0, y: 0});
});

test('checkPieceIsWithinBoard horizontal ship longer than one half off left of board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, -2, 0, true))
        .toEqual({isValid: false, x: 0, y: 0});
});

test('checkPieceIsWithinBoard horizontal ship longer than one completely off left of board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, -3, 0, true))
        .toEqual({isValid: false, x: 0, y: 0});
});

test('checkPieceIsWithinBoard horizontal ship longer than one half off right of board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, 9, 0, true))
        .toEqual({isValid: false, x: 7, y: 0});
});

test('checkPieceIsWithinBoard horizontal ship longer than one completely off right of board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, 10, 0, true))
        .toEqual({isValid: false, x: 7, y: 0});
});

test('checkPieceIsWithinBoard horizontal ship longer than one off top of board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, 0, -1, true))
        .toEqual({isValid: false, x: 0, y: 0});
});

test('checkPieceIsWithinBoard horizontal ship longer than one off bottom of board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, 0, 10, true))
        .toEqual({isValid: false, x: 0, y: 9});
});

// checkPieceIsWithinBoard vertical piece


test('checkPieceIsWithinBoard vertical ship longer than one within board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, 0, 0, false))
        .toEqual({isValid: true, x: 0, y: 0});
});

test('checkPieceIsWithinBoard vertical ship longer than one half off top of board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, 0, -1, false))
        .toEqual({isValid: false, x: 0, y: 0});
});

test('checkPieceIsWithinBoard vertical ship longer than one completely off top of board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, 0, -3, false))
        .toEqual({isValid: false, x: 0, y: 0});
});

test('checkPieceIsWithinBoard vertical ship longer than one half off bottom of board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, 0, 9, false))
        .toEqual({isValid: false, x: 0, y: 7});
});

test('checkPieceIsWithinBoard vertical ship longer than one completely off bottom of board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, 0, 10, false))
        .toEqual({isValid: false, x: 0, y: 7});
});

test('checkPieceIsWithinBoard vertical ship longer than one off left of board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, 0, -1, false))
        .toEqual({isValid: false, x: 0, y: 0});
});

test('checkPieceIsWithinBoard vertical ship longer than one off right of board', () => {
    expect(gameboard.checkPieceIsWithinBoard(3, 0, 10, false))
        .toEqual({isValid: false, x: 0, y: 7});
});
