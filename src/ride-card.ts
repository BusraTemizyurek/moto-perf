import type { Session } from "./types";
import { convertTimeToDayDivision, formatDate, formatDuration } from "./utilities";

export class RideCard {
    private _cardDiv: HTMLDivElement;

    constructor(session: Session) {
        const cardDiv = document.createElement("div");
        this._cardDiv = cardDiv;

        const title = document.createElement("div");
        const titleHead = document.createElement("div");
        titleHead.innerText = convertTimeToDayDivision(session.date);
        titleHead.classList.add("fs-5", "fw-bold");
        const titleDate = document.createElement("div");
        titleDate.innerText = formatDate(session.date);
        titleDate.classList.add("fs-7");

        title.append(titleHead, titleDate);

        const data = document.createElement("div");

        const dataDistanceDiv = this.createDataPair("Distance", `${session.distance} km`);
        const dataLeanAngleDiv = this.createDataPair("Max Lean Angle", `${session.maxLeanAngle}${String.fromCharCode(176)}`);
        const dataDurationDiv = this.createDataPair("Time", formatDuration(session.duration));

        data.append(dataDistanceDiv, dataLeanAngleDiv, dataDurationDiv);
        data.classList.add("d-flex", "gap-4", "mt-3");

        cardDiv.append(title, data);
        cardDiv.classList.add("bg-body-tertiary", "my-1", "px-3", "py-2");
    }

    private createDataPair(title: string, value: string) {
        const container = document.createElement("div");

        const titleDiv = document.createElement("div");
        titleDiv.innerText = title;
        titleDiv.classList.add("fs-7")

        const valueDiv = document.createElement("div");
        valueDiv.innerText = value;
        valueDiv.classList.add("fw-bold");

        container.append(titleDiv, valueDiv);
        container.classList.add("d-flex", "flex-column");

        return container;
    }

    get element() {
        return this._cardDiv;
    }
}