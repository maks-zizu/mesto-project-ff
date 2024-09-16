import "./pages/index.css";
import { handleLike, createCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  deleteCard,
  getInitialCards,
  getUser,
  patchUser,
  postCard,
  updateAvatar,
} from "./components/api.js";

// DOM узлы

// card
const cardsList = document.querySelector(".places__list");
const cardForm = document.forms["new-place"];

const placeName = cardForm.elements["place-name"];
const link = cardForm.elements["link"];

const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
popupNewCard.classList.add("popup_is-animated");

// image
const popupImage = document.querySelector(".popup_type_image");
popupImage.classList.add("popup_is-animated");

const image = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

// forms

const profileForm = document.forms["edit-profile"];

// profile
const profile = document.querySelector(".profile");
const popupProfile = document.querySelector(".popup_type_edit");
popupProfile.classList.add("popup_is-animated");
const editButton = document.querySelector(".profile__edit-button");
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");
const profileImage = profile.querySelector(".profile__image");

const name = profileForm.elements["name"];
const description = profileForm.elements["description"];

// элемент попапа для удаления карточки
const popupConfirm = document.querySelector(".popup_type_confirm");
const confirmButton = popupConfirm.querySelector(".popup__button_confirm");

// avatar
const avatarForm = document.forms["avatar-form"];
const avatarInput = avatarForm.elements["avatar-link"];
const avatarPopup = document.querySelector(".popup_type_avatar");

// Функция для изменения текста кнопки во время загрузки
const renderLoading = (
  isLoading,
  buttonElement,
  loadingText = "Сохранение..."
) => {
  if (isLoading) buttonElement.textContent = loadingText;
  else buttonElement.textContent = buttonElement.dataset.defaultText;
};

// Открытие попапа для обновления аватара
profileImage.addEventListener("click", () => {
  avatarInput.value = "";
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

// Отправка формы для обновления аватара
avatarForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const submitButton = e.submitter;
  renderLoading(true, submitButton);
  updateAvatar(avatarInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

// Заполнение формы профиля

const completeForm = () => {
  name.value = profileTitle.textContent;
  description.value = profileDescription.textContent;
};

// Удалить карточку

let cardToDelete = null;
let cardElementToDelete = null;

// Функция для открытия попапа подтверждения удаления
const openDeletePopup = (cardId, cardElement) => {
  cardToDelete = cardId;
  cardElementToDelete = cardElement;
  openModal(popupConfirm);
};

// Редактирование профиля

const editProfile = (e) => {
  e.preventDefault();
  const submitButton = e.submitter;
  renderLoading(true, submitButton);
  const updateProfile = patchUser({
    name: name.value,
    about: description.value,
  });
  updateProfile
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
};

// Открытие попапа с картинкой

const openImage = (e) => {
  e.stopPropagation();
  if (!e.target.classList.contains("card__image")) return;
  caption.textContent = e.target.alt;
  image.src = e.target.src;
  image.alt = e.target.alt;
  openModal(popupImage);
};

// Создание карточки

const addNewCard = (e) => {
  e.preventDefault();
  const submitButton = e.submitter;
  renderLoading(true, submitButton);
  postCard({ name: placeName.value, link: link.value })
    .then((data) => {
      const cardElement = createCard(
        data,
        data.owner._id,
        openDeletePopup,
        handleLike,
        openImage
      );

      cardsList.prepend(cardElement);
      closeModal(popupNewCard);

      placeName.value = "";
      link.value = "";
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
};

// Инициализация карточек

const initialCardsList = (initialCards, userId) =>
  initialCards.forEach((item) => {
    const cardElement = createCard(
      item,
      userId,
      openDeletePopup,
      handleLike,
      openImage
    );
    cardsList.append(cardElement);
  });

// Инициализация профиля

// Загрузка данных пользователя и карточек
Promise.all([getUser(), getInitialCards()])
  .then(([userData, cards]) => {
    // Сохраняем данные пользователя
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id; // Сохраняем _id пользователя

    // Отображаем карточки
    initialCardsList(cards, userId);
  })
  .catch((err) => {
    console.log(err);
  });

// Обработчик подтверждения удаления
confirmButton.addEventListener("click", () => {
  if (cardToDelete && cardElementToDelete) {
    deleteCard(cardToDelete)
      .then(() => {
        cardElementToDelete.remove();
        closeModal(popupConfirm);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// Обработчики событий

cardForm.addEventListener("submit", addNewCard);

profileForm.addEventListener("submit", editProfile);

// Открытие формы добавления новой карточки
addButton.addEventListener("click", () => {
  clearValidation(cardForm, validationConfig);
  openModal(popupNewCard);
});

// Открытие формы редактирования профиля
editButton.addEventListener("click", () => {
  completeForm();
  clearValidation(profileForm, validationConfig);
  openModal(popupProfile);
});

// Установка слушателей закрытия на все попапы
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup || e.target.classList.contains("popup__close"))
      closeModal(popup);
  });
});

// Настройки для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Включаем валидацию для всех форм
enableValidation(validationConfig);
