import React, { useState } from "react";
import Header from "../Header/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";
import { signup } from "../../utils/auth"; // Импортируем функцию signup из auth.js

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const history = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password) // Вызываем функцию signup для отправки запроса на регистрацию
      .then((response) => {
        console.log(response.data);
        setIsSuccess(true);
        // Сохраняем JWT токен в localStorage
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.error("Ошибка регистрации:", error);
        setIsError(true);
      });
  };


  return (
    <div>
      <Header>
        <Link className="link" to="/sign-in">
          Войти
        </Link>
      </Header>
      <h2 className="login__text">Регистрация</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <hr  />
        <input
          className="input"
          type="password"
          required
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
        />
        <hr  />
        <input
          className="button__login"
          type="submit"
          value="Зарегистрироваться"
        />
        <Link className="link__login" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>

      <InfoTooltip
        isOpen={isSuccess || isError}
        onClose={() => {
          if (isSuccess) {
            history("/sign-in");
          }
          setIsSuccess(false);
          setIsError(false);
        }}
        isSuccessful={isSuccess}
      />
    </div>
  );
};

export default Register;
