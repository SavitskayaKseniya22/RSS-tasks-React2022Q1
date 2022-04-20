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
        data-testid="my-ads__link"
        className={({ isActive }) => (isActive ? 'active-link' : 'inActiveLink')}
        to="/my-ads"
      >
        my ads
      </NavLink>
    </header>
  );
}
