import PlayerGameboardComponent from "./playerGameboardComponent";
import Game from "../game/game";

class UserGameboardComponent extends PlayerGameboardComponent {
    constructor(props) {
        super({
            ...props,
            board: Game.playerBoard,
            name: 'Player',
            handleClick: () => [],
        });
    }

    attack(callback) {
        const {target, x, y} = Game.makeComputerAttack();

        this.boardNodes[y][x].attack(target, callback);
    }
}

export default UserGameboardComponent;
