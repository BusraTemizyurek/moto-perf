export class WakeLockManager {
    private _curWakeLock: WakeLockSentinel | undefined;

    async requestWakeLock() {
        try {
            const curWakeLock = await navigator.wakeLock.request();
            this._curWakeLock = curWakeLock;
        } catch (err: any) {
            console.log(`${err.name}, ${err.message}`);
        }
    }

    async wakeLockOff() {
        if (this._curWakeLock) {
            this._curWakeLock.release().then(() => {
                this._curWakeLock = undefined;
            });
        }
    }
}