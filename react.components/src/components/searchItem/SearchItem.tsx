import React, { useState } from 'react';
import { SearchItemType } from '../../interfaces';
import './searchItem.css';

export const SearchItem = (props: SearchItemType) => {
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
      {isOpen ? (
        <div
          className="item__popup_container"
          onClick={handleClick}
          data-testid="item__popup_container"
        >
          <div className="item__popup">
            <img src={props.item.src as string} alt="main pic" />
            <ul>
              <li className="item__description" data-testid="item__description">
                <h2>{props.item.description || 'Nice picture'}</h2>
              </li>

              <li className="item__likes" data-testid="item__likes">
                <h2>&#9825; {props.item.likes || '0'}</h2>
              </li>
              <li className="item__author" data-testid="item__author">
                <h3>Author:</h3> <hr />
                {props.item.portfolio ? (
                  <a
                    data-testid="item__portfolio"
                    href={props.item.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {props.item.author} &#8690;
                  </a>
                ) : (
                  props.item.author
                )}
              </li>

              <li className="item__location" data-testid="item__location">
                <h3>Location:</h3> <hr />
                {props.item.location || 'Unknown'}
              </li>

              <li className="item__size" data-testid="item__size">
                <h3>Size:</h3> <hr />
                {props.item.width || 'Unknown'}*{props.item.height || 'Unknown'}
              </li>

              <li className="item__links">
                <a href={props.item.link as string} target="_blank" rel="noopener noreferrer">
                  Fullsize &#8690;
                </a>
                <a
                  href={props.item.unsplashLink as string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unsplash &#8690;
                </a>
              </li>
            </ul>
            <button onClick={handleClick} className="item__close" data-testid="item__close">
              Close
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </li>
  );
};
