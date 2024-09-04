// Открытие модального окна

export const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
};

// Закрытие модального окна

export const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
};

// Закрытие по нажатию на Escape

export const handleEscClose = (event) => {
  event.stopPropagation();
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closeModal(openedPopup);
  }
};
