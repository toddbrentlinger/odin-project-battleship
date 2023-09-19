import GameboardComponent from "./gameboardComponent";
import Game from "../game/game";

class ComputerGameboardComponent extends GameboardComponent {
    constructor(props) {
        super({
            ...props,
            board: Game.computerBoard,
            name: 'Enemy',
        });

        this.props.handleClick = this.handleClick.bind(this);
    }

    handleClick(x,y) {
        // Return if NOT player's turn
        if (!Game.isPlayersTurn) { return; }
        
        const output = Game.enterPlayerAttack(x,y);
        console.log(output);

        return output;
    }
}

export default ComputerGameboardComponent;
