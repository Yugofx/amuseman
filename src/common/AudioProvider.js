import React, { useEffect, useState } from 'react';
import { requestAudioData, requestAudioInputs } from '../utils/requestAudioData';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Box } from '@material-ui/core';

export const AudioDataContext = React.createContext({});

export function AudioProvider(props) {
    const [state, setAudioState] = useState({ canUse: false, stream: null });
    const [deviceId, setDeviceId] = useState('');
    const [devices, setDevices] = useState(null);

    function updateAudioDevices() {
        requestAudioInputs(ds => setDevices(ds.map(device =>
            <MenuItem key={device.deviceId} value={device.deviceId}>{device.label}</MenuItem>)));
    }

    useEffect(() => {
        requestAudioData((canUse, stream) => {
            setAudioState({ canUse, stream });
            if (canUse) { updateAudioDevices(); }
            else { setDeviceId('') }
        }, deviceId);
    }, [deviceId]);

    return <AudioDataContext.Provider value={state}>
        {
            state.canUse
            ? (<Select  value={deviceId}
                        onChange={e => setDeviceId(e.target.value)}
                        displayEmpty>
                    <MenuItem value="">Audio input not chosen</MenuItem>
                    {devices || []}
                </Select>)
            : <Box>No access to audio input</Box>
        }

        { props.children }
    </AudioDataContext.Provider>
}