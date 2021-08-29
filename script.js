let popupForm = document.querySelector(".popup");
let editProfile = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");
let formContent = document.querySelector(".popup__form");
let nameProfile = document.querySelector(".profile__name");
let proffesionProfile = document.querySelector(".profile__proffesion");
let nameInput = document.querySelector(".popup__text-input_content_name");
let proffesionInput = document.querySelector(".popup__text-input_content_profession");

function editButton() {
    popupForm.classList.remove("popup_disable");
    nameInput.value = nameProfile.textContent;
    proffesionInput.value = proffesionProfile.textContent;
}

function closePopup() {
    popupForm.classList.add("popup_disable");
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    proffesionProfile.textContent = proffesionInput.value;
    closePopup();
}

editProfile.addEventListener('click', editButton);
closeButton.addEventListener('click', closePopup);
formContent.addEventListener('submit', handleFormSubmit);