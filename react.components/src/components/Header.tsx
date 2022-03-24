import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

export class Header extends React.Component {
  constructor(props: string) {
    super(props);
  }
  render() {
    return (
      <header className="App-header">
        <NavLink
          className={({ isActive }) => (isActive ? 'activeLink' : 'inActiveLink')}
          to="/home"
        >
          main page
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'activeLink' : 'inActiveLink')}
          to="/about-us"
        >
          about us
        </NavLink>
      </header>
    );
  }
}
