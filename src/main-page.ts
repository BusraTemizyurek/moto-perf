class MainPage implements Page {
    private readonly _router: Router;
    private readonly _sessionRepository: SessionRepository;
    constructor(router: Router, sessionRepository: SessionRepository) {
        this._router = router;
        this._sessionRepository = sessionRepository;
    }

    //helper functions
    private createHeader() {
        const head = document.createElement("div");
        head.innerText = "Home";
        head.classList.add("fs-6", "fw-bold", "bg-body", "main-header", "d-flex", "justify-content-center", "align-items-center", "flex-shrink-0");
        return head;
    }

    private createCardList(sessions: Session[]) {
        const cardList = document.createElement("div");
        cardList.id = "card-list";
        cardList.classList.add("main-cardlist-div", "flex-grow");

        if (sessions.length === 0) {
            const noRideCard = new NoRideCard();
            cardList.append(noRideCard.element);
        } else {
            for (const session of sessions) {
                const card = new RideCard(session);
                cardList.append(card.element);
            }
        }

        return cardList;
    }

    private onClickModalClose() {
        this._recordButton?.classList.remove("d-none");
    }


    private onClickModalReady() {
        this._calibrationModal?.hide();
        this._recordButton?.classList.remove("d-none");
        // TODO: get initial orientation, ask to access the location and navigate to recording page.
    }

    private onRecordClick() {
        this._recordButton?.classList.add("d-none");
        this._calibrationModal?.show();
    }

    private createRecordButton() {
        const rec = document.createElement("button");
        rec.id = "record-button";
        rec.type = "button";
        rec.innerHTML = '<i class="fa-solid fa-circle fa-xl" style="color: #d10510;"></i>';
        rec.classList.add("shadow-sm", "main-rec-button", "btn", "btn-outline-dark", "bg-secondary-subtle", "border", "border-4", "border-black", "rounded-circle");
        rec.onclick = this.onRecordClick.bind(this);

        return rec;
    }

    private _calibrationModal: Modal | undefined;
    private _recordButton: HTMLElement | undefined;
    //drawing the page
    render(root: HTMLElement) {
        this._calibrationModal = new Modal({
            title: "Calibration",
            createContent: function () {
                const content = new CalibrationContent();
                return content.element;
            },
            buttonTitle: "Ready!",
            onButtonClick: this.onClickModalReady.bind(this),
            onClose: this.onClickModalClose.bind(this)
        });

        this._recordButton = this.createRecordButton();

        root.append(this.createHeader(), this.createCardList(this._sessionRepository.sessions), this._recordButton);
    }
}
