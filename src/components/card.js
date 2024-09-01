import { cardsList, cardForm, popupNewCard } from "../index.js";

// Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// Удалить карточку

export const deleteCard = (e) => {
  e.stopPropagation();
  e.target.closest(".card").remove();
};

// Поставить лайк

export const addLike = (e) => {
  e.stopPropagation();
  e.target.classList.toggle("card__like-button_is-active");
};

// Вывод карточки на страницу

export function createCard(item, handleDelete, handleLike) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const delButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  delButton.addEventListener("click", handleDelete);
  likeButton.addEventListener("click", handleLike);

  return cardElement;
}

// Создание карточки

export const addNewCard = (e) => {
  e.preventDefault();

  const name = cardForm.elements["place-name"];
  const image = cardForm.elements["link"];

  if (name.value && image.value) {
    const cardElement = createCard(
      { name: name.value, link: image.value },
      deleteCard,
      addLike
    );
    cardsList.prepend(cardElement);
    popupNewCard.classList.remove("popup_is-opened");

    name.value = "";
    image.value = "";
  }
};
