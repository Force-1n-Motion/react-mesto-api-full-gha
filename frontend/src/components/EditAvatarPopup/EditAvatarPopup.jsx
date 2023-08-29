import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"



export default function EditAvatarPopup({ open, onClose, onUpdateAvatar, isSending }) {
  const input = useRef()
  const { values, errors, isValid, isInputValid, handleChange, resetData, } = useFormValidation()
  
  function resetOnClose() {
    onClose()
    resetData()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({avatar: input.current.value}, resetData)
}

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      open={open}
      isSending={isSending}
      isValid={isValid}
      onClose={resetOnClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        ref={input}
        type="url"
        className={`popup__input ${isInputValid.avatar === undefined || isInputValid.avatar ? "" : "popup__input_errored"}`}
        id="avatar-link"
        placeholder="Адрес аватара"
        name="avatar"
        value={values.avatar ? values.avatar : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__error_visible" id="avatar-link-error">{ errors.avatar}</span>
    </PopupWithForm>
  );
}
