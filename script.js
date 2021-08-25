let popupForm = document.querySelector(".form");
let editProfile = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".form__close-button");
let saveButton = document.querySelector(".form__save-button");
let nameProfile = document.querySelector(".profile__name");
let proffesionProfile = document.querySelector(".profile__proffesion");
let nameInput = document.querySelector(".form__text-input_content_name");
let proffesionInput = document.querySelector(".form__text-input_content_profession");

function editButton() {
    popupForm.classList.remove("form_disable");
    nameInput.value = nameProfile.textContent;
    proffesionInput.value = proffesionProfile.textContent;
}

function closePopup() {
    popupForm.classList.add("form_disable");
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    proffesionProfile.textContent = proffesionInput.value;
    closePopup();
}

editProfile.addEventListener('click', editButton);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', handleFormSubmit);