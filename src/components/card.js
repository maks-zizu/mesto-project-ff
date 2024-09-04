// DOM узлы

export const cardsList = document.querySelector(".places__list");
export const cardForm = document.forms["new-place"];

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

export function createCard(item, handleDelete, handleLike, openImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const delButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  delButton.addEventListener("click", handleDelete);
  likeButton.addEventListener("click", handleLike);
  cardImage.addEventListener("click", openImage);

  return cardElement;
}
