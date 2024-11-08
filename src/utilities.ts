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

// ex: "November 3, 2024 at 6:42 pm."
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
