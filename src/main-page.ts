class MainPage implements Page {
    private readonly _router: Router;
    private readonly _sessionRepository: SessionRepository;
    private readonly _orientationManager: OrientationManager;
    private readonly _locationManager: LocationManager;
    private _calibrationModalContent: CalibrationModalContent | undefined;
    private _calibrationModal: Modal | undefined;
    private _recordButton: HTMLElement | undefined;

    constructor(router: Router, sessionRepository: SessionRepository, orientationManager: OrientationManager, locationManager: LocationManager) {
        this._router = router;
        this._sessionRepository = sessionRepository;
        this._orientationManager = orientationManager;
        this._locationManager = locationManager;
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

    private onClickModalReady(ev: ButtonMouseEvent) {
        ev.target.disabled = true;
        //popover content
        const popoverHeading = document.createElement("div");
        popoverHeading.innerText = "Remember!";

        const popoverBody = document.createElement("div");
        const popoverBodyContent = document.createElement("div");
        popoverBodyContent.innerText = "Enable location access to unlock ride analysis and map features. Without location, only lean angle data will be available."

        const popoverButton = document.createElement("button");
        popoverButton.innerText = "Got it!"
        popoverButton.classList.add("btn", "btn-primary", "mx-auto");
        popoverBody.append(popoverBodyContent, popoverButton);

        const popover = new bootstrap.Popover(ev.target, {
            html: true,
            title: popoverHeading,
            content: popoverBody,
            trigger: "click"
        })
        popover.show();

        popoverButton.onclick = async () => {
            popover.hide();
            if (this._calibrationModalContent?.watchHandler) {
                this._orientationManager.unwatch(this._calibrationModalContent.watchHandler);
            }

            this._calibrationModal?.hideButton();
            this._calibrationModalContent?.showWaitingContent();
            const isLocationPermissionGranted = await this._locationManager.requestPermission();

            if (!isLocationPermissionGranted) {
                console.log("denied");
                //permission denied
            } else {
                console.log("granted");
                //permission granted
            }

            this._calibrationModal?.hide();
            this._recordButton?.classList.remove("d-none");
            this._router.navigate("recording");
        }
    }

    private async onRecordClick() {
        this._recordButton?.classList.add("d-none");
        this._calibrationModal?.show();
        const isOrientationPermissionGranted = await this._orientationManager.requestPermission();
        if (isOrientationPermissionGranted) {
            this._calibrationModalContent?.hideWaitingContent();
            this._calibrationModal?.showButton();
        } else {
            // TODO: access blocked
        }
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

    private createModalContent() {
        this._calibrationModalContent = new CalibrationModalContent(this._orientationManager);
        return this._calibrationModalContent.element;
    }

    //drawing the page
    render(root: HTMLElement) {
        this._calibrationModal = new Modal({
            title: "Calibration",
            createContent: this.createModalContent.bind(this),
            buttonTitle: "Ready!",
            onButtonClick: this.onClickModalReady.bind(this),
            onClose: this.onClickModalClose.bind(this),
            isButtonVisible: false
        });

        this._recordButton = this.createRecordButton();

        root.append(this.createHeader(), this.createCardList(this._sessionRepository.sessions), this._recordButton);
    }
}
