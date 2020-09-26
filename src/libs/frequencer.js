export function frequencer() {
    let audioContext = null;
    let analyser = null;
    let nyquist = null;
    let bufferLength = null;
    let stream = null;
    let source = null;
    let state = 'created'; // created / dead / ready

    async function _onPermissionRequest(status) {
        if ((status.state === 'granted' && state !== 'ready')
            || status.state === 'prompt') await _prepare();
        else if (status.state === 'denied') kill();
    }

    async function _prepare() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            if (!audioContext) {
                audioContext = new AudioContext();
                analyser = audioContext.createAnalyser();
                analyser.fftSize = 2048;
                nyquist = audioContext.sampleRate / 2;
                bufferLength = analyser.frequencyBinCount;
            }
            source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            state = 'ready';
        } catch (e) {
            console.error(e);
            kill();
        }
    }

    async function prepare() {
        const status = await navigator.permissions.query({ name: 'microphone' });
        status.onchange = function() { _onPermissionRequest(status) }
        await _onPermissionRequest(status);
    }

    function kill() {
        state = 'dead';
        stream = null;
        source = null;
    }

    function _getFrequency() {
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        let maxVal = -Infinity;
        let maxIndex = -1;
        for (let i = 0; i < bufferLength; i++) {
            let barHeight = dataArray[i];
            if (barHeight > maxVal) {
                maxVal = barHeight;
                maxIndex = i;
            }
        }
        return maxIndex * (nyquist / bufferLength);
    }

    async function start() {
        if (state === 'created') {
            await prepare();
        }
        if (state === 'ready') {
            return _getFrequency();
        }
        else { return null; }
    }

    return start;
}
