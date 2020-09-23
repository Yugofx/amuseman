import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Pitchfinder from 'pitchfinder';

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function analyseAudioData ({sampleRate, audioData}) {
    const detectPitch = Pitchfinder.YIN({sampleRate});

    const frequency = detectPitch(audioData);
    if (frequency === null) {
        return null;
    }

    const c0 = 440.0 * Math.pow(2.0, -4.75);
    const halfStepsBelowMiddleC = Math.round(12.0 * Math.log2(frequency / c0));
    const octave = Math.floor(halfStepsBelowMiddleC / 12.0);
    const key = keys[Math.floor(halfStepsBelowMiddleC % 12)];

    return { frequency, key, octave };
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
    audio: {
        display: 'none'
    }
}));

export function Recorder() {
    const classes = useStyles();
    const [audio, setAudio] = useState(null);
    const [isRecording, setRecording] = useState(false);
    const [mediaStream, setMediaStream] = useState();
    const [recorder, setRecorder] = useState();
    const [pitch, setPitch] = useState(null);

    function toggleRecording() {
        setRecording(!isRecording);
    }

    useEffect(() => {
        if (isRecording) {
            navigator.mediaDevices.getUserMedia({ audio: true, video: false })
                .then(stream => {
                    const audioCtx = new AudioContext();
                    // setAudio(new Audio(URL.createObjectURL(data)));
                    const mRecorder = new MediaRecorder(stream);
                    mRecorder.ondataavailable = async function({ data }) {
                        if (data.size !== 0) {
                            const response = await fetch(URL.createObjectURL(data))
                            const arrayBuffer = await response.arrayBuffer()
                            // Decode the audio.
                            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
                            const audioData = audioBuffer.getChannelData(0)
                            // Send the audio data to the audio processing worker.

                            setPitch(analyseAudioData({
                                sampleRate: audioBuffer.sampleRate,
                                audioData
                            }));
                        }

                    }
                    mRecorder.start();
                    setRecorder(mRecorder);
                });
        } else {
            recorder && recorder.stop();
        }
    }, [isRecording]);

    function playRecorded() {
        audio && audio.play();
    }

    function pauseRecorded() {
        audio && audio.pause();
    }

    function stopRecorded() {
        audio && audio.stop();
    }

    return (
        <div className={classes.root}>
            <div className={classes.board}>
                <div className={classes.label}>Recorder</div>

                <Fab color={ isRecording ? 'default' : 'primary' } onClick={toggleRecording}>
                    { isRecording ? <StopIcon /> : <MicIcon /> }
                </Fab>
                <Fab color="primary" disabled={!audio} onClick={playRecorded}>
                    <PlayArrowIcon />
                </Fab>
                <Fab color="primary" disabled={!audio} onClick={pauseRecorded}>
                    <PauseIcon />
                </Fab>
                <audio className={classes.audio} src={audio} controls />

                { pitch
                    ? <div>
                        <div><strong>pitch: { pitch.key.toUpperCase() + pitch.octave }</strong></div>
                        <div><strong>freq: { pitch.frequency }</strong></div>
                    </div>
                    : null }
            </div>
        </div>
    );
}