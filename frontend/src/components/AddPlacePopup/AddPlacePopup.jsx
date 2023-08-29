import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidation from "../../utils/useFormValidation";

export default function AddPlacePopup({ open, onClose, onAddPlace, isSending }) {
  
  const { values, errors, isValid, isInputValid, handleChange, resetData } =useFormValidation();

  function resetOnClose() {
    onClose();
    resetData();
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({title: values.title, link: values.link}, resetData)
}

  
  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      button="Создать"
      open={open}
      isValid={isValid}
      isSending={isSending}
      onClose={resetOnClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        className={`popup__input ${isInputValid.title === undefined || isInputValid.title ? "" : "popup__input_errored"}`}
        id="card-title"
        placeholder="Название"
        name="title"
        minLength={2}
        maxLength={30}
        value={values.title ? values.title : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__error_visible" id="card-title-error">{errors.title}</span>
      <input
        required
        type="url"
        className={`popup__input ${isInputValid.link === undefined || isInputValid.link ? "" : "popup__input_errored"}`}
        id="card-link"
        placeholder="Адрес сайта"
        name="link"
        value={values.link ? values.link : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__error_visible" id="card-link-error">{errors.link}</span>
    </PopupWithForm>
  );
}
