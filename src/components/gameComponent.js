import BaseComponent from "./baseComponent";
import Game, { GameState } from "../game/game";
import PlayerGameboardComponent from "./playerGameboardComponent";
import ComputerGameboardComponent from "./computerGameboardComponent";
import { createElement } from "../utilities";
import GameCreateStartButton from "./gameCreateStartButton";
import GameEndMessageModal from "./gameEndMessageModal";

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

        this.gameEndMessageModal = null;
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
        if (Game.state !== GameState.Playing) { return; }

        const output = Game.enterPlayerAttack(x,y);
        console.log(output);

        return [output, this.handlePlayerPostAttack.bind(this)];
    }

    handlePlayerPostAttack() {
        // Check if Player has won
        if (Game.state === GameState.Finished) {
            // Display win message
            this.gameEndMessageModal = new GameEndMessageModal({isPlayerWinner: true});
            this.element.prepend(this.gameEndMessageModal.render());
            
            return;
        }
        
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
