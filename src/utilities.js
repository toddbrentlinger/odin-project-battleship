/**
 * Capitalizes first letter of string.
 * @param {String} str 
 * @returns {String}
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @param {String} type - Element type
 * @param {Object} props - Element attribute names and their corresponding value
 * @param  {...Node} children - Variable number of child nodes
 */
export function createElement(type, props = {}, ...children) {
    const element = document.createElement(type);

    // Props
    for (const [key, value] of Object.entries(props)) {
        element.setAttribute(key, value);
    }

    // Children Nodes
    children.forEach((child) => element.append(child));

    return element;
}
