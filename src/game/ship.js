export default function Ship(name, length) {
    let hits = 0;

    const hit = () => {
        hits++;
    };

    const isSunk = () => {
        return hits === length;
    };

    return {
        get length() { return length; },
        get name() { return name; },
        hit,
        isSunk,
    };
}