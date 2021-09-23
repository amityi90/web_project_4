class Card {
    constructor(data) {
        this._name = data.name;
        this._imageLink = data.link;
        this._template = data.template;
        this._popupBigScreenImage = document.querySelector(".popup_content_big-screen-image");
    }

    _setEventListeners() {
        this._template.querySelector(".card__heart").addEventListener('click', evt => this._likeButtonHandler(evt));
        this._template.querySelector(".card__delete").addEventListener('click', evt => this._deleteCardHandler(evt));
    }

    _likeButtonHandler(evt) {
        evt.target.classList.toggle("card__heart_active");
    }

    _deleteCardHandler(evt) {
        evt.target.parentElement.remove();
    }

    generateCard() {
        this._template.querySelector(".card__image").src = this._imageLink;
        this._template.querySelector(".card__image").alt = "photo of " + this._name;
        this._template.querySelector(".card__name").textContent = this._name;
        this._setEventListeners();
        return this._template;
    }
}

export { Card };