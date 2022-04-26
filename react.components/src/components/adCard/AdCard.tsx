import React, { useState } from 'react';
import emailImg from '../../assets/svg/mail.svg';
import phoneImg from '../../assets/svg/phone.svg';
import linkImg from '../../assets/svg/forward-next-arrow.svg';
import likeImg from '../../assets/svg/like.svg';
import './adCard.css';
import { CardProps } from '../../interfaces';

export function AdCard(props: { item: CardProps }) {
  const { item } = props;
  const [isFavorite, setIsFavorite] = useState(item.isFavorite);

  const handleClick = () => {
    setIsFavorite((isFavorite) => !isFavorite);
  };

  return (
    <li className="card" data-testid="card-item">
      <img src={item.img} alt="lot img" />
      <h3>
        <strong>{item.title}</strong>
      </h3>
      <div className="card__adress">
        <i>{item.adress}</i>
      </div>
      <div className="card__description" data-testid="card-item__description">
        <p className="card__description-text">{item.description}</p>
      </div>
      <p>
        Date of construction: <span className="card__date">{item.date}</span>
      </p>
      <span className="card__price">
        {item.price}
        {item.currency}
      </span>
      <span className="card__area">{item.area}&#13217;</span>
      <span className="card__type">{item.typeAdd}</span>

      {item.isReady ? (
        <span className="card__ready card__ready-ok">Ready to use &#10003;</span>
      ) : (
        <span className="card__ready card__ready-wait">Need to wait &#10007;</span>
      )}

      <div className="card__links" data-testid="card-item__links">
        <a href={'tel:' + item.phone} className="card__phone">
          <img src={phoneImg} alt="call me" />
        </a>
        <a href={'mailto:' + item.email} className="card__email">
          <img src={emailImg} alt="email me" />
        </a>
        <a href={item.link} target="_blank" className="card__link-to-order" rel="noreferrer">
          <img src={linkImg} alt="go to site" />
        </a>
      </div>
      <button
        className={isFavorite ? 'card__mark-like favorite-add' : 'card__mark-like'}
        onClick={handleClick}
        data-testid="card__mark-like"
      >
        <img src={likeImg} alt="like" />
      </button>
    </li>
  );
}
