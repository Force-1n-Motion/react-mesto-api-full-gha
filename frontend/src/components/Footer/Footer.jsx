export default function Footer() {
    const today = new Date()
    const year = today.getFullYear()
    return (
      <footer className="footer">
        <p className="footer__text">
          <button className="button__theme">© {year} Mesto Russia</button>
        </p>
      </footer>
    );
  }
