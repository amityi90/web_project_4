import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmission, resetForm) {
        super(popupSelector);
        this._formSubmission = formSubmission;
        this._resetForm = resetForm;
    }

    getInputValues() {
        this._inputList = this._popupElement.querySelectorAll(".popup__text-input");
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
        this.getInputValues();
        this._inputList[0].value = "";
        this._inputList[1].value = "";
    }
}