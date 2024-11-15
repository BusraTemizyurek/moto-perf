interface Time {
    hours: string,
    minutes: string,
    seconds: string
}

function convertTimeToDayDivision(date: Date) {
    const timeRange = date.getHours();

    if (timeRange >= 5 && timeRange <= 11) {
        return "Morning Ride";
    } else if (timeRange >= 12 && timeRange <= 16) {
        return "Afternoon Ride";
    } else if (timeRange >= 17 && timeRange <= 21) {
        return "Evening Ride";
    }
    return "Night Ride";
}

function formatDate(date: Date) {
    return date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

function setAttributes(element: HTMLElement, attributes: Record<string, string> | [string, string][]) {
    const attributeArray = Array.isArray(attributes) ? attributes : Object.entries(attributes);
    for (const [key, value] of attributeArray) {
        element.setAttribute(key, value);
    }
}

function convertTimeStampToTime(elapsedTime: number) {
    const sec = elapsedTime / 1000;

    let seconds = Math.floor(sec % 60).toString().padStart(2, "0");
    let minutes = Math.floor((sec / 60) % 60).toString().padStart(2, "0");
    let hours = Math.floor(sec / (60 * 60)).toString().padStart(2, "0");

    const time: Time = {
        hours,
        minutes,
        seconds
    }

    return time;
}

function formatDuration(time: Time) {
    const hours = `${time.hours === "00" ? "" : time.hours[0] === "0" ? time.hours[1] + " h" : time.hours + " h"}`;
    const minutes = `${time.minutes === "00" ? "0 min" : time.minutes[0] === "0" ? time.minutes[1] + " min" : time.minutes + " min"}`;

    return `${hours} ${minutes}`;
}
