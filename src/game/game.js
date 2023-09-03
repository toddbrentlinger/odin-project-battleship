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
    const gameboards = {
        'player': Gameboard(),
        'computer': Gameboard(),
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

    return {
        createNew,
        play,
        get playerBoard() { return gameboards.player; },
        get computerBoard() { return gameboards.computer; },
    };
})();

export default Game;
