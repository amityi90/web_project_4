import "./styles/index.css";

import logoSrc from "./images/around-the-us-logo.svg";
import avatarSrc from "./images/Jacques-Cousteau-image.jpg";

import { Card } from "../js/components/Card.js";
import { Section } from "../js/components/Section.js";
import { FormValidator } from "../js/components/FormValidator.js";
import { PopupWithImage } from "../js/components/PopupWithImage.js";
import { PopupWithForm } from "../js/components/PopupWithForm.js";
import { UserInfo } from "../js/components/UserInfo.js";

const logoImage = document.getElementById("around-the-us-logo");
logoImage.src = logoSrc;
const avatarImage = document.getElementById("Jacques-Cousteau-image");
avatarImage.src = avatarSrc;


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
let openedPopup = null;

const imagePopup = new PopupWithImage(".popup_content_big-screen-image");
imagePopup.setEventListeners();

const profileForm = new PopupWithForm(".popup_content_profile-edit", handleProfileSubmit);
profileForm.setEventListeners();

const placeForm = new PopupWithForm(".popup_content_add-place", handlePlaceAdd);
placeForm.setEventListeners();

const User1 = new UserInfo({ nameSelsctor: ".profile__name", proffesionSelsctor: ".profile__proffesion" });
User1.setUserInfo({ name: "Jacques Cousteau", proffesion: "Explorer" });

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
  profileForm.open();
  nameInput.value = User1.getUserInfo().name;
  proffesionInput.value = User1.getUserInfo().proffesion;
  profileFormValidator.resetFormValidation();
}

function addPlace() {
  placeForm.open();
  placeNameInput.value = "";
  placeLinkInput.value = "";
  PlaceFormValidator.resetFormValidation();
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  const inputs = profileForm._getInputValues();
  User1.setUserInfo({ name: inputs.name, proffesion: inputs.proffesion });
  profileForm.close();
}

function creatCard(card) {
  card.template = "#card";
  card.handleCardClick = imagePopup.open;
  card.popupElement = imagePopup.getElement();
  const newCard = new Card(card);
  return newCard.generateCard();
}

function handlePlaceAdd(evt) {
  evt.preventDefault();
  const inputs = placeForm._getInputValues();
  const card = {};
  card.name = inputs["place-name"];
  card.link = inputs.link;
  cardsSection.addItem(creatCard(card));
  placeForm.close();
}

const cardsSection = new Section({ items: initialCards, renderer: creatCard }, ".cards");
cardsSection.renderer();


editProfile.addEventListener('click', editButton);
addPlaceButton.addEventListener('click', addPlace);
