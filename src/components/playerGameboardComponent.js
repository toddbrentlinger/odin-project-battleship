import GameboardComponent, { GameboardNodeComponent } from "./gameboardComponent";
import { createElement } from "../utilities";
// GIFs
import ExplosionGIF from "../gifs/explosion.gif";
import SplashGIF from "../gifs/water-splash.gif";
// Audio
import ExplosionMP3 from "../audio/explosion.mp3";
import SplashMP3 from "../audio/water-splosh.mp3";

class PlayerGameboardComponent extends GameboardComponent {
    addBoardLostEffect() {
        const boardEffectComponent = this.gameboardElement.appendChild(
            document.createElement('div')
        );

        boardEffectComponent.classList.add('board-end-game-effect', 'board-end-game-effect-lost');
    }

    addBoardWonEffect() {
        const boardEffectComponent = this.gameboardElement.appendChild(
            document.createElement('div')
        );

        boardEffectComponent.classList.add('board-end-game-effect', 'board-end-game-effect-won');
    }

    createSingleBoardNode(x, y, handleClick) {
        return new PlayerGameboardNodeComponent({
            children: [createElement('span', {}, '\u00A0'),],
            x: x,
            y: y,
            handleClick: handleClick,
        });
    }
}

class PlayerGameboardNodeComponent extends GameboardNodeComponent {
    static SplashAudio = new Audio(SplashMP3);
    static ExplosionAudio = new Audio(ExplosionMP3);

    constructor(props) {
        super(props);
        this.state = {
            hasAttacked: false,
        };
    }

    handleClick() {
        const output = this.props.handleClick(this.props.x, this.props.y);
        if (output === undefined) { return; }
        this.attack(...output);
    }

    /**
     * 
     * @param {Ship|null|undefined} ship 
     * @param {Function|undefined} callback 
     * @returns 
     */
    attack(ship, callback) {
        if (this.state.hasAttacked) { return; }

        // If ship reference returned, ship was hit
        if (ship) {
            this.setAttack();
        }
        // Else ship is null, ships were missed 
        else if (ship === null) {
            this.setMiss();
        }
        // Else ship is undefined, return without any effect 
        else {
            return;
        }

        this.state.hasAttacked = true;

        if (callback) {
            callback();
        }
    }

    render() {
        super.render();

        this.element.addEventListener('click', this.handleClick.bind(this));

        return this.element;
    }

    setAttack() {
        this.element.style.backgroundImage = `url(${ExplosionGIF})`;

        PlayerGameboardNodeComponent.ExplosionAudio.currentTime = 0;
        PlayerGameboardNodeComponent.ExplosionAudio.volume = 0.3;
        PlayerGameboardNodeComponent.ExplosionAudio.play();

        setTimeout(() => {
            this.element.style.backgroundImage = null;
            this.element.classList.add('hit');
        }, 1700);
    }

    setMiss() {
        this.element.style.backgroundImage = `url(${SplashGIF})`;

        PlayerGameboardNodeComponent.SplashAudio.currentTime = 0;
        PlayerGameboardNodeComponent.SplashAudio.play();

        setTimeout(() => {
            this.element.style.backgroundImage = null;
            this.element.classList.add('miss');
        }, 1500);
    }
}

export default PlayerGameboardComponent;
