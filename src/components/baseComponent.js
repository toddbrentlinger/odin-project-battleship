import { createElement } from '../utilities.js';

export default class BaseComponent {
    constructor(props) {
        this._element = null;
        this._props = props;
    }

    // Getters/Setters

    get element() {
        return this._element;
    }

    get props() {
        return this._props;
    }

    set props(newProps) {
        this._props = newProps;
        this.render();
    }

    // Methods

    emptyElement() {
        if (!this._element) return;

        while (this._element.firstChild) {
            this._element.removeChild(this._element.firstChild);
        }
    }

    initializeRender(elementType = 'div') {
        if (!this._element) {
            this._element = document.createElement(elementType);
        } else {
            this.emptyElement();
        }
    }

    render() {
        this.initializeRender();

        this._element.appendChild(
            createElement('h1', {}, 'Base Component!')
        );

        return this._element;
    }
}
