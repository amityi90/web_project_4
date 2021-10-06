import "./index.css";

import logoSrc from "../images/around-the-us-logo.svg";
import avatarSrc from "../images/Jacques-Cousteau-image.jpg";

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import { logoImage, avatarImage, config, editProfile, formContentProfile, nameInput, professionInput, addPlaceButton, formContentPlace, placeNameInput, placeLinkInput, initialCards } from "../utils/constants.js";

logoImage.src = logoSrc;
avatarImage.src = avatarSrc;



const imagePopup = new PopupWithImage(".popup_content_big-screen-image");
imagePopup.setEventListeners();

const profileForm = new PopupWithForm(".popup_content_profile-edit", handleProfileSubmit);
profileForm.setEventListeners();

const placeForm = new PopupWithForm(".popup_content_add-place", handlePlaceAdd);
placeForm.setEventListeners();

const userData = new UserInfo({ nameSelector: ".profile__name", professionSelector: ".profile__proffesion" });
userData.setUserInfo({ name: "Jacques Cousteau", profession: "Explorer" });

const profileFormValidator = new FormValidator(config, formContentProfile);
const placeFormValidator = new FormValidator(config, formContentPlace);
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

function editButton() {
  profileForm.open();
  profileForm.setInputValues(userData.getUserInfo());
  profileFormValidator.resetFormValidation();
}


function addPlace() {
  placeForm.open();
  placeFormValidator.resetFormValidation();
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  const inputs = profileForm.getInputValues();
  userData.setUserInfo({ name: inputs.name, profession: inputs.profession });
  profileForm.close();
}

function creatCard(card) {
  card.template = "#card";
  card.handleCardClick = (evt) => imagePopup.open(evt);
  const newCard = new Card(card);
  return newCard.generateCard();
}

function handlePlaceAdd(evt) {
  evt.preventDefault();
  const inputs = placeForm.getInputValues();
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