export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch((this._baseUrl + "/cards"), {
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            })
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
                return initialCards;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getUserInfo() {
        return fetch((this._baseUrl + "/users/me"), {
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    postCard(card) {
        return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
            method: "POST",
            headers: {
                authorization: "f89c2be6-d7fd-45c3-96d0-689f19661cba",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    deleteCard(cardId) {
        return fetch((this._baseUrl + "/cards/" + cardId), {
            method: "DELETE",
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    makeLike(cardId) {
        return fetch((this._baseUrl + "/cards/likes/" + cardId), {
            method: "PUT",
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    makeUnlike(cardId) {
        return fetch((this._baseUrl + "/cards/likes/" + cardId), {
            method: "DELETE",
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    changeProfilePicture({ picture }) {
        return fetch((this._baseUrl + "/users/me/avatar"), {
            method: "PATCH",
            headers: {
                authorization: this._headers.authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: picture
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    setUserInfo({ name, profession }) {
        return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
            method: "PATCH",
            headers: {
                authorization: "f89c2be6-d7fd-45c3-96d0-689f19661cba",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                about: profession
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
