class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
        this._inputList = Array.from(form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = form.querySelector(this._settings.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners();
        this._toggleButtonState();
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', '');
        } else {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', '');
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.textContent = "";
    }

    resetFormValidation() {
        const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
        this._toggleButtonState();
        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
}

export { FormValidator };