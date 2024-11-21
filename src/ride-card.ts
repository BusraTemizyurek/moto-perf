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
        titleDate.classList.add("d-flex", "flex-row", "gap-1", "align-items-center");
        const dateIcon = document.createElement("i");
        dateIcon.classList.add("bi", "bi-calendar", "fs-7");
        const titleDateText = document.createElement("div");
        titleDateText.innerText = formatDate(session.date);
        titleDateText.classList.add("fs-7");

        titleDate.append(dateIcon, titleDateText);

        title.append(titleHead, titleDate);

        const data = document.createElement("div");

        const dataDurationDiv = this.createDataPair("Time", formatDuration(session.duration));
        const dataLeanAngleDiv = this.createDataPair("Max Lean Angle", `${session.maxLeanAngle}${String.fromCharCode(176)}`);

        data.append(dataDurationDiv, dataLeanAngleDiv);
        data.classList.add("d-flex", "gap-4", "mt-3");

        if (session.distance !== 0) {
            const dataDistanceDiv = this.createDataPair("Distance", `${session.distance} km`);
            data.append(dataDistanceDiv);
        }

        if (session.speed !== 0) {
            const dataSpeedDiv = this.createDataPair("Speed", `${session.speed} km/h`);
            data.append(dataSpeedDiv);
        }

        cardDiv.append(title, data);
        cardDiv.classList.add("bg-body-tertiary", "my-1", "px-3", "py-2");
    }

    private createDataPair(title: string, value: string) {
        const container = document.createElement("div");

        const titleDiv = document.createElement("div");
        titleDiv.innerText = title;
        titleDiv.classList.add("fs-7", "text-nowrap")

        const valueDiv = document.createElement("div");
        valueDiv.innerText = value;
        valueDiv.classList.add("fw-bold", "text-nowrap");

        container.append(titleDiv, valueDiv);
        container.classList.add("d-flex", "flex-column", "main-data-width");

        return container;
    }

    get element() {
        return this._cardDiv;
    }
}