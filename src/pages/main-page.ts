import type { LocationManager } from "../services/location-manager";
import type { OrientationManager } from "../services/orientation-manager";
import type { Router } from "../services/router";
import type { SessionRepository } from "../services/session-repository";
import type { CalibrationModalContent } from "../components/calibration-modal-content";
import type { Page, Session } from "../types";
import type { ButtonMouseEvent, Modal } from "../components/modal";
import { NoRideCard } from "../components/no-ride-card";
import { RideCard } from "../components/ride-card";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import type { WakeLockManager } from "../services/wake-lock-manager";

export class MainPage implements Page {
  private readonly _router: Router;
  private readonly _sessionRepository: SessionRepository;
  private readonly _orientationManager: OrientationManager;
  private readonly _locationManager: LocationManager;
  private _calibrationModalContent: CalibrationModalContent | undefined;
  private _calibrationModal: Modal | undefined;
  private _orientationAccessDeniedModal: Modal | undefined;
  private _recordButton: HTMLElement | undefined;
  private _wakeLockManager: WakeLockManager;

  constructor(
    router: Router,
    sessionRepository: SessionRepository,
    orientationManager: OrientationManager,
    locationManager: LocationManager,
    wakeLockManager: WakeLockManager,
  ) {
    this._router = router;
    this._sessionRepository = sessionRepository;
    this._orientationManager = orientationManager;
    this._locationManager = locationManager;
    this._wakeLockManager = wakeLockManager;

    library.add(faCircle);
  }

  //helper functions
  private createHeader() {
    const head = document.createElement("div");
    head.innerText = "Home";
    head.classList.add(
      "fs-6",
      "fw-bold",
      "bg-body",
      "main-header",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "flex-shrink-0",
    );
    return head;
  }

  private createCardList(sessions: Session[]) {
    const cardList = document.createElement("div");
    cardList.id = "card-list";
    cardList.classList.add(
      "main-cardlist-div",
      "flex-grow",
      "bg-body-secondary",
    );

    if (sessions.length === 0) {
      const noRideCard = new NoRideCard();
      cardList.append(noRideCard.element);
    } else {
      for (const session of sessions) {
        const card = new RideCard(session);
        cardList.append(card.element);
      }
    }

    return cardList;
  }

  private onClickModalClose() {
    this._recordButton?.classList.remove("d-none");
  }

  private async onClickModalReady(ev: ButtonMouseEvent) {
    try {
      await this._wakeLockManager.requestWakeLock();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(`${err.name}, ${err.message}`);
      } else {
        console.log(err);
      }
    }

    ev.target.disabled = true;

    if (this._calibrationModalContent?.watchHandler) {
      this._orientationManager.unwatch(
        this._calibrationModalContent.watchHandler,
      );
    }

    this._calibrationModal?.hideButton();
    this._calibrationModalContent?.showWaitingContent();
    const isLocationPermissionGranted =
      await this._locationManager.requestPermission();

    if (!isLocationPermissionGranted) {
      console.log("denied");
      //permission denied
    } else {
      console.log("granted");
      //permission granted
    }

    this._calibrationModal?.hide();
    this._recordButton?.classList.remove("d-none");
    await this._router.navigate("recording");
  }

  private async onRecordClick() {
    const isOrientationPermissionGranted =
      await this._orientationManager.requestPermission();
    const Modal = await import(
      /* webpackPrefetch: true, webpackChunkName: "calibration-modal" */ "../components/modal"
    ).then((m) => m.Modal);
    if (isOrientationPermissionGranted) {
      const CalibrationModalContent = await import(
        /* webpackPrefetch: true, webpackChunkName: "calibration-modal" */ "../components/calibration-modal-content"
      ).then((m) => m.CalibrationModalContent);

      this._calibrationModal = new Modal({
        title: "Calibration",
        createContent: () => {
          this._calibrationModalContent = new CalibrationModalContent(
            this._orientationManager,
          );
          return this._calibrationModalContent.element;
        },
        buttonTitle: "Ready!",
        onButtonClick: this.onClickModalReady.bind(this),
        onClose: this.onClickModalClose.bind(this),
        isButtonVisible: true,
      });
      this._calibrationModal?.show();
      this._calibrationModalContent?.hideWaitingContent();
    } else {
      this._orientationAccessDeniedModal = new Modal({
        title: "Orientation Access",
        createContent: () => {
          const content = document.createElement("div");
          content.innerText =
            "Please go to your settings and allow app to use your orientation data in order to use this app";
          content.classList.add("text-white");
          return content;
        },
        buttonTitle: "Okay",
        onButtonClick: () => {
          this._router.navigate("main");
        },
        onClose: () => {
          this._router.navigate("main");
        },
        isButtonVisible: false,
      });
      this._orientationAccessDeniedModal.show();
      this._calibrationModalContent?.hideWaitingContent();
    }
    this._recordButton?.classList.add("d-none");
  }

  private createRecordButton() {
    const circleIcon = icon(
      {
        iconName: faCircle.iconName,
        prefix: faCircle.prefix,
      },
      {
        classes: ["fa-xl"],
        styles: {
          color: "d10510",
        },
      },
    );

    const rec = document.createElement("button");
    rec.id = "record-button";
    rec.type = "button";
    rec.appendChild(circleIcon.node[0]);
    rec.classList.add(
      "shadow-sm",
      "main-rec-button",
      "btn",
      "btn-outline-dark",
      "bg-secondary-subtle",
      "border",
      "border-4",
      "border-black",
      "rounded-circle",
    );
    rec.onclick = this.onRecordClick.bind(this);

    return rec;
  }

  //drawing the page
  render(root: HTMLElement) {
    this._recordButton = this.createRecordButton();

    root.append(
      this.createHeader(),
      this.createCardList(this._sessionRepository.sessions),
      this._recordButton,
    );
  }
}
