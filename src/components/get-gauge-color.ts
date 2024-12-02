export function getGaugeColor(angle: number) {
  const adjustedLeanAngle = Math.abs(angle);
  if (adjustedLeanAngle === 0) {
    return "white";
  }

  if (adjustedLeanAngle < 45) {
    return "lightGreen";
  }

  if (adjustedLeanAngle >= 45 && adjustedLeanAngle <= 60) {
    return "darkOrange";
  }

  return "red";
}
