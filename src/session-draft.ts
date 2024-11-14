class SessionDraft {
    private _initialGamma: number = 0;
    private readonly _startTime: number;
    private _endTime: number | undefined;
    private _orientations: number[] = [];
    private _points: Point[] = [];
    private _distance: number = 0;
    private _maxLeanAngle: number = 0;

    constructor() {
        this._startTime = (new Date()).getTime();
    }

    get startTime() {
        return this._startTime;
    }

    addOrientation(orientationEvent: DeviceOrientationEvent) {
        console.log("orientation added");
        const correctedGamma = orientationEvent.gamma ? orientationEvent.gamma - this._initialGamma : 0;
        const correctedGammaWith90deg = correctedGamma > 90 ? 90 : correctedGamma < -90 ? -90 : correctedGamma;
        this._orientations.push(correctedGammaWith90deg);
    }

    addLocation(position: GeolocationPosition) {
        let gammaMax = 0;

        for (const orientation of this._orientations) {
            if (Math.abs(orientation) > Math.abs(gammaMax)) {
                gammaMax = orientation;
            }
        }

        if (Math.abs(gammaMax) > Math.abs(this._maxLeanAngle)) {
            this._maxLeanAngle = gammaMax;
        }

        const point: Point = {
            date: this._startTime,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp,
            speed: position.coords.speed ?? 0,
            distance: 0,
            gamma: gammaMax
        }

        if (this._points.length > 0) {
            const prevPoint = this._points[this._points.length - 1];
            prevPoint.distance = this.calcDistance(point, prevPoint);
            this._distance += prevPoint.distance;
        }

        this._points.push(point);
        console.log("points array:", this._points);
        this._orientations = [];
    }

    setCallibration(lastOrientation: DeviceOrientationEvent) {
        this._initialGamma = lastOrientation.gamma ?? 0;
    }

    end() {
        this._endTime = (new Date()).getTime();
        const timeInterval = this._endTime - this._startTime;

        const session: Session = {
            date: new Date(this._startTime),
            distance: Math.ceil(this._distance),
            duration: timeInterval,
            speed: Math.ceil(this._distance / (timeInterval / 1000 / 3600)),
            maxLeanAngle: Math.ceil(this._maxLeanAngle),
            points: this._points
        }

        return session;
    }

    private deg2rad(degree: number) {
        return degree * (Math.PI / 180);
    }

    private calcDistance(point: Point, prevPoint: Point): number {
        let latFirst = prevPoint.latitude;
        latFirst = this.deg2rad(latFirst);
        let latLast = point.latitude;
        latLast = this.deg2rad(latLast);

        let lngFirst = prevPoint.longitude;
        lngFirst = this.deg2rad(lngFirst);
        let lngLast = point.longitude;
        lngLast = this.deg2rad(lngLast);

        const earthRadius = 6371; // Radius of the earth in km

        const dLat = this.deg2rad(latLast - latFirst);
        const dLong = this.deg2rad(lngLast - lngFirst);

        const a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(latFirst) * Math.cos(latLast) * Math.pow(Math.sin(dLong / 2), 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadius * c;

        return distance;
    }
}