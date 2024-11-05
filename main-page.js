class MainPage {
    #router = undefined;
    #sessionRepository = undefined;
    constructor(router, sessionRepository) {
        this.#router = router;
        this.#sessionRepository = sessionRepository;
    }

    //helper functions
    #createHeader() {
        const head = document.createElement("div");
        head.innerText = "Home";
        head.classList.add("fs-6", "fw-bold", "bg-body", "main-header", "d-flex", "justify-content-center", "align-items-center", "flex-shrink-0");
        return head;
    }

    #createCardList(sessions) {
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

    #onClickModalClose() {
        this.#recordButton.classList.remove("d-none");
    }


    #onClickModalReady() {
        this.#calibrationModal.hide();
        this.#recordButton.classList.remove("d-none");
        // TODO: get initial orientation, ask to access the location and navigate to recording page.
    }

    #onRecordClick() {
        this.#recordButton.classList.add("d-none");
        this.#calibrationModal.show();
    }

    #createRecordButton() {
        const rec = document.createElement("button");
        rec.id = "record-button";
        rec.type = "button";
        rec.innerHTML = '<i class="fa-solid fa-circle fa-xl" style="color: #d10510;"></i>';
        rec.classList.add("shadow-sm", "main-rec-button", "btn", "btn-outline-dark", "bg-secondary-subtle", "border", "border-4", "border-black", "rounded-circle");
        rec.onclick = this.#onRecordClick.bind(this);

        return rec;
    }

    #createCalibrationModalContent() {
        // TODO: Below example will be removed and canvas components will be added;
        const exampleElement = document.createElement("div");
        exampleElement.innerText = "TEST";

        return exampleElement;
    }

    #calibrationModal = undefined;
    #recordButton = undefined;
    //drawing the page
    render(root) {
        this.#calibrationModal = new Modal({
            title: "Calibration",
            createContent: this.#createCalibrationModalContent.bind(this),
            buttonTitle: "Ready!",
            onButtonClick: this.#onClickModalReady.bind(this),
            onClose: this.#onClickModalClose.bind(this)
        });

        this.#recordButton = this.#createRecordButton();

        root.append(this.#createHeader(), this.#createCardList(this.#sessionRepository.sessions), this.#recordButton);
    }
}
