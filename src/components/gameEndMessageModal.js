import { createElement } from "../utilities";
import BaseComponent from "./baseComponent";

class GameEndMessageModal extends BaseComponent {
    constructor(props) {
        super(props);
    }

    handleConfirmClick(e) {
        this.props.handleConfirmClick(e);
    }

    render() {
        const { isPlayerWinner } = this.props.isPlayerWinner;

        this.initializeRender();

        // Container ID
        this.element.id = 'game-end-message-modal-container';

        // Create modal content element to add message and button
        const modalContent = createElement('div', {id: 'game-end-message-content'});

        // Add game end message
        modalContent.appendChild(
            createElement('p', {}, isPlayerWinner ? 'Congratulations. You Won!' : 'Sorry. You Lost.')
        );

        // Add confirm button
        const confirmBtn = modalContent.appendChild(
            createElement('button', {}, 
                createElement('span', {}, 'Create New Game')
            )
        );

        // Add click event listener to modal confirm button
        confirmBtn.addEventListener('click', this.handleConfirmClick.bind(this));

        // Append modal-container -> modal -> modal-content
        this.element.appendChild(
            createElement('div', {id: 'game-end-message-modal'}, modalContent)
        );

        return this.element;
    }
}

GameEndMessageModal.defaultProps = {
    isPlayerWinner: true,
    handleConfirmClick: (e) => {
        e.preventDefault();
        console.log(`Game Over!`);
    },
};

export default GameEndMessageModal;
