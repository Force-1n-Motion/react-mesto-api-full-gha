import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import LikeItems from "../LikeItems/LikeItems";

export default function Card({ card, onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="elements">
      <article className="element">
        {currentUser._id === card.owner._id && (
          <button
            type="button"
            className="element__button-delete"
            onClick={() => onDelete(card._id)}
          />
        )}
        <img
          src={card.link}
          alt={card.name}
          className="element__img"
          onClick={() => onCardClick({ link: card.link, name: card.name })}
        />
        <div className="element__content">
          <h2 className="element__text">{card.name}</h2>
          <LikeItems
            likes={card.likes}
            idDeveloper={currentUser._id}
            idCard={card._id}
          />
        </div>
      </article>
      </div>
  );
}
