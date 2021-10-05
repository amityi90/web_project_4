export const logoImage = document.getElementById("around-the-us-logo");
export const avatarImage = document.getElementById("Jacques-Cousteau-image");
export const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__text-input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_inactive",
    inputErrorClass: "popup__text-input_type_error",
  };
  export const popupFormProfile = document.querySelector(".popup_content_profile-edit");
  export const editProfile = document.querySelector(".profile__edit-button");
  export const formContentProfile = popupFormProfile.querySelector(".popup__form");
  export const nameInput = popupFormProfile.querySelector(".popup__text-input_content_name");
  export const proffesionInput = popupFormProfile.querySelector(".popup__text-input_content_profession");
  export const addPlaceButton = document.querySelector(".profile__add-button");
  export const popupFormPlace = document.querySelector(".popup_content_add-place");
  export const formContentPlace = popupFormPlace.querySelector(".popup__form");
  export const placeNameInput = popupFormPlace.querySelector(".popup__text-input_content_place-name");
  export const placeLinkInput = popupFormPlace.querySelector(".popup__text-input_content_link");
  export const initialCards = [
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