const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__text-input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_inactive",
    inputErrorClass: "popup__text-input_type_error",
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement, settings) {
    const {inactiveButtonClass} = settings;
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled', '');
    }
}

function showInputError(formElement, inputElement, errorMessage, settings) {
    const { inputErrorClass } = settings;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, settings) {
    const { inputErrorClass } = settings;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
}

function isValid(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
}

function setEventListeners(formElement, settings) {
    const { inputSelector, submitButtonSelector } = settings;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            isValid(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
}

function enableValidation(settings) {
    const { formSelector } = settings;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, settings);
    });
}

function resetFormValidation(formElement, settings) {
    const { inputSelector, submitButtonSelector } = settings;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings)
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, settings);
    });
  }

enableValidation(config);
