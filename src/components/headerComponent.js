import BaseComponent from "./baseComponent";
import { createElement } from "../utilities";
import BattleshipLogoSVG from "../images/battleship-drawing.svg";

class HeaderComponent extends BaseComponent {
    render() {
        this.initializeRender('header');

        this.element.append(
            createElement('img', {'class': 'logo', src: BattleshipLogoSVG, alt: 'Battleship logo'}),
            createElement('h1', {}, this.props.title)
        );

        return this.element;
    }
}

export default HeaderComponent;
