import BaseComponent from "./baseComponent";
import Game from "../game/game";
import GameboardComponent from "./gameboardComponent";

class GameComponent extends BaseComponent {
    constructor(props) {
        super(props);
        Game.createNew();
    }

    render() {
        this.initializeRender('main');

        this.element.append(
            (new GameboardComponent({board: Game.playerBoard})).render(),
            (new GameboardComponent({board: Game.computerBoard})).render()
        );

        return this.element;
    }
}

export default GameComponent;
