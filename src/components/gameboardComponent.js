import { createElement } from "../utilities";
import BaseComponent from "./baseComponent";
import ExplosionGIF from "../gifs/explosion.gif";
import SplashGIF from "../gifs/water-splash.gif";
import ShipComponent from "./shipComponent";

class GameboardComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.boardTableElement = null;
        this.shipsTableElement = null;
    }

    isShipOrientationHorizontal(ship, nRow, nCol) {
        const { board } = this.props;

        // If ship NOT in nRow and nCol, throw error
        if (board.board[nRow][nCol].ship !== ship) {
            throw new Error('Ship NOT at gameboard node');
        }
        //debugger;
        // If same ship to left of node
        if (nCol > 0 && board.board[nRow][nCol - 1].ship === ship) {
            return true;
        }
        // If same ship to right of node
        if (nCol < board.size - 1 && board.board[nRow][nCol + 1].ship === ship) {
            return true;
        }
        // If same ship to top of node
        if (nRow > 0 && board.board[nRow - 1][nCol].ship === ship) {
            return false;
        }
        // If same ship to bottom of node
        if (nRow < board.size - 1 && board.board[nRow + 1][nCol].ship === ship) {
            return false;
        }
        // If reach here, throw error
        throw new Error('Ship is NOT in any adjacent nodes');
    }

    getShipBoardData() {
        const { board } = this.props;
        const data = {};
        let x, y, isHorizontal;

        board.board.forEach((row, nRow) => {
            row.forEach((node, nCol) => {
                // If GameboardNode has ship AND ship data not already found
                if (node.ship && !data[node.ship.name]) {
                    // Find orientation
                    isHorizontal = this.isShipOrientationHorizontal(node.ship, nRow, nCol);

                    // Find origin
                    [x,y] = this.getShipOrigin(node.ship, nRow, nCol, isHorizontal);

                    data[node.ship.name] = {
                        x, y, isHorizontal,
                    };
                }
            });
        });

        return data;
    }

    getShipOrigin(ship, nRow, nCol, isHorizontal) {
        const { board } = this.props;

        // If ship NOT in nRow and nCol, throw error
        if (board.board[nRow][nCol].ship !== ship) {
            throw new Error('Ship NOT at gameboard node');
        }

        if (isHorizontal) {
            // Keep moving left until reach board edge OR node with different ship value
            while (nCol > 0 && board.board[nRow][nCol - 1].ship === ship) {
                nCol--;
            }
        } else {
            // Keep moving down until reach board edge OR node with different ship value
            while (nRow > 0 && board.board[nRow - 1][nCol].ship === ship) {
                nRow--;
            }
        }

        return [nCol, nRow];
    }

    render() {
        const { board } = this.props;

        this.initializeRender();

        this.element.classList.add('gameboard-container');

        this.element.appendChild(this.renderTable());

        this.element.append(...this.renderShips());

        return this.element;
    }

    renderShips() {
        const { board } = this.props;
        const shipData = this.getShipBoardData();
        console.log(shipData);

        return board.ships.map((ship, index) => {
            return new ShipComponent({
                name: ship.name,
                length: ship.length,
                boardSize: board.size,
                x: shipData[ship.name].x,
                y: shipData[ship.name].y,
                isHorizontal: shipData[ship.name].isHorizontal,
            }).render()
        });
    }

    renderShipsOld() {
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
