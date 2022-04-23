import React, { useState } from 'react';
import { SearchItemType } from '../../interfaces';
import '../searchItem/searchItem.css';

export function SearchItemDetails(props: {
  details: SearchItemType;
  handleClick: (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLImageElement>
      | React.MouseEvent<HTMLDivElement>
  ) => void;
}) {
  return (
    <div
      className="item__popup_container"
      onClick={props.handleClick}
      data-testid="item__popup_container"
    >
      <div className="item__popup">
        <img src={props.details.item.src as string} alt="main pic" />
        <ul>
          <li className="item__description" data-testid="item__description">
            <h2>{props.details.item.description || 'Nice picture'}</h2>
          </li>

          <li className="item__likes" data-testid="item__likes">
            <h2>&#9825; {props.details.item.likes || '0'}</h2>
          </li>
          <li className="item__author" data-testid="item__author">
            <h3>Author:</h3> <hr />
            {props.details.item.portfolio ? (
              <a
                data-testid="item__portfolio"
                href={props.details.item.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                {props.details.item.author} &#8690;
              </a>
            ) : (
              props.details.item.author
            )}
          </li>

          <li className="item__location" data-testid="item__location">
            <h3>Location:</h3> <hr />
            {props.details.item.location || 'Unknown'}
          </li>

          <li className="item__size" data-testid="item__size">
            <h3>Size:</h3> <hr />
            {props.details.item.width || 'Unknown'}*{props.details.item.height || 'Unknown'}
          </li>

          <li className="item__links">
            <a href={props.details.item.link as string} target="_blank" rel="noopener noreferrer">
              Fullsize &#8690;
            </a>
            <a
              href={props.details.item.unsplashLink as string}
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash &#8690;
            </a>
          </li>
        </ul>
        <button onClick={props.handleClick} className="item__close" data-testid="item__close">
          Close
        </button>
      </div>
    </div>
  );
}
