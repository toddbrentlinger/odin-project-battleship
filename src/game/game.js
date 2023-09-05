import Gameboard from "./gameboard";

class GameState {
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

    const enterPlayerAttack = (x, y) => {
        // Return if NOT Playing state OR NOT player's turn
        if (state !== GameState.Playing || !isPlayersTurn) { return; }

        console.log('Player attacks!');

        // Send attack coordinates to computer's board, throwing error if NOT valid
        gameboards.computer.recieveAttack(x,y);

        // Check if computer has lost
        if (gameboards.computer.areAllShipsSunk()) {
            end();
        }

        // Set isPlayersTurn flag to false to prevent another player attack before computer can make an attack
        isPlayersTurn = false;
    };

    const makeComputerAttack = () => {
        // Return if NOT Playing state OR NOT computer's turn
        if (state !== GameState.Playing || isPlayersTurn) { return; }

        console.log('Computer attacks!');

        // Make computer attack
        let validAttack = false;
        while (!validAttack) {
            try {
                gameboards.player.recieveAttack(
                    Math.floor(Math.random() * boardSize),
                    Math.floor(Math.random() * boardSize)
                );
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
    };

    return {
        createNew,
        play,
        get playerBoard() { return gameboards.player; },
        get computerBoard() { return gameboards.computer; },
        get isPlayersTurn() { return isPlayersTurn; },
        enterPlayerAttack,
        makeComputerAttack,
    };
})();

export default Game;
