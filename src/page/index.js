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

const popupDeleteCard = new PopupWithForm(".popup_content_delete");

const imagePopup = new PopupWithImage(".popup_content_big-screen-image");
imagePopup.setEventListeners();

const profileForm = new PopupWithForm(".popup_content_profile-edit", handleProfileSubmit);
profileForm.setEventListeners();

const placeForm = new PopupWithForm(".popup_content_add-place", handlePlaceAdd);
placeForm.setEventListeners();

const deleteForm = new PopupWithForm(".popup_content_delete", handleDeleteSubmit);
deleteForm.setEventListeners();

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
      avatarImage.alt = "profile photo";
    })
    .catch((err) => {
      console.log(err);
    });
}

function reloadCards() {
  api.getInitialCards()
    .then((result) => {
      const initialCards = [];
      result.forEach(card => {
        initialCards.push({
          name: card.name,
          link: card.link,
          likesArray: card.likes,
          ownerId: card.owner._id,
          cardId: card._id
        });
      });
      cardsSection.renderer(initialCards);
    })
    .catch((err) => {
      console.log(err);
    });
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
      profileForm.close();
      profileForm.getFormElement().querySelector(".popup__save-button").textContent = "Save";
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleCardDelete(cardId, evt) {
  popupDeleteCard.open();
  popupDeleteCard.setCardId(cardId);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api.deleteCard(popupDeleteCard.getCardId())
    .then(() => {
      document.querySelectorAll(".card").forEach(card => {
        if (card.id === popupDeleteCard.getCardId()) {
          card.remove();
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => deleteForm.close());
}

function handleLikeButton() {
  if (this._checkIsLiked()) {
    api.makeUnlike(this.getCardId())
      .then((res) => {
        this.updateLikes(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    api.makeLike(this.getCardId())
      .then((res) => {
        this.updateLikes(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function createCard(card) {
  card.template = "#card";
  card.handleCardClick = (evt) => imagePopup.open(evt);
  card.handleCardDelete = handleCardDelete;
  card.handleLikeButton = handleLikeButton;
  card.currentId = userData.getUserInfo().id;
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
  api.postCard(card)
    .then((res) => {
      card.ownerId = res.owner._id;
      card.cardId = res._id;
      cardsSection.prependItem(createCard(card));
      placeForm.close();
      placeForm.getFormElement().querySelector(".popup__save-button").textContent = "Create";
    })
    .catch((err) => {
      console.log(err);
    });
}

function editProfilePicture() {
  profilePictureForm.open();
}

function handleProfilePictureChange(evt) {
  evt.preventDefault();
  profilePictureForm.getFormElement().querySelector(".popup__save-button").textContent = "Save...";
  api.changeProfilePicture(profilePictureForm.getInputValues())
    .then(() => {
      reloadUserInfo();
      profilePictureForm.close();
      profilePictureForm.getFormElement().querySelector(".popup__save-button").textContent = "Save";
    })
    .catch((err) => {
      console.log(err);
    });
}

const cardsSection = new Section({ renderer: createCard }, ".cards");

Promise.all([reloadUserInfo(), reloadCards()])
  .catch((err) => {
    console.log(err);
  });

editProfile.addEventListener('click', editButton);
addPlaceButton.addEventListener('click', addPlace);
profilePicture.addEventListener('click', editProfilePicture);