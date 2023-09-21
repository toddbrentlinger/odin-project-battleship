import Gameboard from "./gameboard";

export class GameState {
    static Preparation = new GameState('preparation');
    static Playing = new GameState('playing');
    static Finished = new GameState('finished');

    constructor(state) {
        this.state = state;
    }
}

const Game = (() => {
    let state = GameState.Preparation;
    let isPlayersTurn = true;

    const boardSize = 10;
    const gameboards = {
        'player': Gameboard(boardSize),
        'computer': Gameboard(boardSize),
    };

    const init = () => {
        state = GameState.Preparation;

        isPlayersTurn = true;

        // Initialize gameboards
        gameboards.player.init();
        gameboards.computer.init();
    };

    const createNew = () => {
        init();
    };

    const play = () => {
        state = GameState.Playing;
    };

    const end = () => {
        state = GameState.Finished;

        // Display winner and end message
    };

    /**
     * 
     * @param {*} x Horizontal coordinate (zero-based)
     * @param {*} y Vertical coordinate (zero-based)
     * @returns {Ship|null} Ship reference if hit or null if miss
     */
    const enterPlayerAttack = (x, y) => {
        // Return if NOT Playing state OR NOT player's turn
        if (state !== GameState.Playing || !isPlayersTurn) { return; }

        console.log('Player attacks!');

        // Send attack coordinates to computer's board, throwing error if NOT valid
        const target = gameboards.computer.recieveAttack(x,y);

        // Check if computer has lost
        if (gameboards.computer.areAllShipsSunk()) {
            end();
        }

        // Set isPlayersTurn flag to false to prevent another player attack before computer can make an attack
        isPlayersTurn = false;

        return target;
    };

    /**
     * 
     * @returns {Ship|null}
     */
    const makeComputerAttack = () => {
        // Return if NOT Playing state OR NOT computer's turn
        if (state !== GameState.Playing || isPlayersTurn) { return; }

        console.log('Computer attacks!');

        // Make computer attack
        let validAttack = false;
        let target, x, y;
        while (!validAttack) {
            x = Math.floor(Math.random() * boardSize);
            y = Math.floor(Math.random() * boardSize);

            try {
                target = gameboards.player.recieveAttack(x,y);
                
                validAttack = true;
            } catch(e) {

            }
        }

        // Check if player has lost
        if (gameboards.player.areAllShipsSunk()) {
            end();
        }

        // Set isPlayersTurn flag so Player can make next attack
        isPlayersTurn = true;

        return {
            target,
            x,
            y,
        };
    };

    return {
        createNew,
        play,
        get playerBoard() { return gameboards.player; },
        get computerBoard() { return gameboards.computer; },
        get isPlayersTurn() { return isPlayersTurn; },
        get size() { return boardSize; },
        get state() { return state; },
        enterPlayerAttack,
        makeComputerAttack,
    };
})();

export default Game;
