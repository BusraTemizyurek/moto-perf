//full screen modal
class Modal {
    #bootstrapModal = undefined;
    #options = undefined;

    constructor(options) {
        this.#options = options;
    }

    #createModalElement() {
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
        modalTitle.classList.add("modal-title", "fs-5");
        modalTitle.innerText = this.#options.title;

        const closeButton = document.createElement("button");
        closeButton.classList.add("btn-close");
        closeButton.type = "button";
        closeButton.setAttribute("data-bs-dismiss", "modal");
        closeButton.onclick = this.#options.onClose;

        modalHeader.append(modalTitle, closeButton);

        const body = document.createElement("div");
        body.classList.add("modal-body");
        body.append(this.#options.createContent());
        content.append(body);

        const footer = document.createElement("div");
        footer.classList.add("modal-footer");
        content.append(footer);

        const button = document.createElement("button");
        button.classList.add("btn", "btn-success");
        button.type = "button";
        button.innerText = this.#options.buttonTitle;
        button.onclick = this.#options.onButtonClick;
        footer.append(button);

        return modal;
    }

    show() {
        if (!this.#bootstrapModal) {
            this.#bootstrapModal = new bootstrap.Modal(this.#createModalElement());
        }
        this.#bootstrapModal.show();
    }

    hide() {
        if (this.#bootstrapModal) {
            this.#bootstrapModal.hide();
        }
    }
}