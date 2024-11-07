class OrientationManager {
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
    }

    private _lastOrientation: DeviceOrientationEvent | undefined;

    get lastOrientation() {
        return this._lastOrientation;
    }

    private createOnOrientationUpdate(listener: (event: DeviceOrientationEvent) => void) {
        return (ev: DeviceOrientationEvent) => {
            this._lastOrientation = ev;
            listener(ev);
        }
    }

    public watch(listener: (event: DeviceOrientationEvent) => void) {
        const handler = this.createOnOrientationUpdate(listener).bind(this)

        window.addEventListener('deviceorientation', handler);
    }
}