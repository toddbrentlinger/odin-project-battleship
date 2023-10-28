export default function Ship(name, length) {
    // Throw error if length is one or less
    if (length < 2) {
        throw new Error('Ship must be length 2 or more');
    }
    
    let hits = 0;

    const hit = () => {
        hits++;
    };

    const isSunk = () => {
        return hits === length;
    };

    const reset = () => {
        hits = 0;
    };

    return {
        get length() { return length; },
        get name() { return name; },
        hit,
        isSunk,
        reset,
    };
}