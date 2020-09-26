import React, { useEffect, useReducer } from 'react';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import { makeStyles } from '@material-ui/core/styles';
import { KEYS} from '../../constants';
import { frequencer } from '../../libs/frequencer';

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
    icon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: '50%',
        boxShadow: '0 0 10px rgba(0,0,0,.12)',
        textAlign: 'center',
        color: theme.palette.primary.light,
        margin: '0 auto',
        '& > *': {
            fontSize: 50,
        }
    }
}));

const initialState = {
    source: null,
    analyser: null,
    frequency: null,
    key: null,
    octave: null,
    frequencer: frequencer(),
    isStarted: false,
    frameId: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'setStarted':
            return { ...state, isStarted: action.isStarted };
        case 'measure':
            const c0 = 440.0 * Math.pow(2.0, -4.75);
            const halfStepsBelowMiddleC = Math.round(12.0 * Math.log2(action.frequency / c0));
            return {
                ...state,
                frequency: action.frequency,
                frameId: action.frameId,
                octave: Math.floor(halfStepsBelowMiddleC / 12.0),
                key: KEYS[Math.floor(halfStepsBelowMiddleC % 12)]
            };
        case 'clearFrameId':
            cancelAnimationFrame(state.frameId);
            return { ...state, frameId: null };
        default: return state;
    }
};

export function Pitcher() {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);

    function runFrequencyDetection() {
        state.frequencer().then(frequency => {
            dispatch({
                type: 'measure',
                frameId: requestAnimationFrame(runFrequencyDetection),
                frequency
            });
        })
    }

    useEffect(() => {
        if (state.isStarted) {
            runFrequencyDetection();
        } else {
            dispatch({ type: 'clearFrameId' });
        }
    }, [state.isStarted]);

    // Cleanup
    useEffect(() => () => {
        dispatch({ type: 'setStarted', isStarted: false });
    }, []);

    function toggle() {
        dispatch({ type: 'setStarted', isStarted: !state.isStarted });
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.board}>
                <Box className={classes.label}>Pitcher</Box>

                <Button className={classes.icon}
                        onClick={toggle}>
                    <MicIcon />
                </Button>

                <Box>{
                    state.frequency !== null
                        ? <Box>
                            <strong>freq: { state.frequency }</strong>
                            <strong>note: { state.key + state.octave }</strong>
                        </Box>
                        : 'Not defined'
                }
                </Box>
            </Box>
        </Box>
    );
}
