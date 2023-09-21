import GameboardComponent from "./gameboardComponent";
import Game from "../game/game";

class PlayerGameboardComponent extends GameboardComponent {
    constructor(props) {
        super({
            ...props,
            board: Game.playerBoard,
            name: 'Player',
            handleClick: () => [],
        });
    }

    attack() {
        const {target, x, y} = Game.makeComputerAttack();

        this.boardNodes[y][x].attack(target);
    }
}

export default PlayerGameboardComponent;
