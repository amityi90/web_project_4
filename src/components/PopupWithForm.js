import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit, resetForm) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._resetForm = resetForm;
        this._inputList = this._popupElement.querySelectorAll(".popup__text-input");
    }

    getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.querySelector(".popup__form").addEventListener('submit', evt => this._handleSubmit(evt));
    }

    close() {
        super.close();
        this._popupElement.querySelector(".popup__form").reset();
    }

    setInputValues(values) {
        this._inputList.forEach(input => {
            if (values[input.name]) {
                input.value = values[input.name];
            }
        });

    }

    getFormElement() {
        return document.querySelector(this._popupSelector);
    }

    setCardId(cardId) {
        this._cardId = cardId;
    }

    getCardId() {
        return this._cardId;
    }
}