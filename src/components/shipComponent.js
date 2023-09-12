import { createElement } from "../utilities";
import BaseComponent from "./baseComponent";
import BattleshipImg from "../images/Battleships.jpg";

const BattleshipSpriteXCoords = {
    carrier: 0,
    battleship: 0,
    destroyer: 0,
    submarine: 0,
    'patrol boat': 0,
};

class ShipComponent extends BaseComponent {
    render() {
        const { name, length, boardSize } = this.props;

        this.initializeRender();

        this.element.classList.add('ship');

        this.element.style.width = `${(length / (boardSize + 1)) * 100}%`;
        this.element.style.height = `${100 / (boardSize + 1)}%`;


        const imgElement = this.element.appendChild(createElement('img', {
            src: BattleshipImg,
            alt: name,
        }));

        imgElement.style.width = '100%';
        imgElement.style.height = '100%';

        return this.element;
    }
}

export default ShipComponent;
