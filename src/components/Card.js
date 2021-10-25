class Card {
    constructor(data) {
        this._name = data.name;
        this._imageLink = data.link;
        this._likesArray = data.likesArray ? data.likesArray : [];
        this._template = data.template;
        this._handleCardClick = data.handleCardClick;
        this._handleCardDelete = data.handleCardDelete;
        this._ownerId = data.ownerId;
        this._cardId = data.cardId;
        this._handleLikeButton = data.handleLikeButton;
        this._currentId = data.currentId;
    }

    _setEventListeners() {
        this._cardElement.querySelector(".card__heart").addEventListener('click', evt => this._handleLikeButton(evt, this._likesArray));
        this._cardElement.querySelector(".card__image").addEventListener('click', evt => this._handleCardClick(evt));
        if (this._ownerId === this._currentId) {
            this._cardElement.querySelector(".card__delete").addEventListener('click', evt => this._handleCardDelete(this._cardId, evt));
        }
    }

    generateCard() {
        const cardTemplate = document.querySelector(this._template).content;
        this._cardElement = cardTemplate.querySelector(".card").cloneNode(true);
        this._cardElement.id = this._cardId;
        if (this._ownerId !== this._currentId) {
            this._cardElement.querySelector(".card__delete").remove();
        }
        if (this._checkIsLiked()) {
            this._cardElement.querySelector(".card__heart").classList.add("card__heart_active");
        }
        this._cardElement.querySelector(".card__image").src = this._imageLink;
        this._cardElement.querySelector(".card__image").alt = `photo of ${this._name}`;
        this._cardElement.querySelector(".card__name").textContent = this._name;
        this._cardElement.querySelector(".card__like-number").textContent = this._likesArray.length;
        this._setEventListeners(this._cardElement);
        return this._cardElement;
    }

    updateLikes(likes) {
        this._likesArray = likes;
        this._cardElement.querySelector(".card__like-number").textContent = this._likesArray.length;
    }

    getLikes() {
        return this._likesArray;
    }

    getCardId() {
        return this._cardId;
    }

    _checkIsLiked() {
        let isLiked = false;
        this._likesArray.forEach((like) => {
            if (like._id === this._currentId) {
                isLiked = true;
            }
        });
        return isLiked;
    }

    renderLikes(evt, likes, isLiked) {
        this.updateLikes(likes);
        if(!this._checkIsLiked()) {
            evt.target.classList.remove("card__heart_active");
        }
        else {
            evt.target.classList.add("card__heart_active");
        }
    } 
}

export { Card };