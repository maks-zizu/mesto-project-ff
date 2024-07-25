import { initialCards } from "./cards.js";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const cardsList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const newCard = document.querySelector(".popup_type_new-card");

const popupClose = newCard.querySelector(".popup__close");
const addCardForm = newCard.querySelector(".popup__form");
const saveButton = addCardForm.querySelector(".popup__button");

// @todo: Функция создания карточки

const addNewCard = (e) => {
  e.preventDefault();
  const name = addCardForm.querySelector(".popup__input_type_card-name");
  const image = addCardForm.querySelector(".popup__input_type_url");

  multiply({ name: name.value, link: image.value });
  newCard.classList.remove("popup_is-opened");

  name.value = "";
  image.value = "";
};

// @todo: Функция удаления карточки

const delCard = (e) => e.target.parentElement.remove();

// @todo: Вывести карточки на страницу

const multiply = (card) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const delButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;
  delButton.addEventListener("click", delCard);
  cardsList.append(cardElement);
};

initialCards.forEach(multiply);

addButton.addEventListener("click", (e) =>
  newCard.classList.add("popup_is-opened")
);

popupClose.addEventListener("click", (e) =>
  newCard.classList.remove("popup_is-opened")
);

saveButton.addEventListener("click", addNewCard);
