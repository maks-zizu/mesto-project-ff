import "./pages/index.css";
import {
  addLike,
  addNewCard,
  createCard,
  deleteCard,
} from "./components/card.js";
import { initialCards } from "./components/data.js";
import { openImage, openModal } from "./components/modal.js";
import { editProfile } from "./components/profile.js";

// DOM узлы

// card
export const cardsList = document.querySelector(".places__list");
export const popupNewCard = document.querySelector(".popup_type_new-card");
popupNewCard.classList.add("popup_is-animated");
export const addButton = document.querySelector(".profile__add-button");

// image
export const card = document.querySelector(".card");
export const popupImage = document.querySelector(".popup_type_image");
popupImage.classList.add("popup_is-animated");

// profile
export const profile = document.querySelector(".profile");
export const popupProfile = document.querySelector(".popup_type_edit");
popupProfile.classList.add("popup_is-animated");
export const editButton = document.querySelector(".profile__edit-button");
export const profileTitle = profile.querySelector(".profile__title");
export const profileDescription = profile.querySelector(
  ".profile__description"
);

// forms
export const cardForm = document.forms["new-place"];
export const profileForm = document.forms["edit-profile"];
export const saveButton = cardForm.querySelector(".popup__button");

// Инициализация карточек

initialCards.forEach((item) => {
  const cardElement = createCard(item, deleteCard, addLike);
  cardsList.append(cardElement);
});

// Обработчики событий

addButton.addEventListener("click", (e) => openModal(e, popupNewCard));

cardForm.addEventListener("submit", addNewCard);

editButton.addEventListener("click", (e) => openModal(e, popupProfile));

profileForm.addEventListener("submit", editProfile);

cardsList.addEventListener("click", (e) => openImage(e, popupImage));
