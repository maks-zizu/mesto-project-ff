import "./pages/index.css";
import {
  addLike,
  cardForm,
  cardsList,
  createCard,
  deleteCard,
} from "./components/card.js";
import { initialCards } from "./components/data.js";
import { openModal, closeModal } from "./components/modal.js";

// DOM узлы

// card
export const addButton = document.querySelector(".profile__add-button");
export const popupNewCard = document.querySelector(".popup_type_new-card");
popupNewCard.classList.add("popup_is-animated");

// image
export const card = document.querySelector(".card");
export const popupImage = document.querySelector(".popup_type_image");
popupImage.classList.add("popup_is-animated");

const image = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

// forms
export const profileForm = document.forms["edit-profile"];
export const saveButton = cardForm.querySelector(".popup__button");

// profile
export const profile = document.querySelector(".profile");
export const popupProfile = document.querySelector(".popup_type_edit");
popupProfile.classList.add("popup_is-animated");
export const editButton = document.querySelector(".profile__edit-button");
export const profileTitle = profile.querySelector(".profile__title");
export const profileDescription = profile.querySelector(
  ".profile__description"
);

const name = profileForm.elements["name"];
const description = profileForm.elements["description"];

// Заполнение формы профиля

export const completeForm = () => {
  name.value = profileTitle.textContent;
  description.value = profileDescription.textContent;
};

// Редактирвоание профиля

export const editProfile = (e) => {
  e.preventDefault();
  profileTitle.textContent = name.value;
  profileDescription.textContent = description.value;
  closeModal(popupProfile);
};

// Открытие попапа с картинкой

export const openImage = (e) => {
  e.stopPropagation();
  if (!e.target.classList.contains("card__image")) return;
  caption.textContent = e.target.alt;
  image.src = e.target.src;
  openModal(popupImage);
};

// Создание карточки

export const addNewCard = (e) => {
  e.preventDefault();

  const name = cardForm.elements["place-name"];
  const image = cardForm.elements["link"];

  const cardElement = createCard(
    { name: name.value, link: image.value },
    deleteCard,
    addLike,
    openImage
  );
  cardsList.prepend(cardElement);
  closeModal(popupNewCard);

  name.value = "";
  image.value = "";
};

// Инициализация карточек

initialCards.forEach((item) => {
  const cardElement = createCard(item, deleteCard, addLike, openImage);
  cardsList.append(cardElement);
});

// Обработчики событий

addButton.addEventListener("click", () => openModal(popupNewCard));

cardForm.addEventListener("submit", addNewCard);

profileForm.addEventListener("submit", editProfile);

editButton.addEventListener("click", () => {
  completeForm();
  openModal(popupProfile);
});

// Установка слушателей закрытия на все попапы
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup || e.target.classList.contains("popup__close"))
      closeModal(popup);
  });
});
