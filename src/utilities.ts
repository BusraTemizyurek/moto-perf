export function convertTimeToDayDivision(date: Date) {
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

export function formatDate(date: Date) {
    return date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

export function setAttributes(element: HTMLElement, attributes: Record<string, string> | [string, string][]) {
    const attributeArray = Array.isArray(attributes) ? attributes : Object.entries(attributes);
    for (const [key, value] of attributeArray) {
        element.setAttribute(key, value);
    }
}

export function convertTimeStampToTime(elapsedTime: number) {
    const sec = elapsedTime / 1000;

    let seconds = Math.floor(sec % 60).toString().padStart(2, "0");
    let minutes = Math.floor((sec / 60) % 60).toString().padStart(2, "0");
    let hours = Math.floor(sec / (60 * 60)).toString().padStart(2, "0");

    const time = {
        hours,
        minutes,
        seconds
    }

    return time;
}

export function formatDuration(time: number) {
    const sec = time / 1000;

    const hours = Math.floor(sec / (60 * 60));
    const h = hours > 0 ? `${hours} h` : "";
    const minutes = Math.floor((sec / 60) % 60);
    const min = minutes > 0 ? `${minutes} min` : "";

    return hours <= 0 && minutes <= 0 ? `0` : `${h} ${min}`;
}
