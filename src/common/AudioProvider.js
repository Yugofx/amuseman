import React, { useEffect, useReducer } from 'react';
import { requestAudioData, requestAudioInputs } from '../utils/requestAudioData';

export const AudioStateContext = React.createContext({});
export const AudioDeviceDispatchContext = React.createContext({});

const initialState = {
    canUseAudioInput: false,
    stream: null,
    audioCtx: new AudioContext(),
    deviceId: '',
    devices: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'resetDeviceId': return { ...state, deviceId: '' };
        case 'setDeviceId': return { ...state, deviceId: action.deviceId };
        case 'setStream': return { ...state, stream: action.stream, canUseAudioInput: !!action.stream };
        case 'setDevices': return { ...state, devices: action.devices };
        default: return state;
    }
};

export function AudioProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    function updateDeviceId(deviceId = '') {
        dispatch({ type: 'setDeviceId', deviceId });
    }

    useEffect(() => {
        requestAudioData((stream) => {
            dispatch({ type: 'setStream', stream });
            if (stream) { requestAudioInputs(devices => { dispatch({ type: 'setDevices', devices }) }); }
            else { dispatch({ type: 'resetDeviceId' }); }
        }, state.deviceId);
    }, [state.deviceId]);

    return <AudioStateContext.Provider value={state}>
        <AudioDeviceDispatchContext.Provider value={updateDeviceId}>
            { props.children }
        </AudioDeviceDispatchContext.Provider>
    </AudioStateContext.Provider>
}