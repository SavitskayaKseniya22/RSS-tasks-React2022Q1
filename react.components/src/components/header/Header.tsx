import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import { ContextApp } from './../../app/App';
import './header.css';

export function Header() {
  const { state, dispatch } = useContext(ContextApp);
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
