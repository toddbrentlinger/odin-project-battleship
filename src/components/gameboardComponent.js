import { createElement } from "../utilities";
import BaseComponent from "./baseComponent";
import ShipComponent from "./shipComponent";

class GameboardComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.boardNodes = [];
        this.gameboardElement = null;
    }

    /** Fill 2D array with GameboardNodeComponents. */
    createBoardNodes() {
        const { board, handleClick } = this.props;

        this.boardNodes = [];
        let size = board.size;
        for (let row = 0; row < size; row++) {
            this.boardNodes[row] = Array(size);

            for (let col = 0; col < size; col++) {
                this.boardNodes[row][col] = this.createSingleBoardNode(
                    col,
                    row,
                    handleClick
                );
            }
        }
    }

    /**
     * Creates a single GameboardNodeComponent with position and click handler.
     * @param {Number} x 
     * @param {Number} y 
     * @param {Function} handleClick 
     * @returns {GameboardNodeComponent}
     */
    createSingleBoardNode(x, y, handleClick) {
        return new GameboardNodeComponent({
            children: [createElement('span', {}, '\u00A0'),],
            x: x,
            y: y,
            handleClick: handleClick,
        });
    }

    /**
     * Returns boolean if ship at node is horizontal or throws error if ship 
     * NOT at node or not in any adjacent nodes.
     * @param {Ship} ship 
     * @param {Number} nRow 
     * @param {Number} nCol 
     * @returns {Boolean|Error}
     */
    isShipOrientationHorizontal(ship, nRow, nCol) {
        const { board } = this.props;

        // If ship NOT in nRow and nCol, throw error
        if (board.board[nRow][nCol].ship !== ship) {
            throw new Error('Ship NOT at gameboard node');
        }
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

    /**
     * Returns of ship names with it's gameboard node position and orientation.
     * @returns {Object} obj Object with keys as ship names and value as object of ship data
     * @returns {Object} obj.shipName
     * @returns {Number} obj.shipName.x
     * @returns {Number} obj.shipName.y
     * @returns {Boolean} obj.shipName.isHorizontal
     */
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

    /**
     * Returns ship origin position on gameboard.
     * @param {Ship} ship 
     * @param {Number} nRow 
     * @param {Number} nCol 
     * @param {Boolean} isHorizontal 
     * @returns {Array} Array with x and y position of ship origin on gameboard
     */
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

    /**
     * Creates and returns rendered element of this GameboardComponent with table and ships.
     * @returns {HTMLElement}
     */
    render() {
        const { board, name } = this.props;

        this.initializeRender('section');

        this.gameboardElement = createElement('div', {'class': 'gameboard-container'},
            this.renderTable(),
            ...this.renderShips()
        );

        this.element.append(
            createElement('h2', {}, name),
            this.gameboardElement,
        );

        return this.element;
    }

    /**
     * Creates array of ship elements to be added on top of gameboard table element.
     * @returns {HTMLElement[]}
     */
    renderShips() {
        const { board } = this.props;
        const shipData = this.getShipBoardData();
        console.log(shipData);

        return board.ships.map((ship) => {
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

    /**
     * Creates and returns empty gameboard as a table element filled with GameboardNodeComponents.
     * @returns {HTMLElement}
     */
    renderTable() {
        const { board } = this.props;

        const boardTableElement = createElement('table', {'class': 'gameboard'});

        this.createBoardNodes();

        let content;
        for (let i = 0; i < board.size + 1; i++) {
            let rowElement = boardTableElement.appendChild(createElement('tr', {}));

            for (let j = 0; j < board.size + 1; j++) {
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
                            this.boardNodes[i - 1][j - 1].render()
                        );
                    }
                }
            }
        }

        return boardTableElement;
    }
}

GameboardComponent.defaultProps = {
    handleClick: (x,y) => {
        console.log(`x: ${x}, y: ${y}`);
        return [null, null];
    },
};

class GameboardNodeComponent extends BaseComponent {
    render() {
        const { children, x, y } = this.props;

        this.initializeRender('td');

        this.element.classList.add('gameboard-node');

        this.element.append(...children);

        this.element.dataset.x = x;
        this.element.dataset.y = y;

        return this.element;
    }
}

export default GameboardComponent;
export { GameboardNodeComponent };
