class Orientation {
    async requestPermission() {
        if ('requestPermission' in DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
            // Handle iOS 13+ devices.
            const state: string = await DeviceMotionEvent.requestPermission();
            if (state !== 'granted') {
                console.error('Request to access the orientation was rejected');
                return false;
            }
        }

        return true;
        // window.addEventListener('deviceorientation', () => { });
    }
}