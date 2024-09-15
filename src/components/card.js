import { dislikeCard, likeCard } from "./api";

// Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// Поставить лайк

export const handleLike = (cardId, likeButton, likeCounter) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  if (isLiked) {
    dislikeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Вывод карточки на страницу

export function createCard(
  item,
  userId,
  openDeletePopup,
  handleLike,
  openImage
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const delButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;
  likeCounter.textContent = item.likes.length;

  // Отображаем кнопку удаления только если карточка принадлежит пользователю
  if (item.owner._id === userId) {
    delButton.style.display = "block";
    delButton.addEventListener("click", () => {
      openDeletePopup(item._id, cardElement);
    });
  } else delButton.style.display = "none";

  // Лайки
  if (item.likes.some((like) => like._id === userId))
    likeButton.classList.add("card__like-button_is-active");

  likeButton.addEventListener("click", () =>
    handleLike(item._id, likeButton, likeCounter)
  );
  cardImage.addEventListener("click", openImage);

  return cardElement;
}
