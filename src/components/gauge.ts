export class Gauge {
  private readonly _bgcolor: string = "#222";
  private readonly _W: number;
  private readonly _H: number;
  private readonly _radius: number;
  private readonly _ctx: CanvasRenderingContext2D;
  private _container: HTMLElement;

  constructor(
    container: HTMLElement,
    canvas: HTMLCanvasElement,
    backgroundColor: string,
  ) {
    this._container = container;

    this._bgcolor = backgroundColor ?? this._bgcolor;
    const temp = canvas.getContext("2d");
    if (!temp) {
      throw new Error("No canvas available");
    }
    this._ctx = temp;
    this._ctx.lineWidth = 30;

    this._W = canvas.width;
    this._H = canvas.height;

    this._radius = Math.min(this._H, this._W / 2) - this._ctx.lineWidth / 2;
  }

  private drawHalfCircle() {
    //Background 360 degree arc
    this._ctx.beginPath();
    this._ctx.strokeStyle = this._bgcolor;

    this._ctx.arc(this._W / 2, this._H, this._radius, Math.PI, 0, false); //you can see the arc now
    this._ctx.stroke();
  }

  private toRadian(degree: number) {
    return (degree * Math.PI) / 180;
  }

  private drawIndicator(angle: number, color: string) {
    const adjustedAngle = angle > 90 ? 90 : angle < -90 ? -90 : angle;

    this._ctx.beginPath();
    this._ctx.strokeStyle = color;

    const startRadian =
      adjustedAngle >= 0
        ? this.toRadian(-90)
        : this.toRadian(-90 + adjustedAngle);
    const endRadian =
      adjustedAngle >= 0
        ? this.toRadian(adjustedAngle - 90)
        : this.toRadian(-90);
    this._ctx.arc(
      this._W / 2,
      this._H,
      this._radius,
      startRadian,
      endRadian,
      false,
    );
    this._ctx.stroke();
  }

  private _degreeText: HTMLDivElement | undefined = undefined;
  private createAngleText() {
    const degree = document.createElement("div");
    degree.classList.add("z-index", "position-absolute", "fs-big-1");

    return degree;
  }

  draw(angle: number, color = "lightgreen") {
    //Clear the canvas everytime a chart is drawn
    this._ctx.clearRect(0, 0, this._W, this._H);

    this.drawHalfCircle();

    this.drawIndicator(angle, color);

    if (!this._degreeText) {
      this._degreeText = this.createAngleText();
      this._container.append(this._degreeText);
    }

    this._container.classList.add(
      "d-flex",
      "flex-column",
      "justify-content-end",
      "align-items-center",
    );
    const adjustedAngle = angle > 90 ? 90 : angle < -90 ? -90 : angle;
    this._degreeText.innerText = `${adjustedAngle}`;
    this._degreeText.style.color = color;
  }
}
