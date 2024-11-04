function convertTimeToDayDivision(date) {
    const timeRange = date.getHours();
    let dayDivision = undefined;

    if (timeRange >= 5 && timeRange <= 11) {
        dayDivision = "Morning Ride";
    } else if (timeRange >= 12 && timeRange <= 16) {
        dayDivision = "Afternoon Ride";
    } else if (timeRange >= 17 && timeRange <= 21) {
        dayDivision = "Evening Ride";
    } else {
        dayDivision = "Night Ride";
    }

    return dayDivision;
}

// ex: "November 3, 2024 at 6:42 pm."
function formatDate(date) {
    return date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

function setAttributes(element, attributes) {
    for (const attribute of attributes) {
        element.setAttribute(attribute[0], attribute[1]);
    }
}