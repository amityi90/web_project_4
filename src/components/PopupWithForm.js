import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmission, resetForm) {
        super(popupSelector);
        this._formSubmission = formSubmission;
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
        this._popupElement.querySelector(".popup__form").addEventListener('submit', evt => this._formSubmission(evt));
    }

    close() {
        super.close();
        this._popupElement.querySelector(".popup__form").reset();
    }

    setInputValues(values) {
        this._inputList.forEach(input => {
            if(values[input.name]) {
                input.value = values[input.name];
            }
        });

    }
}