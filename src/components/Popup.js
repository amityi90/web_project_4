export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.remove("popup_disable");
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.add("popup_disable");
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.querySelector(".popup__close-button").addEventListener('click', evt => this.close());
        this._popupElement.addEventListener('click', evt => {
            if (Array.from(evt.target.classList).includes("popup")) {
                this.close();
            }
        });
    }
}