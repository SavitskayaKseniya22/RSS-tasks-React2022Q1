import React, { useState } from 'react';
import emailImg from '../../assets/svg/mail.svg';
import phoneImg from '../../assets/svg/phone.svg';
import linkImg from '../../assets/svg/forward-next-arrow.svg';
import tempImgHouse from '../../assets/svg/temp-house.jpg';
import likeImg from '../../assets/svg/like.svg';
import './adCard.css';
import { CardProps } from '../../interfaces';

export function Card(props: { item: CardProps }) {
  const [state, setState] = useState({
    isFavorite: false,
  });

  const handleClick = () => {
    setState((state) => ({ isFavorite: !state.isFavorite }));
  };

  return (
    <li className="card" data-testid="card-item">
      <img src={props.item.img} alt="lot img" />
      <h3>
        <strong>{props.item.title}</strong>
      </h3>
      <div className="card__adress">
        <i>{props.item.adress}</i>
      </div>
      <div className="card__description" data-testid="card-item__description">
        <p className="card__description-text">{props.item.description}</p>
      </div>
      <p>
        Date of construction: <span className="card__date">{props.item.date}</span>{' '}
      </p>
      <span className="card__price">
        {props.item.price}
        {props.item.currency}
      </span>
      <span className="card__area">{props.item.area}&#13217;</span>
      <span className="card__type">{props.item.typeAdd}</span>

      {props.item.isReady ? (
        <span className="card__ready card__ready-ok">Ready to use &#10003;</span>
      ) : (
        <span className="card__ready card__ready-wait">Need to wait &#10007;</span>
      )}

      <div className="card__links" data-testid="card-item__links">
        <a href={'tel:' + props.item.phone} className="card__phone">
          <img src={phoneImg} alt="call me" />
        </a>
        <a href={'mailto:' + props.item.email} className="card__email">
          <img src={emailImg} alt="email me" />
        </a>
        <a href={props.item.link} target="_blank" className="card__link-to-order" rel="noreferrer">
          <img src={linkImg} alt="go to site" />
        </a>
      </div>
      <button
        className={state.isFavorite ? 'card__mark-like favorite-add' : 'card__mark-like'}
        onClick={handleClick}
        data-testid="card__mark-like"
      >
        <img src={likeImg} alt="like" />
      </button>
    </li>
  );
}

Card.defaultProps = {
  item: {
    adress: '3014 Tree Frog Lane, Lenexa, Missouri',
    title: 'Ut enim ad minim veniam',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: 'https://www.google.com/',
    email: 'zapeppebraco-8159@yopmail.com',
    phone: '(606) 476-8863',
    price: '550 000$',
    date: '2000-01-01',
    area: '100',
    typeAdd: 'sale',
    isReady: true,
    currency: '$',
    img: tempImgHouse,
  },
};
