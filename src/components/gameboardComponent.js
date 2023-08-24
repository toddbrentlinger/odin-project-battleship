import { createElement } from "../utilities";
import BaseComponent from "./baseComponent";

class GameboardComponent extends BaseComponent {
    render() {
        this.initializeRender();

        this.element.classList.add('gameboard-container');

        const tableElement = this.element.appendChild(
            createElement('table', {'class': 'gameboard'})
        );

        let content;
        let dataElement;
        for (let i = 0; i < 11; i++) {
            let rowElement = tableElement.appendChild(createElement('tr', {}));

            for (let j = 0; j < 11; j++) {
                // First row
                if (i === 0) {
                    // If first column
                    if (j === 0) {
                        content = '\u00A0';
                    }
                    // Else NOT first column 
                    else {
                        content = String.fromCharCode('A'.charCodeAt(0) + j - 1);
                    }

                    rowElement.appendChild(createElement('th', {}, 
                        createElement('span', {}, content)
                    ));
                }
                // Else NOT first row
                else {
                    // If first column
                    if (j === 0) {
                        rowElement.appendChild(createElement('th', {}, 
                            createElement('span', {}, i - 1)
                        ));
                    }
                    // Else NOT first column 
                    else {
                        dataElement = rowElement.appendChild(createElement('td', {}, 
                            createElement('span', {}, '\u00A0')
                        ));

                        dataElement.dataset.x = i - 1;
                        dataElement.dataset.y = j - 1;
                    }
                }
            }
        }

        return this.element;
    }
}

export default GameboardComponent;
