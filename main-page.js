class MainPage {
    #router = undefined;
    constructor(router) {
        this.#router = router;
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

        for (const session of sessions) {
            const card = new RideCard(session);
            cardList.append(card.element);
        }

        return cardList;
    }

    #createNoDataMessage() {
        const noDataMessage = document.createElement("div");
        noDataMessage.innerText = "Looks like you haven't had a ride yet. Let's start! To record a session click the record button on the bottom right corner";
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
        const sessions = [
            {
                date: new Date("2024-11-04T06:15:00"), // Morning
                distance: 100,
                speed: 100,
                duration: 5400000, // 1 hour 30 minutes in milliseconds
                maxLeanAngle: 30
            },
            {
                date: new Date("2022-12-05T13:30:00"), // Afternoon
                distance: 200,
                speed: 120,
                duration: 8100000, // 2 hours 15 minutes in milliseconds
                maxLeanAngle: 35
            },
            {
                date: new Date("2023-01-15T08:00:00"), // Morning
                distance: 150,
                speed: 110,
                duration: 3600000, // 1 hour in milliseconds
                maxLeanAngle: 32
            },
            {
                date: new Date("2023-02-20T17:45:00"), // Evening
                distance: 250,
                speed: 130,
                duration: 4500000, // 1 hour 15 minutes in milliseconds
                maxLeanAngle: 40
            },
            {
                date: new Date("2023-03-30T20:30:00"), // Evening
                distance: 175,
                speed: 115,
                duration: 5400000, // 1 hour 30 minutes in milliseconds
                maxLeanAngle: 33
            },
            {
                date: new Date("2023-05-12T10:00:00"), // Morning
                distance: 300,
                speed: 125,
                duration: 7200000, // 2 hours in milliseconds
                maxLeanAngle: 42
            },
            {
                date: new Date("2023-07-04T15:00:00"), // Afternoon
                distance: 225,
                speed: 105,
                duration: 5400000, // 1 hour 30 minutes in milliseconds
                maxLeanAngle: 28
            },
            {
                date: new Date("2023-08-16T21:15:00"), // Evening
                distance: 275,
                speed: 140,
                duration: 3600000, // 1 hour in milliseconds
                maxLeanAngle: 38
            },
            {
                date: new Date("2023-09-10T23:00:00"), // Night
                distance: 150,
                speed: 90,
                duration: 4500000, // 1 hour 15 minutes in milliseconds
                maxLeanAngle: 27
            },
            {
                date: new Date("2023-10-02T05:30:00"), // Morning
                distance: 320,
                speed: 135,
                duration: 5400000, // 1 hour 30 minutes in milliseconds
                maxLeanAngle: 45
            }
        ];

        this.#calibrationModal = new Modal({
            title: "Calibration",
            createContent: this.#createCalibrationModalContent.bind(this),
            buttonTitle: "Ready!",
            onButtonClick: this.#onClickModalReady.bind(this),
            onClose: this.#onClickModalClose.bind(this)
        });

        this.#recordButton = this.#createRecordButton();
        root.append(this.#createHeader(), this.#createCardList(sessions), this.#recordButton);

    }


}
