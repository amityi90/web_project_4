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

function editButton() {
    popupFormProfile.classList.remove("popup_disable");
    nameInput.value = nameProfile.textContent;
    proffesionInput.value = proffesionProfile.textContent;
}

function addPlace() {
    popupFormPlace.classList.remove("popup_disable");
    placeNameInput.value = "";
    placeLinkInput.value = "";
}

function closePopup(evt) {
    evt.target.parentElement.parentElement.classList.add("popup_disable");
    console.log("close!");
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    proffesionProfile.textContent = proffesionInput.value;
    closePopup(evt);
}

function createCard(card) {
    const cardTemplate = document.querySelector("#card").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__image").src = card.link;
    cardElement.querySelector(".card__image").alt = "photo of" + card.name;
    cardElement.querySelector(".card__name").textContent = card.name;
    return cardElement;
}

function addCard(card) {
    cardElement = createCard(card);
    const cardsElement = document.querySelector(".cards");
    cardElement.querySelector(".card__heart").addEventListener('click', evt => evt.target.classList.toggle("card__heart_active"));
    cardElement.querySelector(".card__delete").addEventListener('click', evt => evt.target.parentElement.remove());
    cardElement.querySelector(".card__image").addEventListener('click', evt => openBigScreenImage(evt));
    cardsElement.prepend(cardElement);
}

function handlePlaceAdd(evt) {
    evt.preventDefault();
    let card = new Object();
    card.name = placeNameInput.value;
    card.link = placeLinkInput.value;
    addCard(card);
    closePopup(evt);
}

function openBigScreenImage(evt) {
    popupBigScreenImage.querySelector(".big-screen-image__image").src = evt.target.src;
    popupBigScreenImage.querySelector(".big-screen-image__name").textContent = evt.target.parentElement.nextElementSibling.firstElementChild.textContent;
    popupBigScreenImage.classList.remove("popup_disable");
}

initialCards.forEach(card => addCard(card));

editProfile.addEventListener('click', editButton);
addPlaceButton.addEventListener('click', addPlace);
closeButtonProfile.addEventListener('click', evt => closePopup(evt));
closeButtonPlace.addEventListener('click', evt => closePopup(evt));
formContentProfile.addEventListener('submit', evt => handleFormSubmit(evt));
formContentPlace.addEventListener('submit', evt => handlePlaceAdd(evt));
closeButtonImage.addEventListener('click', evt => closePopup(evt));


