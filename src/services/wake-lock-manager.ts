export class WakeLockManager {
  private _curWakeLock: WakeLockSentinel | undefined;

  async requestWakeLock() {
    if (!this._curWakeLock) {
      const curWakeLock = await navigator.wakeLock.request();
      this._curWakeLock = curWakeLock;
    }
  }

  async releaseWakeLock() {
    if (this._curWakeLock) {
      await this._curWakeLock.release();
      this._curWakeLock = undefined;
    }
  }
}
