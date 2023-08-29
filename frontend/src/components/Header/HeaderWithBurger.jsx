import logo from "../../images/logo.png";
import { useState } from "react";


export default function HeaderWithBurger(props) {
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setActive(!active);
  };
 
  return (
    <header className={`header nav ${active ? "active" : ""}`}>
      <img src={logo} alt="Логотип" className="header__logo" />
 
      <nav>
        <div
          className={`menu-icon ${active ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`menu ${active ? "active" : ""}`}>
          <li>
            
            <span className="email__header">
              {localStorage.getItem("email")}
            </span>
          </li>
          <li> {props.children}</li>
        </ul>
      </nav>
    </header>
  );
}
