export const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H'];

export const KEY_ALIAS_MAP = {
    'C': ['D♭♭', 'H#'],
    'C#': ['D♭'],
    'D': ['E♭♭', 'C##'],
    'D#': ['E♭'],
    'E': ['D##', 'F♭'],
    'F': ['G♭♭', 'E#'],
    'F#': ['G♭', 'E##'],
    'G': ['A♭♭', 'F##'],
    'G#': ['A♭'],
    'A': ['H♭♭', 'G##'],
    'A#': ['H♭', 'B'],
    'H': ['C♭', 'A##'],
};

export const MODES = [
    'ionian', 'aeolian', 'harmin', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'locrian'
]

export const MODE_CONFIG = {
    ionian: [2,2,1,2,2,2,1], // C whites (major)
    aeolian: [2,1,2,2,1,2,2], // minor
    harmin: [2,1,2,2,1,3,1],
    dorian: [2,1,2,2,2,1,2], // D whites
    phrygian: [1,2,2,2,1,2,2], // E whites
    lydian: [2,2,2,1,2,2,1], // F whites
    mixolydian: [2,2,1,2,2,1,2], // G whites
    locrian: [1,2,2,1,2,2,2], // H whites
};

export const MODE_NAMES = {
    ionian: 'Major (Ionian)', // C whites (major)
    aeolian: 'Minor (Aeolian)', // minor
    harmin: 'Harmonic minor',
    dorian: 'Dorian', // D whites
    phrygian: 'Phrygian', // E whites
    lydian: 'Lydian', // F whites
    mixolydian: 'Mixolydian', // G whites
    locrian: 'Locrian', // H whites
};

export const INTERVAlS = [
    'Prima',
    'Minor 2nd',
    'Major 2nd',
    'Minor 3rd',
    'Major 3rd',
    'Perfect 4th',
    'Tritone',
    'Perfect 5th',
    'Minor 6th',
    'Major 6th',
    'Minor 7th',
    'Major 7th',
    'Octave',
    'Minor 9th',
    'Major 9th',
];

export const ROMAN_NUMBER = [
    'Ⅰ',
    'Ⅱ',
    'Ⅲ',
    'Ⅳ',
    'Ⅴ',
    'Ⅵ',
    'Ⅶ',
];
