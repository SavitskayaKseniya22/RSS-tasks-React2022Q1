import React, { useState } from 'react';
import { SearchItemType } from '../../interfaces';
import { SearchItemDetails } from '../searchItemDetails/SearchItemDetails';
import './searchItem.css';

export function SearchItem(props: SearchItemType) {
  const [isOpen, setOpen] = useState(false);
  const handleClick = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLImageElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target !== e.currentTarget) return;
    setOpen(!isOpen);
  };

  return (
    <li className="item" data-testid="card-item">
      <img
        data-testid="item__img_preview"
        className="item__img_preview"
        src={props.item.src as string}
        alt="main pic"
        onClick={handleClick}
      />
      {isOpen ? <SearchItemDetails details={props} handleClick={handleClick} /> : null}
    </li>
  );
}
