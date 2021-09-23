import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__text-input_type_error",
};
const popupFormProfile = document.querySelector(".popup_content_profile-edit");
const editProfile = document.querySelector(".profile__edit-button");
const closeButtonProfile = popupFormProfile.querySelector(".popup__close-button");
const formContentProfile = popupFormProfile.querySelector(".popup__form");
const nameProfile = document.querySelector(".profile__name");
const proffesionProfile = document.querySelector(".profile__proffesion");
const nameInput = popupFormProfile.querySelector(".popup__text-input_content_name");
const proffesionInput = popupFormProfile.querySelector(".popup__text-input_content_profession");
const addPlaceButton = document.querySelector(".profile__add-button");
const popupFormPlace = document.querySelector(".popup_content_add-place");
const closeButtonPlace = popupFormPlace.querySelector(".popup__close-button");
const formContentPlace = popupFormPlace.querySelector(".popup__form");
const placeNameInput = popupFormPlace.querySelector(".popup__text-input_content_place-name");
const placeLinkInput = popupFormPlace.querySelector(".popup__text-input_content_link");
const popupBigScreenImage = document.querySelector(".popup_content_big-screen-image");
const closeButtonImage = popupBigScreenImage.querySelector(".popup__close-button");
const cardsSection = document.querySelector(".cards");
let openedPopup = null;
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

const profileFormValidator = new FormValidator(config, formContentProfile);
const PlaceFormValidator = new FormValidator(config, formContentPlace);
profileFormValidator.enableValidation();
PlaceFormValidator.enableValidation();

function editButton() {
  openPopup(popupFormProfile);
  nameInput.value = nameProfile.textContent;
  proffesionInput.value = proffesionProfile.textContent;
  profileFormValidator.resetFormValidation();
}

function addPlace() {
  openPopup(popupFormPlace);
  placeNameInput.value = "";
  placeLinkInput.value = "";
  PlaceFormValidator.resetFormValidation();
}

const closeByEsc = function (evt) {
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

function closePopup(popup) {
  popup.classList.add("popup_disable");
  document.removeEventListener('keydown', closeByEsc);
}

function openPopup(popup) {
  openedPopup = popup;
  popup.classList.remove("popup_disable");
  document.addEventListener('keydown', closeByEsc);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  proffesionProfile.textContent = proffesionInput.value;
  closePopup(popupFormProfile);
}

function addCard(card) {
  cardsSection.prepend(creatCard(card));
}

function creatCard(card) {
  card.template = "#card";
  const newCard = new Card(card, openBigScreenImage);
  return newCard.generateCard();
}

function handlePlaceAdd(evt) {
  evt.preventDefault();
  const card = {};
  card.name = placeNameInput.value;
  card.link = placeLinkInput.value;
  addCard(card);
  closePopup(popupFormPlace);
}

function openBigScreenImage(evt) {
  popupBigScreenImage.querySelector(".big-screen-image__image").src = evt.target.src;
  popupBigScreenImage.querySelector(".big-screen-image__name").textContent = evt.target.closest(".card__image-container").nextElementSibling.firstElementChild.textContent;
  openPopup(popupBigScreenImage);
}

function closeFromLayout(evt, popup) {
  if (Array.from(evt.target.classList).includes("popup")) {
    closePopup(popup);
  }
}

initialCards.forEach(card => addCard(card));
editProfile.addEventListener('click', editButton);
addPlaceButton.addEventListener('click', addPlace);
closeButtonProfile.addEventListener('click', evt => closePopup(popupFormProfile));
closeButtonPlace.addEventListener('click', evt => closePopup(popupFormPlace));
formContentProfile.addEventListener('submit', evt => handleFormSubmit(evt));
formContentPlace.addEventListener('submit', evt => handlePlaceAdd(evt));
closeButtonImage.addEventListener('click', evt => closePopup(popupBigScreenImage));
popupFormProfile.addEventListener('click', evt => closeFromLayout(evt, popupFormProfile));
popupFormPlace.addEventListener('click', evt => closeFromLayout(evt, popupFormPlace));
popupBigScreenImage.addEventListener('click', evt => closeFromLayout(evt, popupBigScreenImage));