import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GlobalTypes, SearchItemDetailType } from '../../interfaces';
import './searchItem.css';

const SearchItem = (props: { item: SearchItemDetailType }) => {
  const state = useSelector((state: GlobalTypes) => state, shallowEqual);
  const dispatch = useDispatch();

  const handleClick = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLImageElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target !== e.currentTarget) return;

    dispatch({ type: 'toggleCard', payload: { ...state, activeCard: props.item } });
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
};

export default SearchItem;
