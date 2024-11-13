class LocationManager {
    private _isLocationAccessGranted: boolean = false;
    private _watchId: number | undefined;

    async requestPermission() {
        return new Promise<boolean>((resolve) => {
            const onSuccess = () => {
                //access granted
                this._isLocationAccessGranted = true;
                resolve(true);
            }

            const onError = () => {
                //access granted
                this._isLocationAccessGranted = false;
                resolve(false);
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        });
    }

    get isLocationAccessGranted() {
        return this._isLocationAccessGranted;
    }

    watchPosition(onNewPositionReported: PositionCallback, onErrorWatchPosition: PositionErrorCallback) {
        const watchId = navigator.geolocation.watchPosition(onNewPositionReported, onErrorWatchPosition);
        this._watchId = watchId;
    }

    stopWatch() {
        if (this._watchId) {
            navigator.geolocation.clearWatch(this._watchId);
        }
    }
}