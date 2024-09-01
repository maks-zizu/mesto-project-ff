import {
  profileTitle,
  profileDescription,
  profileForm,
  popupProfile,
} from "../index.js";

// Заполнение формы профиля

export const completeForm = () => {
  const name = profileForm.elements["name"];
  const description = profileForm.elements["description"];

  name.value = profileTitle.textContent;
  description.value = profileDescription.textContent;
};

// Редактирвоание профиля

export const editProfile = (e) => {
  e.preventDefault();

  const name = profileForm.elements["name"];
  const description = profileForm.elements["description"];

  if (name.value && description.value) {
    profileTitle.textContent = name.value;
    profileDescription.textContent = description.value;
    popupProfile.classList.remove("popup_is-opened");
  }
};
