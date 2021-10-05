import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

    open(evt) {
        super.open();
        this._popupElement.querySelector(".big-screen-image__image").src = evt.target.src;
        this._popupElement.querySelector(".big-screen-image__name").textContent = evt.target.closest(".card__image-container").nextElementSibling.firstElementChild.textContent;        
      }

}