import GameboardComponent from "./gameboardComponent";
import Game from "../game/game";

class ComputerGameboardComponent extends GameboardComponent {
    constructor(props) {
        super({
            ...props,
            board: Game.computerBoard,
            name: 'Enemy',
        });
    }
}

export default ComputerGameboardComponent;
