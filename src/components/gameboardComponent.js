import { createElement } from "../utilities";
import BaseComponent from "./baseComponent";
import ExplosionGIF from "../gifs/explosion.gif";
import SplashGIF from "../gifs/water-splash.gif";
import ShipComponent from "./shipComponent";
import ExplosionMP3 from "../audio/explosion.mp3";
import SplashMP3 from "../audio/water-splosh.mp3";

class GameboardComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.boardNodes = [];
    }

    createBoardNodes() {
        const { board, handleClick } = this.props;

        this.boardNodes = [];
        let size = board.size;
        for (let row = 0; row < size; row++) {
            this.boardNodes[row] = Array(size);

            for (let col = 0; col < size; col++) {
                this.boardNodes[row][col] = new GameboardNodeComponent({
                    children: [createElement('span', {}, '\u00A0'),],
                    x: col,
                    y: row,
                    handleClick: handleClick,
                })
            }
        }
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
        const { board, name } = this.props;

        this.initializeRender('section');

        this.element.append(
            createElement('h2', {}, name),
            createElement('div', {'class': 'gameboard-container'},
                this.renderTable(),
                ...this.renderShips()
            ),
        );

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

    renderTable() {
        const { board, handleClick } = this.props;

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
    static SplashAudio = new Audio(SplashMP3);
    static ExplosionAudio = new Audio(ExplosionMP3);

    constructor(props) {
        super(props);
        this.state = {
            hasAttacked: false,
        };
    }

    /**
     * 
     * @param {Ship|null|undefined} ship 
     * @param {Function|undefined} callback 
     * @returns 
     */
    attack(ship, callback) {
        if (this.state.hasAttacked) { return; }

        // If ship reference returned, ship was hit
        if (ship) {
            this.setAttack();
        }
        // Else ship is null, ships were missed 
        else if (ship === null) {
            this.setMiss();
        }
        // Else ship is undefined, return without any effect 
        else {
            return;
        }

        this.state.hasAttacked = true;

        if (callback) {
            callback();
        }
    }

    handleClick() {
        this.attack(...this.props.handleClick(this.props.x, this.props.y));
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

        GameboardNodeComponent.ExplosionAudio.currentTime = 0;
        GameboardNodeComponent.ExplosionAudio.volume = 0.4;
        GameboardNodeComponent.ExplosionAudio.play();

        setTimeout(() => {
            this.element.style.backgroundImage = null;
            this.element.classList.add('hit');
        }, 1700);
    }

    setMiss() {
        this.element.style.backgroundImage = `url(${SplashGIF})`;

        GameboardNodeComponent.SplashAudio.currentTime = 0;
        GameboardNodeComponent.SplashAudio.play();

        setTimeout(() => {
            this.element.style.backgroundImage = null;
            this.element.classList.add('miss');
        }, 1500);
    }
}

export default GameboardComponent;
