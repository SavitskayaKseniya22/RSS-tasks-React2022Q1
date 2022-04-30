import { NavLink } from 'react-router-dom';
import './header.css';

export function Header() {
  return (
    <header className="header" data-testid="header">
      <NavLink
        data-testid="main-page__link"
        className={({ isActive }) => (isActive ? 'active-link' : 'inActiveLink')}
        to="/"
      >
        main page
      </NavLink>
      <NavLink
        data-testid="about-us__link"
        className={({ isActive }) => (isActive ? 'active-link' : 'inActiveLink')}
        to="/about-us"
      >
        about us
      </NavLink>
      <NavLink
        data-testid="ads__link"
        className={({ isActive }) => (isActive ? 'active-link' : 'inActiveLink')}
        to="/ads"
      >
        ads
      </NavLink>

      <NavLink
        data-testid="card__link"
        className={({ isActive }) => (isActive ? 'active-link' : 'inActiveLink')}
        to="/card"
      >
        card
      </NavLink>
    </header>
  );
}
