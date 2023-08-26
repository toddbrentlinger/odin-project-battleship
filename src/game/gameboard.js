import Ship from "./ship";
import ShipPiece from "./shipPiece";

export default function Gameboard(size = 10) {
    const hits = [];
    const misses = [];
    const pieces = {
        carrier: ShipPiece(Ship(5)),
        battleship: ShipPiece(Ship(4)),
        destroyer: ShipPiece(Ship(3)),
        submarine: ShipPiece(Ship(3)),
        patrol_boat: ShipPiece(Ship(2)),
    };

    const init = () => {
        // Add pieces with random position and orientations

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

    const recieveAttack = (x, y) => {

    };

    return {
        checkPieceIsWithinBoard,
    };
}
