import { createElement } from "../utilities";
import BaseComponent from "./baseComponent";
import BattleshipImg from "../images/Battleship.jpg";
import CarrierImg from "../images/Carrier.jpg";
import DestoryerImg from "../images/Destroyer.jpg";
import PatrolBoatImg from "../images/Patrol_Boat.jpg";
import SubmarineImg from "../images/Submarine.jpg";

class ShipComponent extends BaseComponent {
    getShipImg(name) {
        name = name.toLowerCase();

        switch(name) {
            case 'carrier':
                return CarrierImg;
            case 'destroyer':
                return DestoryerImg;
            case 'submarine':
                return SubmarineImg;
            case 'patrol boat':
                return PatrolBoatImg;
            default:
                return BattleshipImg;
        }
    }

    render() {
        const { name, length, boardSize, x, y, isHorizontal } = this.props;

        this.initializeRender();

        this.element.classList.add('ship');

        this.element.style.width = `${(length / (boardSize + 1)) * 100}%`;
        this.element.style.height = `${100 / (boardSize + 1)}%`;
        this.element.style.top = `${((y + (isHorizontal ? 1 : 0)) / (boardSize + 1)) * 100}%`;
        this.element.style.left = `${((x + 1) / (boardSize + 1)) * 100}%`;
        if (!isHorizontal) {
            this.element.style.transform = 'rotate(90deg)';
        }


        const imgElement = this.element.appendChild(createElement('img', {
            src: this.getShipImg(name),
            alt: name,
        }));

        imgElement.style.width = '100%';
        imgElement.style.height = '100%';

        return this.element;
    }
}

export default ShipComponent;
