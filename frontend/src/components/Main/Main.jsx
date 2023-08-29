import { useContext } from "react";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import Loader from "../Loader/Loader.jsx";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onDelete,
  cards,
  LoadingElements,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <img
            src={currentUser.avatar ? currentUser.avatar : "#"}
            alt="Фото профиля"
            className="profile__avatar"
          />
          <button
            type="button"
            className="profile__avatar-button"
            onClick={onEditAvatar}
            aria-label="Изменить аватар"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">
            {currentUser.name ? currentUser.name : ""}
          </h1>
          <p className="profile__text">
            {currentUser.about ? currentUser.about : ""}
          </p>
          <button
            type="button"
            className="profile__edit"
            onClick={onEditProfile}
            aria-label="Редактировать профиль"
          />
        </div>
        <button
          type="button"
          className="profile__add-card"
          onClick={onAddPlace}
          aria-label="Добавить карточку"
        />
      </section>
      <section className="elements" aria-label="Галерея">
        {LoadingElements ? (
          <Loader />
        ) : (
          cards.map((data) => {
            return (
              <div key={data._id}>
                <Card
                  card={data}
                  onCardClick={onCardClick}
                  onDelete={onDelete}
                />
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}
