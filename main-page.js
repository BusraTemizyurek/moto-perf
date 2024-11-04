class MainPage {
    #router = undefined;
    constructor(router) {
        this.#router = router;
    }

    //helper functions
    #createHeader() {
        const head = document.createElement("div");
        head.innerText = "MotoPerf";
        head.classList.add("fs-2", "bg-dark", "text-white", "main-header", "d-flex", "justify-content-center", "align-items-center", "flex-shrink-0");

        return head;
    }

    #createCardList(sessions) {
        const cardList = document.createElement("div");
        cardList.id = "card-list";
        cardList.classList.add("main-cardlist-div", "flex-grow", "bg-secondary");

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
        rec.innerHTML = '<i class="fa-regular fa-circle-dot fa-2xl" style="color: #d91102;"></i>';
        rec.classList.add("main-rec-button", "fs-1", "bg-subtle", "rounded-circle");
        rec.onclick = this.#onRecClick.bind(this);

        return rec;
    }


    //drawing the page
    render(root) {
        const sessions = [
            {
                date: new Date(),
                distance: 100,
                speed: 100,
                duration: 9255,
                maxLeanAngle: 30
            },
            {
                date: new Date("2022-12-05"),
                distance: 200,
                speed: 120,
                duration: 9684,
                maxLeanAngle: 35
            },
            {
                date: new Date("2023-01-15"),
                distance: 150,
                speed: 110,
                duration: 7540,
                maxLeanAngle: 32
            },
            {
                date: new Date("2023-02-20"),
                distance: 250,
                speed: 130,
                duration: 10020,
                maxLeanAngle: 40
            },
            {
                date: new Date("2023-03-30"),
                distance: 175,
                speed: 115,
                duration: 8425,
                maxLeanAngle: 33
            },
            {
                date: new Date("2023-05-12"),
                distance: 300,
                speed: 125,
                duration: 11800,
                maxLeanAngle: 42
            },
            {
                date: new Date("2023-07-04"),
                distance: 225,
                speed: 105,
                duration: 9200,
                maxLeanAngle: 28
            },
            {
                date: new Date("2023-08-16"),
                distance: 275,
                speed: 140,
                duration: 10250,
                maxLeanAngle: 38
            },
            {
                date: new Date("2023-09-10"),
                distance: 150,
                speed: 90,
                duration: 7500,
                maxLeanAngle: 27
            },
            {
                date: new Date("2023-10-02"),
                distance: 320,
                speed: 135,
                duration: 12150,
                maxLeanAngle: 45
            }
        ];

        root.append(this.#createHeader(), this.#createCardList(sessions), this.#createButton());
    }


}
