type HTMLMouseEvent<T extends HTMLElement> = Omit<MouseEvent, 'target'> & {
    target: T
};

type ButtonMouseEvent = HTMLMouseEvent<HTMLButtonElement>;

interface ModalOptions {
    title: string,
    onClose: () => void,
    createContent: () => HTMLElement,
    buttonTitle: string,
    onButtonClick: (ev: ButtonMouseEvent) => void,
    isButtonVisible: boolean
}

//full screen modal
class Modal {
    private _bootstrapModal: bootstrap.Modal | undefined;
    private readonly _options: ModalOptions;
    private _button: HTMLElement | undefined;

    constructor(options: ModalOptions) {
        this._options = options;
    }

    private createModalElement() {
        const modal = document.createElement("div");

        modal.classList.add("modal", "fade");
        modal.setAttribute("tabindex", "-1");

        const modalDialog = document.createElement("div");
        modalDialog.classList.add("modal-dialog", "modal-fullscreen-sm-down");
        modal.append(modalDialog);

        const content = document.createElement("div");
        content.classList.add("modal-content");
        modalDialog.append(content);

        const modalHeader = document.createElement("div");
        modalHeader.classList.add("modal-header");
        content.append(modalHeader);

        const modalTitle = document.createElement("h1");
        modalTitle.classList.add("modal-title", "fs-5", "text-white");
        modalTitle.innerText = this._options.title;

        const closeButton = document.createElement("button");
        closeButton.classList.add("btn-close");
        closeButton.type = "button";
        closeButton.setAttribute("data-bs-dismiss", "modal");
        closeButton.onclick = this._options.onClose;

        modalHeader.append(modalTitle, closeButton);

        const body = document.createElement("div");
        body.classList.add("modal-body");
        body.append(this._options.createContent());
        content.append(body);

        const footer = document.createElement("div");
        footer.classList.add("modal-footer");
        content.append(footer);

        const button = document.createElement("button");
        this._button = button;
        button.onclick = (ev) => {
            this._options.onButtonClick(ev as ButtonMouseEvent);
        }
        if (!this._options.isButtonVisible) {
            button.classList.add("d-none");
        }
        button.classList.add("btn", "btn-success");
        button.type = "button";
        button.innerText = this._options.buttonTitle;
        footer.append(button);

        return modal;
    }

    showButton() {
        this._options.isButtonVisible = true;
        if (this._button) {
            this._button.classList.remove("d-none");
        }
    }

    hideButton() {
        this._options.isButtonVisible = false;
        if (this._button) {
            this._button.classList.add("d-none");
        }
    }

    show() {
        if (!this._bootstrapModal) {
            this._bootstrapModal = new window.bootstrap.Modal(this.createModalElement());
        }
        this._bootstrapModal.show();
    }

    hide() {
        if (this._bootstrapModal) {
            this._bootstrapModal.hide();
        }
    }
}