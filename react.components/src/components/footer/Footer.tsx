import './footer.css';
import logo from '../../assets/svg/rs-school-js.svg';

export function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div>
        <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
          <img src={logo} alt="logo" width="100" />
        </a>
      </div>
      <div>
        <a href="https://github.com/SavitskayaKseniya22" target="_blank" rel="noreferrer">
          made by Kseniya Savitskaya
        </a>
      </div>
      <div>© 2022</div>
    </footer>
  );
}
