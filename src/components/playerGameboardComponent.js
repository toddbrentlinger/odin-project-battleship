import GameboardComponent from "./gameboardComponent";
import Game from "../game/game";

class PlayerGameboardComponent extends GameboardComponent {
    constructor(props) {
        super({
            ...props,
            board: Game.playerBoard,
            name: 'Player',
        });
    }
}

export default PlayerGameboardComponent;
