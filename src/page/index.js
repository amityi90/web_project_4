import "./index.css";

import logoSrc from "../images/around-the-us-logo.svg";
import { Card } from "../components/Card.js";
import { Api } from "../components/Api.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import { logoImage, avatarImage, config, editProfile, formContentProfile, addPlaceButton, formContentPlace, profilePicture, formContentProfilePicture } from "../utils/constants.js";

logoImage.src = logoSrc;

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "f89c2be6-d7fd-45c3-96d0-689f19661cba",
    "Content-Type": "application/json"
  }
});

let cardIdDelete = "";

const popupDeleteCard = new PopupWithForm(".popup_content_delete");

const imagePopup = new PopupWithImage(".popup_content_big-screen-image");
imagePopup.setEventListeners();

const profileForm = new PopupWithForm(".popup_content_profile-edit", handleProfileSubmit);
profileForm.setEventListeners();

const placeForm = new PopupWithForm(".popup_content_add-place", handlePlaceAdd);
placeForm.setEventListeners();

const deleteform = new PopupWithForm(".popup_content_delete", handleDeleteSubmit);
deleteform.setEventListeners();

const profilePictureForm = new PopupWithForm(".popup_content_change-profile-picture", handleProfilePictureChange);
profilePictureForm.setEventListeners();

const userData = new UserInfo({ nameSelector: ".profile__name", professionSelector: ".profile__proffesion" });

const profileFormValidator = new FormValidator(config, formContentProfile);
const placeFormValidator = new FormValidator(config, formContentPlace);
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
const profilePictureFormValidator = new FormValidator(config, formContentProfilePicture);
profilePictureFormValidator.enableValidation();

function reloadUserInfo() {
  api.getUserInfo()
    .then((result) => {
      userData.setUserInfo(result);
      avatarImage.src = result.avatar;
    });
}

function reloadCards() {
  api.getInitialCards()
    .then((initialCards) => {
      cardsSection = new Section({ items: initialCards, renderer: creatCard }, ".cards");
      cardsSection.renderer();
    })
}

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
  profileForm.getFormElement().querySelector(".popup__save-button").textContent = "Save...";
  const inputs = profileForm.getInputValues();
  api.setUserInfo({ name: inputs.name, profession: inputs.profession })
    .then(() => {
      userData.setUserInfo({ name: inputs.name, about: inputs.profession });
    })
    .finally(() => profileForm.getFormElement().querySelector(".popup__save-button").textContent = "Save");
  profileForm.close();
}

function handleCardDelete(cardId, evt) {
  popupDeleteCard.open();
  cardIdDelete = cardId;
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api.deleteCard(cardIdDelete);
  deleteform.close();
  document.querySelectorAll(".card").forEach(card => {
    if (card.id === cardIdDelete) {
      card.remove();
    }
  });
}

function likeButtonHandler(evt, likesArray) {
  if (this.checkIsLiked()) {
    api.makeUnlike(this.getCardId())
      .then((res) => this.updatelikes(res.likes));
    evt.target.classList.remove("card__heart_active");
  }
  else {
    api.makeLike(this.getCardId())
      .then((res) => this.updatelikes(res.likes));
    evt.target.classList.add("card__heart_active");
  }
}

function creatCard(card) {
  card.template = "#card";
  card.handleCardClick = (evt) => imagePopup.open(evt);
  card.handleCardDelete = handleCardDelete;
  card.likeButtonHandler = likeButtonHandler;
  const newCard = new Card(card);
  return newCard.generateCard();
}

function handlePlaceAdd(evt) {
  evt.preventDefault();
  placeForm.getFormElement().querySelector(".popup__save-button").textContent = "Create...";
  const inputs = placeForm.getInputValues();
  const card = {};
  card.name = inputs["place-name"];
  card.link = inputs.link;
  api.postCard(card).then((res) => {
    card.ownerId = res.owner._id;
    card.cardId = res._id;
    cardsSection.addNewItem(creatCard(card));
  })
    .finally(() => placeForm.getFormElement().querySelector(".popup__save-button").textContent = "Create");
  placeForm.close();
}

function editProfilePicture() {
  profilePictureForm.open();
}

function handleProfilePictureChange(evt) {
  evt.preventDefault();
  profilePictureForm.getFormElement().querySelector(".popup__save-button").textContent = "Save...";
  api.changeProfilePicture(profilePictureForm.getInputValues())
    .then(() => reloadUserInfo())
    .finally(() => profilePictureForm.getFormElement().querySelector(".popup__save-button").textContent = "Save");
  profilePictureForm.close();
}

let cardsSection = new Section({ items: [], renderer: creatCard }, ".cards");

reloadUserInfo();
reloadCards();

editProfile.addEventListener('click', editButton);
addPlaceButton.addEventListener('click', addPlace);
profilePicture.addEventListener('click', editProfilePicture);