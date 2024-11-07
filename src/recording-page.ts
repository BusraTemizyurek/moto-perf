class RecordingPage implements Page {
    private readonly _location: LocationManager;

    constructor(location: LocationManager) {
        this._location = location;
    }

    private createRecordingPageDiv() {
        const recordingPageDiv = document.createElement("div");
        recordingPageDiv.classList.add("d-flex", "flex-column", "align-items-center", "justify-content-between", "flex-grow-1", "recording-page-div", "pt-6", "pb-3");

        return recordingPageDiv;
    }

    private createTimePart() {
        const time = document.createElement("div");

        const timeTitle = document.createElement("div");
        const timeValue = document.createElement("div");

        timeTitle.innerText = "TIME";
        timeTitle.classList.add("fs-7");

        timeValue.innerText = "00:00:00";
        timeValue.classList.add("recording-page-values");

        time.append(timeTitle, timeValue);
        time.classList.add("d-flex", "flex-column", "align-items-center", "w-100");

        return time;
    }

    private createGaugePart() {
        const canvas = document.createElement("canvas");
        canvas.classList.add("w-100")
        canvas.id = "lean-angle";
        setAttributes(canvas, {
            "width": "380",
            "height": "180"
        });
        const gauge = new Gauge(canvas, "#4d5154");
        gauge.draw(0, getGaugeColor(0));

        return canvas;
    }

    private createSpeedPart() {
        const speed = document.createElement("div");

        const speedTitle = document.createElement("div");
        const speedValue = document.createElement("div");
        const speedUnit = document.createElement("div");

        speedTitle.innerText = "AVG SPEED";
        speedTitle.classList.add("fs-7");

        speedValue.innerText = "999";
        speedValue.classList.add("recording-page-values");

        speedUnit.innerText = "KM/H";
        speedUnit.classList.add("fs-7");

        speed.append(speedTitle, speedValue, speedUnit);
        speed.classList.add("d-flex", "flex-column", "align-items-center", "w-100");

        return speed;
    }

    private createFinishButton() {
        const finishButton = document.createElement("button");
        finishButton.innerHTML = '<i class="fa-solid fa-square fa-2xl" style="color: #ffffff;"></i>';
        finishButton.classList.add("bg-danger", "rounded-circle", "border", "border-0", "shadow", "p-4");

        return finishButton;
    }

    render(root: HTMLElement) {
        const recordingPageDiv = this.createRecordingPageDiv();

        if (this._location.isLocationAccessGranted) {
            recordingPageDiv.append(this.createTimePart(), this.createGaugePart(), this.createSpeedPart(), this.createFinishButton());
        } else {
            recordingPageDiv.append(this.createGaugePart(), this.createFinishButton());
            recordingPageDiv.classList.add("pt-16");
        }
        recordingPageDiv.classList.add("text-white");
        root.append(recordingPageDiv);
    }
}