import Ship from "./ship";

function GameboardNode() {
    let ship = null;
    let isAttacked = false;

    const recieveAttack = () => {
        if (ship) {
            ship.hit();
        }

        isAttacked = true;
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

    const addPieceToBoard = (ship, x, y, isHorizontal) => {
        for (let n = ship.length; n > 0; n--) {
            board[x][y].ship = ship;
            if (isHorizontal) {
                x++;
            } else {
                y++;
            }
        }
    };

    const addRandomShipPosition = (ship) => {
        let x, y, isHorizontal, validObj;
        let isValid = false;

        while (!isValid) {
            // Random orientation
            isHorizontal = Boolean(Math.floor(Math.random() * 2));

            // Random x,y that is valid
            x = Math.floor(Math.random() * size);
            y = Math.floor(Math.random() * size);

            // Check piece is within board and get adjusted coordinates if NOT
            validObj = checkPieceIsWithinBoard(ship.length, x, y, isHorizontal);

            // If original coordinates are invalid, set to adjusted coordinates 
            if (!validObj.isValid) {
                x = validObj.x;
                y = validObj.y;
            }

            // Check if piece is overlapping with any other piece
            isValid = !isPieceOverlapping(ship.length, x, y, isHorizontal);
        }

        addPieceToBoard(ship, x, y, isHorizontal);
    };

    const init = () => {
        // Create board
        for (let row = 0; row < size; row++) {
            board[row] = Array(size);

            for (let col = 0; col < size; col++) {
                board[row][col] = GameboardNode();
            }
        }

        // Add pieces with random position and orientations
        addRandomShipPosition(Ship('carrier', 5));
        addRandomShipPosition(Ship('battleship', 4));
        addRandomShipPosition(Ship('destroyer', 3));
        addRandomShipPosition(Ship('submarine', 3));
        addRandomShipPosition(Ship('patrol boat', 2));

        printBoard();
    };

    const checkPieceIsWithinBoard = (shipLength, x, y, isHorizontal) => {
        let isValid = true;
        // Clamp x to size
        if (x < 0) {
            isValid = false;
            x = 0;
        } else if (x > size - (isHorizontal ? shipLength : 1)) {
            isValid = false;
            x = size - (isHorizontal ? shipLength : 1);
        }

        // Clamp y to size
        if (y < 0) {
            isValid = false;
            y = 0;
        } else if (y > size - (!isHorizontal ? shipLength : 1)) {
            isValid = false;
            y = size - (!isHorizontal ? shipLength : 1);
        }

        // Return valid flag and valid coordinates that are shifted if initial coordinates are invalid
        return {
            isValid,
            x,
            y,
        };
    };

    const isHit = (x, y) => {

    };

    const isPieceOverlapping = (shipLength, x, y, isHorizontal) => {
        for (let n = shipLength; n > 0; n--) {
            if (board[x][y].ship !== null) {
                return true;
            }

            if (isHorizontal) {
                x++;
            } else {
                y++;
            }
        }

        return false;
    };

    const printBoard = () => {
        let boardStr = '';

        board.forEach((row) => {
            row.forEach((col) => {
                if (col.ship) {
                    boardStr += col.isAttacked ? ' X ' : ` ${col.ship.name[0]} `;
                } else {
                    boardStr += col.isAttacked ? ' O ' : ' - ';
                }
            });
            boardStr += '\n';
        });

        console.log(boardStr);
    };

    const recieveAttack = (x, y) => {
        // Check attack is within board
        if (x < 0 || x > size - 1 || y < 0 || y > size - 1) {
            throw new Error(`Attack coordinates must be within board's size of ${size}`);
        }

        // Check coordinates have NOT already been attacked
        if (board[x][y].isAttacked) {
            throw new Error('Coordinates have already been attacked');
        }

        board[x][y].recieveAttack();

        printBoard();
    };

    return {
        get board() { return board; },
        checkPieceIsWithinBoard,
        init,
        recieveAttack,
    };
}
