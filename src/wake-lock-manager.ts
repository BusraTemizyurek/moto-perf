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

    async releaseWakeLock() {
        if (this._curWakeLock) {
            await this._curWakeLock.release();
            this._curWakeLock = undefined;
        }
    }
}