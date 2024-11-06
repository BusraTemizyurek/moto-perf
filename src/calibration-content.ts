class CalibrationContent {
    private _modalContent: HTMLElement;

    constructor() {
        const modalContent = document.createElement("div");
        modalContent.classList.add("d-flex", "flex-grow", "modal-content", "justify-content-center", "align-items-center")
        this._modalContent = modalContent;

        //waiting page
        const waitingPage = document.createElement("div");

        const spinner = document.createElement("div");
        spinner.classList.add("spinner-border");
        spinner.setAttribute("role", "status");
        const hiddenLoading = document.createElement("span");
        hiddenLoading.classList.add("visually-hidden");
        spinner.append(hiddenLoading);
        waitingPage.append(spinner);

        const messageDiv = document.createElement("div");
        messageDiv.innerText = "Please hold on while we grant orientation access.";
        messageDiv.classList.add("mt-3");
        waitingPage.append(messageDiv);
        waitingPage.classList.add("d-flex", "flex-column", "justify-content-center", "align-items-center")


        //calibration page
        const canvas = document.createElement("canvas");
        canvas.classList.add("mb-5", "d-none");
        canvas.id = "lean-angle";
        setAttributes(canvas, {
            "width": "380",
            "height": "180"
        });

        modalContent.append(waitingPage, canvas);
    }

    get element() {
        return this._modalContent;
    }
}