class Gauge {
    private readonly _bgcolor: string = "#222";
    private readonly _W: number;
    private readonly _H: number;
    private readonly _radius: number;
    private readonly _ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, backgroundColor: string) {
        this._bgcolor = backgroundColor ?? this._bgcolor;
        const temp = canvas.getContext("2d");
        if (!temp) {
            throw new Error("No canvas available");
        }
        this._ctx = temp;
        this._ctx.lineWidth = 30;

        this._W = canvas.width;
        this._H = canvas.height;

        this._radius = Math.min(this._H, this._W / 2) - (this._ctx.lineWidth / 2);
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

        const startRadian = adjustedAngle >= 0 ? this.toRadian(-90) : this.toRadian(-90 + adjustedAngle);
        const endRadian = adjustedAngle >= 0 ? this.toRadian(adjustedAngle - 90) : this.toRadian(-90);
        this._ctx.arc(this._W / 2, this._H, this._radius, startRadian, endRadian, false);
        this._ctx.stroke()
    }

    private drawAngleText(angle: number) {
        const adjustedAngle = angle > 90 ? 90 : angle < -90 ? -90 : angle;

        let x = this._W / 2;
        let y = this._H - 5;

        if (angle < 0) {
            x -= 20;
            console.log("negative");

            if (angle > -10) {
                console.log("1 digit number");
                x -= 18;
            } else {
                console.log("2 digit number");
                x -= 35;
            }
        }
        else if (angle > 0) {
            console.log("positive");
            if (angle > 9) {
                console.log("2 digit number");
                x -= 35;
            } else {
                console.log("1 digit number");
                x -= 10;
            }
        }
        else {
            console.log("number is 0");
            x -= 18;
        }

        this._ctx.font = "60px serif";
        this._ctx.lineWidth = 6;

        for (let i = 0; i < angle.toString().length; i++) {
            const letter = angle.toString()[i];
            this._ctx.strokeText(letter, x, y, this._W - 30);
            x += this._ctx.measureText(letter).width + 6;
        }

    }


    draw(angle: number, color = "lightgreen") {
        //Clear the canvas everytime a chart is drawn
        this._ctx.clearRect(0, 0, this._W, this._H);

        this.drawHalfCircle();

        this.drawIndicator(angle, color);
        this.drawAngleText(angle);
    };

}

// window.onload = function () {
//     // Caller
//     const canvas = document.getElementById("canvas");
//     const gauge = new Gauge(canvas);
//     gauge.draw(-9);
// }
