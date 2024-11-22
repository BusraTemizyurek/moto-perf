import { Gauge } from "./gauge";
import { getGaugeColor } from "./get-gauge-color";
import type {
  OrientationManager,
  OrientationWatcher,
} from "./orientation-manager";
import { setAttributes } from "./utilities";

export class CalibrationModalContent {
  private readonly _modalContent: HTMLElement;
  private readonly _waitingContent: HTMLElement;
  private readonly _canvas: HTMLCanvasElement;
  private readonly _orientationManager: OrientationManager;
  private readonly _gauge: Gauge;
  private _watchHandler: OrientationWatcher | undefined;

  constructor(orientationManager: OrientationManager) {
    this._orientationManager = orientationManager;

    const modalContent = document.createElement("div");
    modalContent.classList.add(
      "d-flex",
      "flex-grow",
      "h-100",
      "justify-content-center",
      "align-items-center",
    );
    this._modalContent = modalContent;

    //waiting page
    const waitingPage = document.createElement("div");
    this._waitingContent = waitingPage;
    const spinner = document.createElement("div");
    spinner.classList.add("spinner-border", "text-light");
    spinner.setAttribute("role", "status");
    const hiddenLoading = document.createElement("span");
    hiddenLoading.classList.add("visually-hidden");
    spinner.append(hiddenLoading);
    waitingPage.append(spinner);

    const messageDiv = document.createElement("div");
    messageDiv.innerText = "Please hold on while we grant access.";
    messageDiv.classList.add("mt-3", "text-white", "text-center");
    waitingPage.append(messageDiv);
    waitingPage.classList.add(
      "d-flex",
      "flex-column",
      "justify-content-center",
      "align-items-center",
    );

    //calibration page
    const canvas = document.createElement("canvas");
    this._canvas = canvas;
    canvas.classList.add("mb-5", "d-none");
    canvas.id = "lean-angle";
    setAttributes(canvas, {
      width: "380",
      height: "180",
    });
    this._gauge = new Gauge(canvas, "#4d5154");

    modalContent.append(waitingPage, canvas);
  }

  onOrientationUpdate(ev: DeviceOrientationEvent) {
    if (ev.gamma) {
      const angle = Math.ceil(ev.gamma);
      this._gauge.draw(angle, getGaugeColor(angle));
    }
  }

  hideWaitingContent() {
    this._waitingContent.classList.add("d-none");
    this._canvas.classList.remove("d-none");

    //to start a gauge with angle 0 even orientation is closed at first.
    this._gauge.draw(0, getGaugeColor(0));
    const watchHandler = this._orientationManager.watch(
      this.onOrientationUpdate.bind(this),
    );
    this._watchHandler = watchHandler;
  }

  get watchHandler() {
    return this._watchHandler;
  }

  showWaitingContent() {
    this._waitingContent.classList.remove("d-none");
    this._canvas.classList.add("d-none");
  }

  get element() {
    return this._modalContent;
  }
}
