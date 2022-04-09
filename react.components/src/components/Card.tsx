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
        <img src={this.props.img} alt="lot img" />
        <h3>
          <strong>{this.props.houseItem.name}</strong>
        </h3>
        <div className="Card__adress">
          <i>{this.props.houseItem.adress}</i>
        </div>
        <div className="Card__description" data-testid="card-item__description">
          <p className="Card__description_text">{this.props.houseItem.description}</p>
        </div>
        <p>
          Date of construction: <span className="Card__date">{this.props.houseItem.date}</span>{' '}
        </p>
        <span className="Card__price">
          {this.props.houseItem.price}
          {this.props.houseItem.currency}
        </span>
        <span className="Card__area">{this.props.houseItem.area}&#13217;</span>

        <span className="Card__type">{this.props.houseItem.type}</span>

        {this.props.houseItem.isReady ? (
          <span className="Card__ready Card__ready_ok">Ready to use &#10003;</span>
        ) : (
          <span className="Card__ready Card__ready_wait">Need to wait &#10007;</span>
        )}

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
    date: '2000-01-01',
    area: '100',
    type: 'sale',
    isReady: true,
    currency: '$',
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
  isReady?: boolean;
  currency?: string;
}
