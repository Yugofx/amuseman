export async function requestAudioData(cb, deviceId) {
    try {
        const status = await navigator.permissions.query({ name: 'microphone' });
        status.onchange = async function () {
            if (status.state === 'granted') {
                cb(await getStream(deviceId));
            } else if (status.state === 'denied') {
                cb(null);
            }
        };
        cb(await getStream(deviceId));
    } catch (e) {
        console.error('[ERROR] Can\'t Get Audio Stream');
        cb(null);
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
