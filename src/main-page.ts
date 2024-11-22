import { Popover } from "bootstrap";
import type { LocationManager } from "./location-manager";
import type { OrientationManager } from "./orientation-manager";
import type { Router } from "./router";
import type { SessionRepository } from "./session-repository";
import type { CalibrationModalContent } from "./calibration-modal-content";
import type { Page, Session } from "./types";
import type { ButtonMouseEvent, Modal } from "./modal";
import { NoRideCard } from "./no-ride-card";
import { RideCard } from "./ride-card";
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import type { WakeLockManager } from "./wake-lock-manager";

export class MainPage implements Page {
    private readonly _router: Router;
    private readonly _sessionRepository: SessionRepository;
    private readonly _orientationManager: OrientationManager;
    private readonly _locationManager: LocationManager;
    private _calibrationModalContent: CalibrationModalContent | undefined;
    private _calibrationModal: Modal | undefined;
    private _recordButton: HTMLElement | undefined;
    private _wakeLockManager: WakeLockManager;


    constructor(router: Router, sessionRepository: SessionRepository, orientationManager: OrientationManager, locationManager: LocationManager, wakeLockManager: WakeLockManager) {
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
        head.classList.add("fs-6", "fw-bold", "bg-body", "main-header", "d-flex", "justify-content-center", "align-items-center", "flex-shrink-0");
        return head;
    }

    private createCardList(sessions: Session[]) {
        const cardList = document.createElement("div");
        cardList.id = "card-list";
        cardList.classList.add("main-cardlist-div", "flex-grow", "bg-body-secondary");

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
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                console.log(`${err.name}, ${err.message}`);
            } else {
                console.log(err);
            }
        }

        ev.target.disabled = true;
        //popover content
        const popoverHeading = document.createElement("div");
        popoverHeading.innerText = "Remember!";

        const popoverBody = document.createElement("div");
        const popoverBodyContent = document.createElement("div");
        popoverBodyContent.innerText = "Enable location access to unlock ride analysis and map features. Without location, only lean angle data will be available."

        const popoverButton = document.createElement("button");
        popoverButton.innerText = "Got it!"
        popoverButton.classList.add("btn", "btn-primary", "mx-auto");
        popoverBody.append(popoverBodyContent, popoverButton);

        const popover = new Popover(ev.target, {
            html: true,
            title: popoverHeading,
            content: popoverBody,
            trigger: "click"
        })
        popover.show();

        popoverButton.onclick = async () => {
            popover.hide();
            if (this._calibrationModalContent?.watchHandler) {
                this._orientationManager.unwatch(this._calibrationModalContent.watchHandler);
            }

            this._calibrationModal?.hideButton();
            this._calibrationModalContent?.showWaitingContent();
            const isLocationPermissionGranted = await this._locationManager.requestPermission();

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
    }

    private async onRecordClick() {
        const isOrientationPermissionGranted = await this._orientationManager.requestPermission();
        if (isOrientationPermissionGranted) {
            const Modal = await import(/* webpackPrefetch: true, webpackChunkName: "calibration-modal" */ './modal').then(m => m.Modal);
            const CalibrationModalContent = await import(/* webpackPrefetch: true, webpackChunkName: "calibration-modal" */ './calibration-modal-content').then(m => m.CalibrationModalContent);

            this._calibrationModal = new Modal({
                title: "Calibration",
                createContent: () => {
                    this._calibrationModalContent = new CalibrationModalContent(this._orientationManager);
                    return this._calibrationModalContent.element;
                },
                buttonTitle: "Ready!",
                onButtonClick: this.onClickModalReady.bind(this),
                onClose: this.onClickModalClose.bind(this),
                isButtonVisible: true
            });
            this._calibrationModal?.show();
            this._calibrationModalContent?.hideWaitingContent();

            this._recordButton?.classList.add("d-none");

        } else {
            // TODO: access blocked
        }
    }

    private createRecordButton() {
        const circleIcon = icon(
            {
                iconName: faCircle.iconName,
                prefix: faCircle.prefix
            },
            {
                classes: ["fa-xl"],
                styles: {
                    color: 'd10510'
                }
            }
        );

        const rec = document.createElement("button");
        rec.id = "record-button";
        rec.type = "button";
        rec.appendChild(circleIcon.node[0]);
        rec.classList.add("shadow-sm", "main-rec-button", "btn", "btn-outline-dark", "bg-secondary-subtle", "border", "border-4", "border-black", "rounded-circle");
        rec.onclick = this.onRecordClick;

        return rec;
    }

    //drawing the page
    render(root: HTMLElement) {
        this._recordButton = this.createRecordButton();

        root.append(this.createHeader(), this.createCardList(this._sessionRepository.sessions), this._recordButton);
    }
}
