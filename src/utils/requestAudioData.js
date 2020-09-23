export async function requestAudioData(cb, deviceId) {
    let stream = null;
    try {
        const status = await navigator.permissions.query({ name: 'microphone' });
        status.onchange = async function () {
            if (status.state === 'granted') {
                if (stream) { return; }
                stream = await getStream(deviceId);
                cb(true, stream);
            } else if (status.state === 'denied') {
                stream = null;
                cb(false, null);
            } else if (status.state === 'prompt') {
                stream = null;
                stream = await getStream(deviceId);
                cb(true, stream);
            }
        };
        stream = await getStream(deviceId)
        cb(status.state === 'granted', stream);
    } catch (e) {
        console.error('[ERROR] Can\'t Get Audio Stream');
        stream = null;
        cb(false, null);
    }
}

function getStream(deviceId) {
    const opts = { audio: deviceId ? { deviceId: { exact: deviceId } } : true, video: false };
    return navigator.mediaDevices.getUserMedia(opts);
}

export function requestAudioInputs(cb) {
    const onDeviceEnumerate = () => {
        navigator.mediaDevices.enumerateDevices()
            .then(ds => cb(ds.filter(device => device.kind === 'audioinput')))
            .catch(e => console.error('[ERROR] Can\'t Enumerate Device'));
    };
    if (!navigator.mediaDevices.ondevicechange) {
        navigator.mediaDevices.ondevicechange = function() {
            onDeviceEnumerate();
        }
    }
    onDeviceEnumerate();
}