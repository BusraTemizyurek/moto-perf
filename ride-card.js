class RideCard {
    #cardDiv = undefined;

    constructor(session) {
        const cardDiv = document.createElement("div");
        this.#cardDiv = cardDiv;

        const title = document.createElement("div");
        const titleHead = document.createElement("div");
        titleHead.innerText = convertTimeToDayDivision(session.date);
        titleHead.classList.add("fs-5", "fw-bold");
        const titleDate = document.createElement("div");
        titleDate.innerText = formatDate(session.date);
        titleDate.classList.add("fs-7");

        title.append(titleHead, titleDate);


        const data = document.createElement("div");

        const dataDistanceDiv = this.#createDataPair("Distance", `${session.distance} km`);
        const dataLeanAngleDiv = this.#createDataPair("Max Lean Angle", `${session.maxLeanAngle}${String.fromCharCode(176)}`);
        const dataDurationDiv = this.#createDataPair("Time", this.#makeTimespanReadable(session.duration));

        data.append(dataDistanceDiv, dataLeanAngleDiv, dataDurationDiv);
        data.classList.add("d-flex", "gap-4", "mt-3");

        //const map = document.createElement("div");
        cardDiv.append(title, data);
        cardDiv.classList.add("bg-body-tertiary", "m-1", "px-3", "py-2");
    }

    #makeTimespanReadable(timespan) {
        const durationMinutes = Math.floor(timespan / (1000 * 60)); // converting timespan(duration in milliseconds) to minutes

        const hours = Math.floor(durationMinutes / 60); // converting durationMinutes to hours
        const minutes = durationMinutes % 60;

        const hoursString = `${hours} h`;
        const minString = minutes > 0 ? `${minutes} min` : "";

        return `${hoursString} ${minString}`;;
    }

    #createDataPair(title, value) {
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
        return this.#cardDiv;
    }

}