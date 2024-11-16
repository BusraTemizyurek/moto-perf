export function getGaugeColor(angle: number) {
    const adjustedLeanAngle = Math.abs(angle);

    if (adjustedLeanAngle < 45) {
        return "lightGreen";
    } else if (adjustedLeanAngle >= 45 && adjustedLeanAngle <= 60) {
        return "darkOrange";
    }

    return "red";
}