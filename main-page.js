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

    #onRecClick() {
        this.#router.navigate("recording");
    }

    #createButton() {
        const rec = document.createElement("button");
        rec.innerHTML = '<i class="fa-regular fa-circle-dot fa-lg" style="color: #d91102;"></i>';
        rec.classList.add("main-rec-button", "fs-1", "bg-body", "rounded-circle");
        rec.onclick = this.#onRecClick.bind(this);

        return rec;
    }


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


        root.append(this.#createHeader(), this.#createCardList(sessions), this.#createButton());
    }


}
