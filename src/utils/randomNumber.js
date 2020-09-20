/**
 * @description Generates random number in range [from, to)
 * @param from {number} lower limit of range (included)
 * @param to {number} upper limit of range (excluded)
 * @returns {number}
 */
export default (from, to) => {
    // no need to gen number
    if (from === to) return from;
    // swap arguments
    if (from > to) {
        const temp = from;
        from = to;
        to = temp;
    }
    const delta = to - from;
    return Math.floor(Math.random() * delta) + from;
};