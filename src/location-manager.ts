class LocationManager {
    private _isLocationAccessGranted: boolean = false;

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

    // watchPosition() {
    //     TODO: watchID will be created
    // }
}