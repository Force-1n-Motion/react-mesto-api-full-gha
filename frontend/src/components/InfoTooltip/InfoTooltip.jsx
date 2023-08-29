import React from "react";
import ErrorLogo from "../../images/Union.png";
import SuccessLogo from "../../images/Success.png";
const InfoTooltip = ({ isOpen, onClose, isSuccessful }) => {
  return (
      <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          {isSuccessful ? (
            <div className="popup__content">
              <img src={SuccessLogo} alt="Успешная регистрация" />
              <h2>Вы успешно <br /> зарегистрировались!</h2>
            </div>
          ) : (
            <div className="popup__content">
              <img src={ErrorLogo} alt="Ошибка!" />
              <h2>
                Что-то пошло не так! <br /> Попробуйте ещё раз.
              </h2>
            </div>
          )}
          <button className="popup__close" onClick={onClose}></button>
        </div>
      </div>
  );
};

export default InfoTooltip;
