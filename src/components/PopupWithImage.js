import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

    open(evt) {
        super.open();
        const description = evt.target.closest(".card__image-container").nextElementSibling.firstElementChild.textContent;
        this._popupElement.querySelector(".big-screen-image__image").src = evt.target.src;
        this._popupElement.querySelector(".big-screen-image__image").alt = `photo of ${description}`;
        this._popupElement.querySelector(".big-screen-image__name").textContent = description;        
      }

}