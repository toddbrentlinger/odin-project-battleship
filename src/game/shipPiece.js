/**
 * 
 * @param {Ship} ship 
 * @param {String} name 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Boolean} isHorizontal 
 * @returns {Object}
 */
export default function ShipPiece(ship, x = 0, y = 0, isHorizontal = true) {
    return {
        get ship() { return ship; },
        get x() { return x; },
        get y() { return y; },
        get isHorizontal() { return isHorizontal; },
    };
}