import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

    open(evt, popupElement) {
        popupElement.querySelector(".big-screen-image__image").src = evt.target.src;
        popupElement.querySelector(".big-screen-image__name").textContent = evt.target.closest(".card__image-container").nextElementSibling.firstElementChild.textContent;
        popupElement.classList.remove("popup_disable");
      }

    getElement() {
        return this._popupElement;
    }
}