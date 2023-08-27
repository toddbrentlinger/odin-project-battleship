import Ship from "./ship";
import ShipPiece from "./shipPiece";

export default function Gameboard(size = 10) {
    const hits = [];
    const misses = [];
    const pieces = {};
    const board = Array(size);

    const addPiece = (key, ship) => {
        let x, y, isHorizontal, validObj;
        let isValid = false;

        while (!isValid) {
            // Random orientation
            isHorizontal = Boolean(Math.floor(Math.random() * 2));

            // Random x,y that is valid
            x = Math.floor(Math.random() * size);
            y = Math.floor(Math.random() * size);

            validObj = checkPieceIsWithinBoard(ship.length, x, y, isHorizontal);
            if (validObj.isValid) {
                // Check if piece is overlapping with any other piece
                isValid = !isPieceOverlapping(ship.length, x, y, isHorizontal);
            } else {
                x = validObj.x;
                y = validObj.y;
            }
        }

        pieces[key] = ShipPiece(ship, x, y, isHorizontal);

        // Add piece references to board grid
        for (let n = ship.length; n > 0; n--) {
            board[x][y] = ship;
            if (isHorizontal) {
                x++;
            } else {
                y++;
            }
        }
    };

    const init = () => {
        // Create board
        for (let row = 0; row < size; row++) {
            board[row] = Array(size);

            for (let col = 0; col < size; col++) {
                board[row][col] = null;
            }
        }

        // Add pieces with random position and orientations
        addPiece('carrier', Ship(5));
        addPiece('battleship', Ship(4));
        addPiece('destroyer', Ship(3));
        addPiece('submarine', Ship(3));
        addPiece('patrol_boat', Ship(2));

        printBoard();
    };

    const checkPieceIsWithinBoard = (shipLength, x, y, isHorizontal) => {
        let isValid = true;
        // Clamp x
        if (x < 0) {
            isValid = false;
            x = 0;
        } else if (x > size - (isHorizontal ? shipLength : 1)) {
            isValid = false;
            x = size - (isHorizontal ? shipLength : 1);
        }

        // Clamp y
        if (y < 0) {
            isValid = false;
            y = 0;
        } else if (y > size - (!isHorizontal ? shipLength : 1)) {
            isValid = false;
            y = size - (!isHorizontal ? shipLength : 1);
        }

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
            if (board[x][y] !== null) {
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
                boardStr += col === null ? ' - ' : ' X ';
            });
            boardStr += '\n';
        });

        console.log(boardStr);
    };

    const recieveAttack = (x, y) => {

    };

    return {
        get board() { return board; },
        get pieces() { return pieces; },
        checkPieceIsWithinBoard,
        init,
    };
}
