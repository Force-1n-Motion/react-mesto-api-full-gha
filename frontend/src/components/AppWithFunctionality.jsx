
import Main from "./Main/Main.jsx";

import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../Contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import { Link } from "react-router-dom";
import HeaderWithBurger from "./Header/HeaderWithBurger.jsx";

function App() {
  //Попапы
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);

  //Контекст
  const [currentUser, setCurrentUser] = useState({});

  //Карточки
  const [cards, setCards] = useState([]);
  const [isLoadingElements, setIsLoadingElements] = useState(true);
  const [idCardDelete, setIdCardDelete] = useState("");

  const setPopupStates = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
    setIsDeletePopupOpen(false);
  }, []);
  
  const сlosePopupOnEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setPopupStates();
        document.removeEventListener("keydown", сlosePopupOnEsc);
      }
    },
    [setPopupStates]
  );

  const сlosePopup = useCallback(() => {
    setPopupStates();
    document.removeEventListener("keydown", сlosePopupOnEsc);
  }, [setPopupStates, сlosePopupOnEsc]);

  function setEventListtener() {
    document.addEventListener("keydown", сlosePopupOnEsc);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListtener();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListtener();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListtener();
  }

  function handleDeleteClick(idCard) {
    setIdCardDelete(idCard);
    setIsDeletePopupOpen(true);
    setEventListtener();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
    setEventListtener();
  }

  useEffect(() => {
    setIsLoadingElements(true);
    Promise.all([api.getInfo(localStorage.token), api.getCards(localStorage.token)])
      .then(([userBox, cardBox]) => {
        setCurrentUser(userBox);
        setCards(cardBox);
        setIsLoadingElements(false);
      })
      .catch((error) => console.error(`Чрезвычайное происшествие ${error}`));
  }, []);

 
  function handleDeleteCard(evt) {
    evt.preventDefault();
    setIsSending(true);
    api
      .deletecard(idCardDelete, localStorage.token)
      .then(() => {
        setCards(
          cards.filter((item) => {
            return item._id !== idCardDelete;
          })
        );
        сlosePopup();
        setIsSending(false);
      })
      .catch((error) => console.error(`Ошибка удаления карточки ${error}`))
      .finally(() => setIsSending(false));
  }

  function handleUpdateUser(dataUser, resetData) {
    setIsSending(true);
    api
      .setUserInfo(dataUser, localStorage.token)
      .then((res) => {
        setCurrentUser(res);
        сlosePopup();
        resetData();
        setIsSending(false);
      })
      .catch((error) => console.error(`Ошибка редактирования профиля ${error}`))
      .finally(() => setIsSending(false));
  }

  function handleUpdateAvatar(dataUser, resetData,) {
    setIsSending(true);
    api
      .setUserAvatar(dataUser,localStorage.token)
      .then((res) => {
        setCurrentUser(res);
        сlosePopup();
        resetData();
        setIsSending(false);
      })
      .catch((error) => console.error(`Ошибка редактирования аватара ${error}`))
      .finally(() => setIsSending(false));
  }

  function handleAddPlaceSubmit(dataCard, resetData) {
    setIsSending(true);
    api
      .addCard(dataCard, localStorage.token)
      .then((res) => {
        setCards([res, ...cards]);
        сlosePopup();
        resetData();
        setIsSending(false);
      })
      .catch((error) => console.error(`Ошибка добавления карточки ${error}`))
      .finally(() => setIsSending(false));
  }

  const handleClearLocalStorage = () => {
    localStorage.clear();
  };
  

  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <HeaderWithBurger>
          <Link
            className="link__exit"
            style={{ color: "rgba(169, 169, 169, 1)" }}
            to="sign-in"
            onClick={handleClearLocalStorage}
          >
            Выйти
          </Link>
        </HeaderWithBurger>

        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onDelete={handleDeleteClick}
          cards={cards}
          LoadingElements={isLoadingElements}
        />

        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          open={isEditProfilePopupOpen}
          onClose={сlosePopup}
          isSending={isSending}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          open={isEditAvatarPopupOpen}
          onClose={сlosePopup}
          isSending={isSending}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          open={isAddPlacePopupOpen}
          onClose={сlosePopup}
          isSending={isSending}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          button="Да"
          open={isDeletePopupOpen}
          onClose={сlosePopup}
          onSubmit={handleDeleteCard}
          isSending={isSending}
        />

        <ImagePopup
          card={selectedCard}
          open={isImagePopup}
          onClose={сlosePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
