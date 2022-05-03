import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SearchItemDetailType } from '../../interfaces';
import { handleActiveCard } from '../../store';
import './searchItem.css';

const SearchItem = (props: { item: SearchItemDetailType }) => {
  const dispatch = useDispatch();

  const handleClick = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLImageElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target !== e.currentTarget) return;

    dispatch(handleActiveCard(props.item));
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
