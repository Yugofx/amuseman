import React, { useContext, useEffect, useState } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import MicIcon from '@material-ui/icons/Mic';
import { AudioDataContext } from '../../common/AudioProvider';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';

function usePitch(isStarted) {
    const { canUse, stream } = useContext(AudioDataContext);
    const [recorder, setRecorder] = useState(null);
    const [audioCtx] = useState(new AudioContext());
    const [pitch, setPitch] = useState(null);
    const [processor, setProcessor] = useState(null);

    useEffect(() => {
        if (!processor) {
            setProcessor(new Worker('../PitchProcessorWorker.js'));
        } else {
            processor.onmessage = ({ data }) => setPitch(data);
        }
    }, [processor]);

    useEffect(() => {
        setRecorder(canUse ? new MediaRecorder(stream) : null);
    }, [canUse, stream]);

    useEffect(() => {
        if (recorder && isStarted) {
            recorder.ondataavailable = async function({ data }) {
                if (data.size !== 0) {
                    const response = await fetch(URL.createObjectURL(data));
                    const arrayBuffer = await response.arrayBuffer();
                    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
                    const audioData = audioBuffer.getChannelData(0);
                    processor.postMessage({
                        sampleRate: audioBuffer.sampleRate,
                        audioData
                    });
                }
            };
            recorder.state === 'inactive' && recorder.start();
        } else if (recorder && !isStarted) {
            recorder.state === 'recording' && recorder.stop();
        }
    });

    return pitch;
}

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

export function Pitcher() {
    const classes = useStyles();
    const [isStarted, setStarted] = useState(false);
    const pitch = usePitch(isStarted);

    function start() {
        setStarted(true);
    }

    // min 3 sec for correct detection
    useEffect(() => {
        isStarted && setTimeout(() => setStarted(false), 3000);
    }, [isStarted]);

    return (
        <Box className={classes.root}>
            <Box className={classes.board}>
                <Box className={classes.label}>Pitcher</Box>

                <Button disabled={isStarted}
                        className={classes.icon}
                        onClick={start}>
                    <MicIcon />
                </Button>

                { pitch
                    ? <Box>
                        <Box><strong>pitch: { pitch.key.toUpperCase() + pitch.octave }</strong></Box>
                        <Box><strong>freq: { pitch.frequency }</strong></Box>
                    </Box>
                    : null }
            </Box>
        </Box>
    );
}