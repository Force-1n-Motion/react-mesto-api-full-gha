import { useEffect, useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditProfilePopup({ open, onClose, onUpdateUser, isSending }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, isInputValid, handleChange, resetData, setInitialisValue } = useFormValidation()

  useEffect(() => {
    setInitialisValue("name", currentUser.name)
    setInitialisValue("occupation", currentUser.about)
},[currentUser, setInitialisValue, open])

  function resetOnClose() {
    onClose()
    resetData({name: currentUser.name, occupation: currentUser.about})
  }
  
  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({name: values.name, occupation: values.occupation}, resetData)
}

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      open={open}
      onClose={resetOnClose}
      isValid={isValid}
      isSending={isSending}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        className={`popup__input ${isInputValid.name === undefined || isInputValid.name ? "" : "popup__input_errored"}`}
        id="name"
        placeholder="Введите имя"
        name="name"
        minLength={2}
        maxLength={40}
        value={values.name ? values.name : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__error_visible" id="name-error">{errors.name}</span>
      <input
        required
        type="text"
        className={`popup__input ${isInputValid.occupation === undefined || isInputValid.occupation ? "" : "popup__input_errored"}`}
        id="occupation"
        placeholder="О себе"
        name="occupation"
        minLength={2}
        maxLength={200}
        value={values.occupation ? values.occupation : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__error_visible" id="occupation-error">{errors.occupation}</span>
    </PopupWithForm>
  );
}
