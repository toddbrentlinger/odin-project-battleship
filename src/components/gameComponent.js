import BaseComponent from "./baseComponent";
import Game from "../game/game";
import PlayerGameboardComponent from "./playerGameboardComponent";
import ComputerGameboardComponent from "./computerGameboardComponent";
import { createElement } from "../utilities";
import GameCreateStartButton from "./gameCreateStartButton";

class GameComponent extends BaseComponent {
    constructor(props) {
        super(props);
        Game.createNew();

        this.handleCreateGameClick = this.handleCreateGameClick.bind(this);
        this.handleStartGameClick = this.handleStartGameClick.bind(this);
        this.handlePlayerAttack = this.handlePlayerAttack.bind(this);

        this.playerGameboardComponent = new PlayerGameboardComponent();
        this.computerGameboardComponent = new ComputerGameboardComponent({
            handleClick: this.handlePlayerAttack,
        });
    }

    handleCreateGameClick() {
        console.log('Create new game!');

        Game.createNew();

        // Update game boards
        this.playerGameboardComponent.render();
        this.computerGameboardComponent.render();
    }

    handleStartGameClick() {
        console.log('Start game!');

        Game.play();
    }

    handleComputerAttack() {
        this.playerGameboardComponent.attack();
    }

    handlePlayerAttack(x,y) {
        const output = Game.enterPlayerAttack(x,y);
        console.log(output);

        return [output, this.handlePlayerPostAttack.bind(this)];
    }

    handlePlayerPostAttack() {
        // Check if Player has won
        // TODO
        
        setTimeout(this.handleComputerAttack.bind(this), 2000);
    }

    render() {
        this.initializeRender('main');

        this.element.append(
            createElement('article', {id: 'gameboards-all'}, 
                this.playerGameboardComponent.render(),
                this.computerGameboardComponent.render(),
            ),
            (new GameCreateStartButton({
                handleCreateClick: this.handleCreateGameClick,
                handleStartClick: this.handleStartGameClick,
            })).render(),
        );

        return this.element;
    }
}

export default GameComponent;
