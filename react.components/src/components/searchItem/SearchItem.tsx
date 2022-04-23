import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SearchItemType } from '../../interfaces';
import { SearchItemDetails } from '../searchItemDetails/SearchItemDetails';
import { ContextApp } from './../../app/App';
import './searchItem.css';

export function SearchItem(props: SearchItemType) {
  const { state, dispatch } = useContext(ContextApp);
  const handleClick = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLImageElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target !== e.currentTarget) return;
    const activeCard = props.item;

    dispatch({ type: 'toggleCard', payload: { activeCard } });
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
