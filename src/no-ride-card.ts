export class NoRideCard {
    private readonly _card: HTMLDivElement;

    constructor() {
        const card = document.createElement("div");
        this._card = card;
        card.classList.add("bg-body-tertiary", "my-1", "px-3", "py-2", "no-data-message");

        const noDataMessageTitle = document.createElement("div");
        noDataMessageTitle.innerText = "No Ride Yet!";
        noDataMessageTitle.classList.add("fs-5", "fw-bold", "mb-1");

        const noDataMessage = document.createElement("div");
        noDataMessage.innerText = "Looks like you haven't had a ride yet. Let's start! To record a session click the record button on the bottom right corner!";
        noDataMessage.classList.add("d-flex", "align-items-center");
        card.append(noDataMessageTitle, noDataMessage);
    }

    get element() {
        return this._card;
    }
}