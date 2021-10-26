export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    getInitialCards() {
        return fetch((`${this._baseUrl}/cards`), {
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    getUserInfo() {
        return fetch((`${this._baseUrl}/users/me`), {
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    postCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
            .then(res => this._getResponseData(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    makeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    makeUnlike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    changeProfilePicture({ picture }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: picture
            })
        })
            .then(res => this._getResponseData(res));
    }

    setUserInfo({ name, profession }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: profession
            })
        })
            .then(res => this._getResponseData(res));
    }
}
