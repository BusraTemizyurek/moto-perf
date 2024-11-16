export type OrientationWatcher = (event: DeviceOrientationEvent) => void

export class OrientationManager {
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

    watch(listener: OrientationWatcher) {
        const handler = (event: DeviceOrientationEvent) => {
            this._lastOrientation = event;
            listener(event);
        }
        window.addEventListener('deviceorientation', handler);

        return handler;
    }

    unwatch(listener: OrientationWatcher) {
        window.removeEventListener("deviceorientation", listener)
    }
}