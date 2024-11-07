class CalibrationContent {
    private readonly _modalContent: HTMLElement;
    private readonly _waitingContent: HTMLElement;
    private readonly _canvas: HTMLCanvasElement;
    private readonly _orientation: OrientationManager;
    private readonly _gauge: Gauge;

    constructor(orientation: OrientationManager) {
        this._orientation = orientation;

        const modalContent = document.createElement("div");
        modalContent.classList.add("d-flex", "flex-grow", "modal-content", "justify-content-center", "align-items-center")
        this._modalContent = modalContent;

        //waiting page
        const waitingPage = document.createElement("div");
        this._waitingContent = waitingPage;
        const spinner = document.createElement("div");
        spinner.classList.add("spinner-border", "text-light");
        spinner.setAttribute("role", "status");
        const hiddenLoading = document.createElement("span");
        hiddenLoading.classList.add("visually-hidden");
        spinner.append(hiddenLoading);
        waitingPage.append(spinner);

        const messageDiv = document.createElement("div");
        messageDiv.innerText = "Please hold on while we grant orientation access.";
        messageDiv.classList.add("mt-3", "text-white", "text-center");
        waitingPage.append(messageDiv);
        waitingPage.classList.add("d-flex", "flex-column", "justify-content-center", "align-items-center");


        //calibration page
        const canvas = document.createElement("canvas");
        this._canvas = canvas;
        canvas.classList.add("mb-5", "d-none");
        canvas.id = "lean-angle";
        setAttributes(canvas, {
            "width": "380",
            "height": "180"
        });
        this._gauge = new Gauge(canvas, "#4d5154");

        modalContent.append(waitingPage, canvas);
    }

    onOrientationUpdate(ev: DeviceOrientationEvent) {
        if (ev.gamma) {
            const angle = Math.ceil(ev.gamma);
            this._gauge.draw(angle, getGaugeColor(angle));
        }
    }

    hideWaitingContent() {
        this._waitingContent.classList.add("d-none");
        this._canvas.classList.remove("d-none");

        //to start a gauge with angle 0 even orientation is closed at first.
        this._gauge.draw(0, getGaugeColor(0));
        this._orientation.watch(this.onOrientationUpdate.bind(this));
    }

    get element() {
        return this._modalContent;
    }
}