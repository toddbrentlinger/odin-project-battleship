import { createElement } from "../utilities";
import BaseComponent from "./baseComponent";

class GameCreateStartButton extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
        };

        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
    }

    handleCreateClick(e) {
        e.preventDefault();

        this.props.handleCreateClick();

        this.setState({
            ...this.state,
            isPlaying: false,
        });
    }

    handleStartClick(e) {
        e.preventDefault();

        this.props.handleStartClick();

        this.setState({
            ...this.state,
            isPlaying: true,
        });
    }

    render() {
        this.initializeRender();

        this.element.classList.add('game-create-start-btn-container');

        const btn = createElement('button');

        if (this.state.isPlaying) {
            btn.innerHTML = 'Create New Game';
            btn.addEventListener('click', this.handleCreateClick);
        } else {
            btn.innerHTML = 'Start Game';
            btn.addEventListener('click', this.handleStartClick);
        }

        this.element.appendChild(btn);

        return this.element;
    }
}

export default GameCreateStartButton;
