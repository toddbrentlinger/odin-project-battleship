import PlayerGameboardComponent from "./playerGameboardComponent";
import Game from "../game/game";

class ComputerGameboardComponent extends PlayerGameboardComponent {
    constructor(props) {
        super({
            ...props,
            board: Game.computerBoard,
            name: 'Enemy',
        });
    }
}

export default ComputerGameboardComponent;
