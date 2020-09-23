import {KEY_ALIAS_MAP, KEYS, MODE_CONFIG} from "../constants";

function _findScaleByKeyAndMode(key, mode) {
    if (!key || !mode) { return []; }
    let cursor = KEYS.findIndex(k => k === key);
    const scale = [];
    for (let i = 0; i < 8; i++) {
        if (i === 0) scale.push(key);
        else {
            cursor = (MODE_CONFIG[mode][i - 1] + cursor) % KEYS.length;
            scale.push(KEYS[cursor]);
        }
    }
    return scale;
}

export function isCorrectKey(key) {
    return KEYS.some(k => key === k || KEY_ALIAS_MAP[k].some(alias => alias === key));
}

export function checkCorrectScale(key, mode, answer) {
    const correctAnswer = _findScaleByKeyAndMode(key, mode);
    if (!answer) { return false; }
    return correctAnswer.every((note, i) => {
        if (note === answer[i]) return true;
        return KEY_ALIAS_MAP[note].some(alias => alias === answer[i]);
    });
}

