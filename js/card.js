class Card {
    constructor(data) {
        this._name = data.name;
        this._imageLink = data.link;
        this._template = data.template;
        this._handleCardClick = data.handleCardClick;
        this._popupElement = data.popupElement;
    }

    _setEventListeners(cardElement) {
        cardElement.querySelector(".card__heart").addEventListener('click', evt => this._likeButtonHandler(evt));
        cardElement.querySelector(".card__delete").addEventListener('click', evt => this._deleteCardHandler(evt));
        cardElement.querySelector(".card__image").addEventListener('click', evt => this._handleCardClick(evt, this._popupElement));
    }

    _likeButtonHandler(evt) {
        evt.target.classList.toggle("card__heart_active");
    }

    _deleteCardHandler(evt) {
        evt.target.parentElement.remove();
    }

    generateCard() {
        const cardTemplate = document.querySelector(this._template).content;
        const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
        cardElement.querySelector(".card__image").src = this._imageLink;
        cardElement.querySelector(".card__image").alt = "photo of " + this._name;
        cardElement.querySelector(".card__name").textContent = this._name;
        this._setEventListeners(cardElement);
        return cardElement;
    }
}

export { Card };