import React from 'react';
import emailImg from '../assets/svg/mail.svg';
import phoneImg from '../assets/svg/phone.svg';
import linkImg from '../assets/svg/forward-next-arrow.svg';
import tempImgHouse from '../assets/svg/temp-house.jpg';
import likeImg from '../assets/svg/like.svg';
import './card.css';

export class Card extends React.Component<
  { houseItem: CardProps; img: string },
  { isFavorite: boolean }
> {
  static defaultProps: { houseItem: CardProps; img: string };
  constructor(props: { houseItem: CardProps; img: string }) {
    super(props);

    this.state = {
      isFavorite: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.setState((state) => ({
      isFavorite: !state.isFavorite,
    }));
    (e.currentTarget as HTMLButtonElement).classList.toggle('favorite-add');
  }

  render() {
    return (
      <li className="Card" data-testid="card-item">
        <figure className="Card__main-img" data-testid="card-item__short-card">
          <img src={this.props.img} alt="lot img" />
          <h3>
            <strong>{this.props.houseItem.name}</strong>
          </h3>
          <figcaption>
            <i>{this.props.houseItem.adress}</i>
          </figcaption>
        </figure>
        <p className="Card__description" data-testid="card-item__description">
          {this.props.houseItem.description}
        </p>
        <span className="Card__price">{this.props.houseItem.price}</span>
        <div className="Card__links" data-testid="card-item__links">
          <a href={'tel:' + this.props.houseItem.phone} className="Card__phone">
            <img src={phoneImg} alt="call me" />
          </a>
          <a href={'mailto:' + this.props.houseItem.email} className="Card__email">
            <img src={emailImg} alt="email me" />
          </a>
          <a
            href={this.props.houseItem.link}
            target="_blank"
            className="Card__link-to-order"
            rel="noreferrer"
          >
            <img src={linkImg} alt="go to site" />
          </a>
        </div>
        <button
          className="Card__mark-like"
          onClick={this.handleClick}
          data-testid="card__mark-like"
        >
          <img src={likeImg} alt="like" />
        </button>
      </li>
    );
  }
}

Card.defaultProps = {
  houseItem: {
    adress: '3014 Tree Frog Lane, Lenexa, Missouri',
    name: 'Ut enim ad minim veniam',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: 'https://www.google.com/',
    email: 'zapeppebraco-8159@yopmail.com',
    phone: '(606) 476-8863',
    price: '550 000$',
  },
  img: tempImgHouse,
};

export interface CardProps {
  adress?: string;
  name?: string;
  description?: string;
  link?: string;
  email?: string;
  phone?: string;
  price?: string;
  date?: string;
  area?: string;
  type?: string;
  isReady?: string;
  currency?: string;
}
