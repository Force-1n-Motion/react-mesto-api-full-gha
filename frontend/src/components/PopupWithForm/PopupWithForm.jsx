export default function PopupWithForm({name, title, button, children, open, onClose, onSubmit, isSending, isValid=true}) {
  return (
    <div className={`popup popup_type_${name} ${open ? "popup_opened" : ""}`}onClick={onClose}>
      <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={onClose}/>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className={`button popup__save ${isValid ? "" : "popup__save_disabled"} ${isSending ? "popup__save_loader" : ""}`}
            disabled={isSending}
          >
            {isSending ? "" : button||"Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
// Удалить класс лоадера на кнопке если не используется