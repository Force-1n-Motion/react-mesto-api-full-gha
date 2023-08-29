export default function ImagePopup({card, open, onClose}) {
  return (
    <div className={`popup popup-images ${open ? "popup_opened" : ""}`} onClick={onClose}>
      <div className="popup__container-images" onClick={(evt => evt.stopPropagation())}>
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}/>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}
 