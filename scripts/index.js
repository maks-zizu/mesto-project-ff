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

// @todo: Функция удаления карточки

const deleteCard = (e) => e.target.closest(".card").remove();

// @todo: Функция создания карточки

const addNewCard = (e) => {
  e.preventDefault();
  const name = addCardForm.querySelector(".popup__input_type_card-name");
  const image = addCardForm.querySelector(".popup__input_type_url");

  const cardElement = createCard(
    { name: name.value, link: image.value },
    deleteCard
  );
  cardsList.prepend(cardElement);
  newCard.classList.remove("popup_is-opened");

  name.value = "";
  image.value = "";
};

// @todo: Вывести карточки на страницу

function createCard(item, handleDelete) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const delButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  delButton.addEventListener("click", handleDelete);

  return cardElement;
}

// Инициализация карточек

initialCards.forEach((item) => {
  const cardElement = createCard(item, deleteCard);
  cardsList.append(cardElement);
});

// Обработчики событий

addButton.addEventListener("click", (e) =>
  newCard.classList.add("popup_is-opened")
);

popupClose.addEventListener("click", (e) =>
  newCard.classList.remove("popup_is-opened")
);

saveButton.addEventListener("click", addNewCard);
