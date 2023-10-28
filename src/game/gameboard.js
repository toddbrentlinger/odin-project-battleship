import { capitalize } from "../utilities";
import Ship from "./ship";

function GameboardNode() {
    let ship = null;
    let isAttacked = false;

    /**
     * 
     * @returns {Ship|null}
     */
    const recieveAttack = () => {
        isAttacked = true;

        if (ship) {
            ship.hit();
        }

        // Return Ship reference OR NULL if no Ship in node
        return ship;
    };

    return {
        get ship() { return ship; },
        set ship(newShip) {
            ship = newShip;
        },
        get isAttacked() { return isAttacked; },
        recieveAttack,
    };
}

export default function Gameboard(size = 10) {
    const board = [];
    const ships = [
        Ship('carrier', 5),
        Ship('battleship', 4),
        Ship('destroyer', 3),
        Ship('submarine', 3),
        Ship('patrol boat', 2),
    ];

    /**
     * Add Ship to gameboard with valid coordinates and orientation.
     * @param {Ship} ship Ship instance reference
     * @param {Number} x Horizontal coordinate
     * @param {Number} y Vertical coordinate
     * @param {Boolean} isHorizontal True if ship is horizontal and false if vertical
     */
    const addShipToBoard = (ship, x, y, isHorizontal) => {
        // Remove ship from any gameboard nodes
        removeShipFromBoard(ship);

        // Add ship to new gameboard nodes
        for (let n = ship.length; n > 0; n--) {
            board[y][x].ship = ship;
            if (isHorizontal) {
                x++;
            } else {
                y++;
            }
        }
    };

    /**
     * Add Ship to gameboard with valid coordinates and orientation.
     * @param {Ship} ship Ship instance reference
     * @param {Number} x Horizontal coordinate
     * @param {Number} y Vertical coordinate
     * @param {Boolean} isHorizontal True if ship is horizontal and false if vertical
     */
    const addShipToBoardCustom = (ship, x, y, isHorizontal) => {
        // Check piece is within board and get adjusted coordinates if NOT
        [x, y] = clampCoordinatesToBoard(ship.length, x, y, isHorizontal);

        if (isPieceOverlapping(ship, x, y, isHorizontal)) {
            throw new Error('Ship is overlapping!');
        }

        // Add ship to board
        addShipToBoard(ship, x, y, isHorizontal);
    };

    /**
     * Add Ship to board with valid, random coordinates and orientation.
     * @param {Ship} ship Ship instance reference
     */
    const addShipToBoardRandom = (ship) => {
        let x, y, isHorizontal;
        let isValid = false;

        while (!isValid) {
            // Random orientation
            isHorizontal = Boolean(Math.floor(Math.random() * 2));

            // Random x,y that is valid
            x = Math.floor(Math.random() * size);
            y = Math.floor(Math.random() * size);

            // Check piece is within board and get adjusted coordinates if NOT
            [x, y] = clampCoordinatesToBoard(ship.length, x, y, isHorizontal);

            // Check if piece is overlapping with any other piece
            isValid = !isPieceOverlapping(ship, x, y, isHorizontal);
        }
        
        // Add ship to board
        addShipToBoard(ship, x, y, isHorizontal);

        // Reset ship properties
        ship.reset();
    };

    /**
     * 
     * @returns {Boolean}
     */
    const areAllShipsSunk = () => {
        return ships.every((ship) => ship.isSunk());
    };

    /**
     * Clamp coordinates to board dimension
     * @param {Number} shipLength Length of Ship
     * @param {Number} x Horizontal coordinate
     * @param {Number} y Vertical coordinate
     * @param {Boolean} isHorizontal True if ship is horizontal and false if vertical
     * @returns {Array} Array of x,y coordinates, adjusted if necessary
     */
    const clampCoordinatesToBoard = (shipLength, x, y, isHorizontal) => {
        // Clamp x to size
        if (x < 0) {
            x = 0;
        } else if (x > size - (isHorizontal ? shipLength : 1)) {
            x = size - (isHorizontal ? shipLength : 1);
        }

        // Clamp y to size
        if (y < 0) {
            y = 0;
        } else if (y > size - (!isHorizontal ? shipLength : 1)) {
            y = size - (!isHorizontal ? shipLength : 1);
        }

        // Return valid coordinates that are shifted if initial coordinates are invalid
        return [x, y];
    };

    /** Initialize gameboard instance */
    const init = () => {
        // Create board
        for (let row = 0; row < size; row++) {
            board[row] = Array(size);

            for (let col = 0; col < size; col++) {
                board[row][col] = GameboardNode();
            }
        }

        // Add ships with random position and orientations
        ships.forEach((ship) => addShipToBoardRandom(ship));

        printBoard();
    };

    /**
     * Return true if ship properties are overlapping with another ship on board.
     * @param {Ship} ship reference to Ship instance
     * @param {Number} x Horizontal coordinate
     * @param {Number} y Vertical coordinate
     * @param {Boolean} isHorizontal True if ship is horizontal and false if vertical
     * @returns {Boolean}
     */
    const isPieceOverlapping = (ship, x, y, isHorizontal) => {
        for (let n = ship.length; n > 0; n--) {
            // Return true if gameboard node is NOT empty AND does NOT already have same Ship on it
            if (board[y][x].ship !== null && board[y][x] !== ship) {
                return true;
            }

            // Increment gameboard node based on horizontal flag
            if (isHorizontal) {
                x++;
            } else {
                y++;
            }
        }

        // If reach here, ship is NOT overlapping another ship
        return false;
    };

    /* Print game board to console. */
    const printBoard = (hideShip = false) => {
        let boardStr = '';

        board.forEach((row) => {
            row.forEach((col) => {
                if (col.ship) {
                    boardStr += col.isAttacked ? ' X ' : ` ${hideShip ? '-' : col.ship.name[0]} `;
                } else {
                    boardStr += col.isAttacked ? ' O ' : ' - ';
                }
            });
            boardStr += '\n';
        });

        console.log(boardStr);
    };

    /**
     * 
     * @param {*} x Horizontal coordinate (zero-based)
     * @param {*} y Vertical coordinate (zero-based)
     * @returns {Ship|null} Ship reference if hit or null if miss
     */
    const recieveAttack = (x, y) => {
        // Check attack is within board
        if (x < 0 || x > size - 1 || y < 0 || y > size - 1) {
            throw new Error(`Attack coordinates must be within board's size of ${size}`);
        }

        // Check coordinates have NOT already been attacked
        if (board[y][x].isAttacked) {
            throw new Error('Coordinates have already been attacked');
        }

        const target = board[y][x].recieveAttack();

        // If target was hit
        if (target) {
            console.log(`Hit! ${capitalize(target.name)}!`);

            // Check if ship has sunk
            if (target.isSunk()) {
                console.log(`You sunk my ${capitalize(target.name)}!`);
            }
        } 
        // Else target was a miss
        else {
            console.log('Miss!');
        }

        printBoard();

        return target;
    };

    /**
     * 
     * @param {Ship} ship 
     */
    const removeShipFromBoard = (ship) => {
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (board[y][x].ship === ship) {
                    board[y][x].ship = null;
                }
            }
        }
    };

    return {
        get board() { return board; },
        get ships() { return ships; },
        get size() { return size; },
        addShipToBoardCustom,
        addShipToBoardRandom,
        areAllShipsSunk,
        clampCoordinatesToBoard,
        init,
        isPieceOverlapping,
        printBoard,
        recieveAttack,
    };
}
