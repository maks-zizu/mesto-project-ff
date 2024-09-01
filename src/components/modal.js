import { popupImage } from "../index.js";
import { completeForm } from "./profile.js";

// Открытие попапа с картинкой

export const openImage = (e, popup) => {
  e.stopPropagation();
  if (!e.target.classList.contains("card__image")) return;
  const image = popup.querySelector(".popup__image");
  const caption = popup.querySelector(".popup__caption");
  caption.textContent = e.target.alt;
  image.src = e.target.src;
  openModal(e, popup);
};

export const clearImage = () => {
  const image = popupImage.querySelector(".popup__image");
  const caption = popupImage.querySelector(".popup__caption");
  caption.textContent = "";
  image.src = "";
};

// Открытие модального окна

export const openModal = (e, popup) => {
  if (popup.classList.contains("popup_type_edit")) completeForm();
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
  popup.addEventListener("click", closeModal);
};

// Закрытие модального окна

export const closeModal = (event) => {
  const target = event.target;
  if (
    target.classList.contains("popup") ||
    target.classList.contains("popup__close")
  ) {
    target.closest(".popup").classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClose);
    target.closest(".popup").removeEventListener("click", closeModal);
    clearImage();
  }
};

// Закрытие по нажатию на Escape

export const handleEscClose = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      openedPopup.classList.remove("popup_is-opened");
      document.removeEventListener("keydown", handleEscClose);
    }
  }
};
