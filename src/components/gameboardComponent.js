import { createElement } from "../utilities";
import BaseComponent from "./baseComponent";
import ExplosionGIF from "../gifs/explosion.gif";
import SplashGIF from "../gifs/water-splash.gif";

class GameboardComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.boardTableElement = null;
        this.shipsTableElement = null;
    }

    render() {
        const { board } = this.props;

        this.initializeRender();

        this.element.classList.add('gameboard-container');

        this.element.appendChild(this.renderTable());

        //this.element.appendChild(this.renderShips());

        return this.element;
    }

    renderShips() {
        const { board } = this.props;
        let shipElement;

        this.shipsTableElement = createElement('table', {'class': 'ships-table'});
        this.shipsTableElement.style = `grid-template-rows: repeat(${board.size + 1}, 1fr);`

        board.ships.forEach((ship) => {
            shipElement = this.shipsTableElement.appendChild(
                createElement('tr', {'class': 'ship'})
            );
            shipElement.style = `grid-template-columns: repeat(${board.size + 1}, 1fr);`;

            for (let i = 0; i < ship.length; i++) {
                shipElement.appendChild(
                    createElement('td', {}, ship.name[0])
                );
            }
        });

        return this.shipsTableElement;
    }

    renderTable() {
        const { board } = this.props;

        this.boardTableElement = createElement('table', {'class': 'gameboard'});

        let content;
        let dataElement;
        for (let i = 0; i < this.props.board.size + 1; i++) {
            let rowElement = this.boardTableElement.appendChild(createElement('tr', {}));

            for (let j = 0; j < this.props.board.size + 1; j++) {
                // First row
                if (i === 0) {
                    // If first column
                    if (j === 0) {
                        content = '\u00A0';
                    }
                    // Else NOT first column 
                    else {
                        content = j;
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
                            createElement('span', {}, String.fromCharCode('A'.charCodeAt(0) + i - 1))
                        ));
                    }
                    // Else NOT first column 
                    else {
                        rowElement.appendChild(
                            new GameboardNodeComponent({
                                children: [createElement('span', {}, '\u00A0'),],
                                x: i - 1,
                                y: j - 1,
                            }).render()
                        );
                    }
                }
            }
        }

        return this.boardTableElement;
    }
}

class GameboardNodeComponent extends BaseComponent {
    handleClick() {
        const { x, y } = this.props;

        console.log(`Clicked x: ${x} - y: ${y}`);
        
        Math.floor(Math.random() * 2) ? this.setMiss() : this.setAttack();
    }

    render() {
        const { children, x, y } = this.props;

        this.initializeRender('td');

        this.element.classList.add('gameboard-node');

        this.element.append(...children);

        this.element.dataset.x = x;
        this.element.dataset.y = y;

        this.element.addEventListener('click', this.handleClick.bind(this));

        return this.element;
    }

    setAttack() {
        this.element.style.backgroundImage = `url(${ExplosionGIF})`;
        this.element.style.backgroundColor = 'inherit';
        setTimeout(() => {
            this.element.style.backgroundImage = null;
            this.element.style.backgroundColor = 'red';
        }, 1700);
    }

    setMiss() {
        this.element.style.backgroundImage = `url(${SplashGIF})`;
        this.element.style.backgroundColor = 'inherit';
        setTimeout(() => {
            this.element.style.backgroundImage = null;
            this.element.style.backgroundColor = 'blue';
        }, 1500);
    }
}

export default GameboardComponent;
