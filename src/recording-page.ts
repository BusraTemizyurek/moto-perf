import { Gauge } from "./gauge";
import { getGaugeColor } from "./get-gauge-color";
import type { LocationManager } from "./location-manager";
import type { OrientationManager, OrientationWatcher } from "./orientation-manager";
import type { Router } from "./router";
import { SessionDraft } from "./session-draft";
import type { Page } from "./types";
import { convertTimeStampToTime, setAttributes } from "./utilities";
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { library, icon } from '@fortawesome/fontawesome-svg-core';

export class RecordingPage implements Page {
    private readonly _locationManager: LocationManager;
    private readonly _orientationManager: OrientationManager;
    private readonly _router: Router;
    private _gauge: Gauge | undefined;
    private _wathchHandler: OrientationWatcher | undefined;
    private _position: GeolocationPosition | undefined;
    private _sessionDraft: SessionDraft | undefined;
    private _initialOrientation: DeviceOrientationEvent | undefined;

    constructor(locationManager: LocationManager, orientationManager: OrientationManager, router: Router) {
        this._locationManager = locationManager;
        this._orientationManager = orientationManager;
        this._router = router;

        library.add(faSquare);
    }

    private createRecordingPageDiv() {
        const recordingPageDiv = document.createElement("div");
        recordingPageDiv.classList.add("d-flex", "flex-column", "align-items-center", "justify-content-between", "flex-grow-1", "recording-page-div", "pt-6", "pb-3");

        return recordingPageDiv;
    }

    private startTimer(element: HTMLElement) {
        const time = setInterval(() => {
            if (!this._sessionDraft) {
                return;
            }
            const now = new Date().getTime()
            const diff = now - this._sessionDraft.startTime;
            const formattedDif = convertTimeStampToTime(diff);

            element.innerText = `${formattedDif.hours}:${formattedDif.minutes}:${formattedDif.seconds}`;
        }, 1000);
    }

    private createTimePart() {
        const time = document.createElement("div");

        const timeTitle = document.createElement("div");
        const timeValue = document.createElement("div");

        timeTitle.innerText = "TIME";
        timeTitle.classList.add("fs-7");

        timeValue.innerText = "00:00:00";
        this.startTimer(timeValue);
        timeValue.classList.add("recording-page-values");

        time.append(timeTitle, timeValue);
        time.classList.add("d-flex", "flex-column", "align-items-center", "w-100");

        return time;
    }

    private onOrientationChange(event: DeviceOrientationEvent) {
        this._sessionDraft?.addOrientation(event);

        const gammaInitial = this._initialOrientation?.gamma;
        if (event.gamma) {
            const angle = Math.ceil(Math.ceil(event.gamma - (gammaInitial ?? 0)));
            this._gauge?.draw(angle, getGaugeColor(angle))
        }
    }

    private createGaugePart() {
        const canvas = document.createElement("canvas");
        canvas.classList.add("w-100")
        canvas.id = "lean-angle";
        setAttributes(canvas, {
            "width": "380",
            "height": "180"
        });
        this._gauge = new Gauge(canvas, "#4d5154");
        this._gauge.draw(0, getGaugeColor(0));
        this._wathchHandler = this._orientationManager.watch(this.onOrientationChange.bind(this));

        return canvas;
    }

    private createSpeedPart() {
        const speed = document.createElement("div");

        const speedTitle = document.createElement("div");
        const speedValue = document.createElement("div");
        const speedUnit = document.createElement("div");

        speedTitle.innerText = "AVG SPEED";
        speedTitle.classList.add("fs-7");

        speedValue.innerText = `${this._position?.coords.speed ?? 0}`;
        speedValue.classList.add("recording-page-values");

        speedUnit.innerText = "KM/H";
        speedUnit.classList.add("fs-7");

        speed.append(speedTitle, speedValue, speedUnit);
        speed.classList.add("d-flex", "flex-column", "align-items-center", "w-100");

        return speed;
    }

    private createEndButton() {
        const squareIcon = icon({
            iconName: faSquare.iconName,
            prefix: faSquare.prefix
        }, {
            classes: ['fa-2xl'],
            styles: {
                color: '#ffffff'
            }
        });
        const endButton = document.createElement("button");
        endButton.append(squareIcon.node[0]);
        endButton.classList.add("bg-danger", "rounded-circle", "border", "border-0", "shadow", "p-4");
        endButton.onclick = this.onEndClick.bind(this);

        return endButton;
    }

    private async onEndClick() {
        this._locationManager.stopWatch();
        this._orientationManager.unwatch(this.onOrientationChange);
        const session = this._sessionDraft?.end();
        await this._router.navigate("summary", {
            session
        });
    }

    private onNewPositionReported(position: GeolocationPosition) {
        this._position = position;
        this._sessionDraft?.addLocation(position);
    }

    private onErrorWatchPosition(error: GeolocationPositionError) {
        console.log("access denied");
        console.log(error);
    }

    render(root: HTMLElement) {
        const sessionDraft = new SessionDraft();
        this._sessionDraft = sessionDraft;

        this._initialOrientation = this._orientationManager.lastOrientation;
        if (this._initialOrientation) {
            this._sessionDraft.setCallibration(this._initialOrientation);
        }

        this._locationManager.watchPosition(this.onNewPositionReported.bind(this), this.onErrorWatchPosition);
        const recordingPageDiv = this.createRecordingPageDiv();

        if (this._locationManager.isLocationAccessGranted) {
            recordingPageDiv.append(this.createTimePart(), this.createGaugePart(), this.createSpeedPart(), this.createEndButton());
        } else {
            recordingPageDiv.append(this.createGaugePart(), this.createEndButton());
            recordingPageDiv.classList.add("pt-16");
        }
        recordingPageDiv.classList.add("text-white");
        root.append(recordingPageDiv);
    }
}