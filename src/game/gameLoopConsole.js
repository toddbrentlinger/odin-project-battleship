import Game, { GameState } from "./game";

const GameLoopConsole = (() => {
    const displayComputerBoard = () => {

    };

    const displayPlayerBoard = () => {

    };

    const play = () => {
        let isValidCoords;
        Game.createNew();
        Game.play();

        while (Game.state === GameState.Playing) {
            isValidCoords = false;

            while (!isValidCoords) {
                // Get player input coordinates
                const playerInput = prompt(`Enter attack coordinates (ex. 5,3 or 5 3 or 5-3):`);

                // Check if input is valid format
                const match = playerInput.match(/(?<x>\d+)[, -](?<y>\d+)/);
                if (match === null) {
                    console.log('Coordinates need to be in a valid format!');
                    continue;
                }

                try {
                    const playerAttackData = Game.enterPlayerAttack(Number(match.groups.x), Number(match.groups.y));
                } catch (e) {
                    console.log(e.message);
                    continue;
                }

                // If reach here, attack is valid
                isValidCoords = true;
            }
            
            Game.makeComputerAttack();
        }
    };

    return {
        play,
    };
})();

export default GameLoopConsole;
