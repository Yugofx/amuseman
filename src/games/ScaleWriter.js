import React, {useEffect, useState} from 'react';
import {KEYS, MODE_NAMES, MODES, ROMAN_NUMBER} from "../constants";
import {checkCorrectScale, isCorrectKey} from "../utils/scale-writer.utils";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import randomNumber from "../utils/randomNumber";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

const initialAnswer = (first = KEYS[0]) => [first, '', '', '', '', '', '', first];
const genKey = () => KEYS[randomNumber(0, KEYS.length)];
const genMode = () => MODES[randomNumber(0, MODES.length)];

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 100,
        fontWeight: 700,
        color: theme.palette.primary.light
    },
    board: {
        padding: `${theme.spacing(3)}px 0`,
        '& $label': {
            textAlign: 'center',
            fontSize: 50,
            marginBottom: theme.spacing(5),
        },
    },
    settings: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(4),
        '& > *': {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        }
    },
    scale: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(3)
    },
    box: {
        width: 80,
        height: 60,
        lineHeight: 60,
        '& + &': {
            marginLeft: theme.spacing(2)
        }
    },
    result: {
        fontSize: 24,
        fontWeight: 700,
        textAlign: 'center',
        color: ({ result }) => theme.palette[result && result.result ? 'success' : 'error'].main
    }
}));

export function ScaleWriter(props) {
    const [key, setKey] = useState('');
    const [mode, setMode] = useState('');
    const [value, setValue] = useState([]);
    const [result, setResult] = useState(null);
    const classes = useStyles({ result });

    function start() {
        setResult(null);
        const k = genKey();
        setKey(k);
        setMode(genMode());
        setValue(initialAnswer(k));
    }

    function onKeyChange(event) {
        const k = event.target.value;
        setKey(k);
        setValue(initialAnswer(k));
    }

    function onModeChange(event) {
        const m = event.target.value;
        setMode(m);
        setValue(initialAnswer(key));
    }

    function updateAnswer(index, v) {
        v = v.toUpperCase();
        if (!isCorrectKey(v)) v = '';

        setValue(a => a.map((val, i) => i === index ? v : val));
    }

    const keyList = KEYS.map(key => <MenuItem key={key} value={key}>{key}</MenuItem>);
    const modeList = MODES.map(m => <MenuItem key={m} value={m}>{MODE_NAMES[m]}</MenuItem>)

    const boxes = value.map((v, i) =>
        <div className={classes.box} key={i} style={{display: i === value.length - 1 ? 'none' : ''}}>
            <TextField
                label={ROMAN_NUMBER[i]}
                error={!v}
                value={v}
                InputProps={{
                    readOnly: (i % value.length) === 0,
                }}
                disabled={!props.isStarted}
                variant="outlined"
                onChange={event => updateAnswer(i, event.target.value)}
            />
        </div>
    );

    useEffect(() => {
        if (props.isStarted) {
            start();
        }
    }, [props.isStarted]);

    useEffect(() => {
        if (props.isSubmitted) {
            setResult({ result: checkCorrectScale(key, mode, value) });
        }
    }, [props.isSubmitted]);

    const gameLabel = <div className={classes.label}>Scale Writer</div>

    const gameBoard = <div>
        <div className={classes.board}>
            { gameLabel }
            <div className={classes.settings}>
                <FormControl>
                    <InputLabel id="key-select-label">Key</InputLabel>
                    <Select labelId="key-select-label"
                            value={key}
                            disabled
                            onChange={onKeyChange}>
                        {keyList}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="mode-select-label">Mode</InputLabel>
                    <Select labelId="mode-select-label"
                            disabled
                            value={mode}
                            onChange={onModeChange}>
                        {modeList}
                    </Select>
                </FormControl>
            </div>

            <div className={classes.scale}>
                {boxes}
            </div>

            { result
                ? <div className={classes.result}>
                    Scale is { result.result ? 'correct' : 'incorrect' }
                </div>
                : null
            }
        </div>
    </div>;

    return (
        <div className={classes.root}>
            { props.isStarted ? gameBoard : gameLabel }
        </div>
    );
}