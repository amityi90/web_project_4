let popupForm = document.querySelector(".form");
let editProfile = document.querySelector(".profile__edit-button");
let page = document.querySelector(".page__main");
let header = document.querySelector(".header");
let footer = document.querySelector(".footer");
let closeButton = document.querySelector(".form__close-button");
let saveButton = document.querySelector(".form__save-button");
let nameProfile = document.querySelector(".profile__name");
let proffesionProfile = document.querySelector(".profile__proffesion");
/*let nameInput = document.querySelector(".form__text-input_content_name")
let proffesionInput = document.querySelector(".form__text-input_content_profession");*/

function editButton() {
    popupForm.classList.remove("form_disable");
    page.classList.add("page__main_disable");
    header.classList.add("header_disable");
    footer.classList.add("footer_disable");
}

function closePopup() {
    popupForm.classList.add("form_disable");
    page.classList.remove("page__main_disable");
    header.classList.remove("header_disable");
    footer.classList.remove("footer_disable");
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    let nameInput = document.querySelector(".form__text-input_content_name")
    let proffesionInput = document.querySelector(".form__text-input_content_profession");
    let newProffesion = proffesionInput.value;
    let newName = nameInput.value;
    nameProfile.innerHTML = `<h2 class="profile__name">${newName}
    <button class="profile__edit-button"></button>
</h2>`;
    proffesionProfile.innerHTML = `<p class="profile__proffesion">${newProffesion}</p>`;
    console.log(newName);
    closePopup();
}

editProfile.addEventListener('click', editButton);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', handleFormSubmit);