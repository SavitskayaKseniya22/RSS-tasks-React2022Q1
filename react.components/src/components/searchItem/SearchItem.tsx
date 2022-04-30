import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ContextApp } from '../../../App';
import { SearchItemDetailType } from '../../../interfaces';

import './searchItem.css';

export function SearchItem(props: { item: SearchItemDetailType }) {
  const { dispatch } = useContext(ContextApp);
  const handleClick = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLImageElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target !== e.currentTarget) return;

    dispatch({ type: 'toggleCard', payload: { activeCard: props.item } });
  };

  return (
    <li className="item" data-testid="card-item">
      <NavLink data-testid="card__link" to="/card">
        <img
          data-testid="item__img_preview"
          className="item__img_preview"
          src={props.item.src as string}
          alt="main pic"
          onClick={handleClick}
        />
      </NavLink>
    </li>
  );
}
