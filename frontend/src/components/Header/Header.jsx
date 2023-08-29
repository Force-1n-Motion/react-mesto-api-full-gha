import logo from "../../images/logo.png";
export default function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      {props.children}

      
    </header>
  );
}
