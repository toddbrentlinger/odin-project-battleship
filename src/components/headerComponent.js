import BaseComponent from "./baseComponent";
import { createElement } from "../utilities";

class HeaderComponent extends BaseComponent {
    render() {
        this.initializeRender('header');

        this.element.appendChild(
            createElement('h1', {}, this.props.title)
        );

        return this.element;
    }
}

export default HeaderComponent;
