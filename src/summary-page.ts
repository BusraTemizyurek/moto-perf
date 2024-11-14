interface SummaryPageOptions {
    session: Session
}

class SummaryPage implements Page<SummaryPageOptions> {
    private readonly _router: Router;
    private readonly _sessionRepository: SessionRepository;
    private _options: SummaryPageOptions | undefined;

    constructor(router: Router, sessionRepository: SessionRepository) {
        this._router = router;
        this._sessionRepository = sessionRepository;
    }

    private createPageDiv() {
        const page = document.createElement("div");
        page.classList.add("h-100", "d-flex", "flex-column", "justify-content-center");
        return page;
    }

    private createHeader() {
        const headerDiv = document.createElement("div");
        headerDiv.classList.add("w-100", "h-20", "fs-5", "fw-bold", "d-flex", "p-2", "justify-content-center", "bg-secondary-subtle");
        headerDiv.innerHTML = "Ride Details";

        return headerDiv;
    }

    private createBody(dateVal: Date, distanceValue: number, speedValue: number, durationValue: number, maxLeanAngleValue: number) {
        const summaryBody = document.createElement("div");
        summaryBody.classList.add("d-flex", "flex-column", "flex-start", "gap-5", "flex-grow-1");

        const date = document.createElement("div");
        const dateIcon = document.createElement("i");
        dateIcon.classList.add("bi", "bi-calendar", "fs-4");
        const dateValue = document.createElement("div");
        dateValue.innerText = formatDate(dateVal);
        date.classList.add("d-flex", "flex-row", "gap-1", "pt-3", "ps-2", "align-items-center");
        date.append(dateIcon, dateValue);

        const row1 = document.createElement("div");
        row1.classList.add("d-flex", "flex-row", "w-100", "justify-content-between");

        const duration = document.createElement("div");
        const durationIcon = document.createElement("img");
        durationIcon.src = "./images/time.png";
        durationIcon.classList.add("summary-images");
        const durationVal = document.createElement("div");
        durationVal.classList.add("fs-big-4", "p-3");
        const durationData = convertTimeStampToTime(durationValue);
        durationVal.innerText = `${durationData.hours[0] === "0" ? durationData.hours[1] : durationData.hours} h ${durationData.minutes[0] === "0" ? durationData.minutes[1] : durationData.minutes} min`;
        duration.append(durationIcon, durationVal);
        duration.classList.add("d-flex", "flex-column", "align-items-center", "w-50");

        const distance = document.createElement("div");
        const distanceIcon = document.createElement("img");
        distanceIcon.src = "./images/distance.png";
        distanceIcon.classList.add("summary-images");
        //distanceIcon.classList.add("fa-solid", "fa-road", "fa-2xl");
        const distanceVal = document.createElement("div");
        distanceVal.classList.add("fs-big-4", "p-3");
        distanceVal.innerText = `${distanceValue} km`;
        distance.append(distanceIcon, distanceVal);
        distance.classList.add("d-flex", "flex-column", "align-items-center", "w-50");

        row1.append(duration, distance);

        const row2 = document.createElement("div");
        row2.classList.add("d-flex", "flex-row", "w-100", "justify-content-between");

        const speed = document.createElement("div");
        const speedIcon = document.createElement("img");
        speedIcon.src = "./images/speed.png";
        speedIcon.classList.add("summary-images");
        const speedVal = document.createElement("div");
        speedVal.classList.add("fs-big-4", "p-3");
        speedVal.innerText = `${speedValue} km/h`;
        speed.append(speedIcon, speedVal);
        speed.classList.add("d-flex", "flex-column", "align-items-center", "w-50");

        const maxLeanAngle = document.createElement("div");
        const maxLeanAngleIcon = document.createElement("img");
        maxLeanAngleIcon.src = "./images/lean.png";
        maxLeanAngleIcon.classList.add("summary-images");
        const maxLeanAngleVal = document.createElement("div");
        maxLeanAngleVal.classList.add("fs-big-4", "p-3");
        maxLeanAngleVal.innerText = `${maxLeanAngleValue}\u00B0`;
        maxLeanAngle.append(maxLeanAngleIcon, maxLeanAngleVal);
        maxLeanAngle.classList.add("d-flex", "flex-column", "align-items-center", "w-50");

        row2.append(speed, maxLeanAngle);

        const data = document.createElement("div");
        data.append(row1, row2);
        data.classList.add("d-flex", "flex-column", "align-items-center", "gap-5", "pt-4");
        summaryBody.append(date, data);

        return summaryBody;
    }

    private createFooter() {
        const buttons = document.createElement("div");
        buttons.classList.add("d-flex", "flex-row", "justify-content-between");

        const save = document.createElement("button");
        save.classList.add("w-50", "border", "border-0", "btn", "btn-success", "rounded-0", "summary-buttons");
        save.innerText = "Save";
        save.onclick = this.onSaveClick;

        const discard = document.createElement("button");
        discard.classList.add("w-50", "border", "border-0", "btn", "btn-danger", "rounded-0", "summary-buttons");
        discard.innerText = "Discard";
        discard.onclick = this.onDiscardClick;

        buttons.append(save, discard);
        return buttons;
    }

    private onSaveClick = () => {
        if (this._options) {
            this._sessionRepository.addSession(this._options.session);
            this._router.navigate("main");
        }
    }

    private onDiscardClick = () => {
        this._router.navigate("main");
    }

    render(root: HTMLElement, options?: SummaryPageOptions) {
        if (!options) {
            throw new Error("options is not available");
        }

        const pageDiv = this.createPageDiv();
        pageDiv.append(this.createHeader(), this.createBody(options.session.date, options.session.distance, options.session.speed, options.session.duration, options.session.maxLeanAngle), this.createFooter());
        this._options = options;
        root.append(pageDiv);
    }
}