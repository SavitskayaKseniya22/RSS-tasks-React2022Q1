import React from 'react';
import emailImg from '../assets/svg/mail.svg';
import phoneImg from '../assets/svg/phone.svg';
import linkImg from '../assets/svg/forward-next-arrow.svg';
import tempImgHouse from '../assets/svg/temp-house.jpg';
import likeImg from '../assets/svg/like.svg';
import likeImgFavorite from '../assets/svg/like-favorite.svg';

import './card.css';

export class Card extends React.Component<CardProps, { isFavorite: boolean }> {
  static defaultProps: CardProps;
  constructor(props: CardProps) {
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
    (e.target as HTMLButtonElement).classList.toggle('favorite-add');
  }

  render() {
    return (
      <li className="Card">
        <figure className="Card__main-img">
          <img src={this.props.img} alt="lot img" />
          <h3>
            <strong>{this.props.name}</strong>
          </h3>
          <figcaption>
            <i>{this.props.adress}</i>
          </figcaption>
        </figure>
        <p className="Card__description">{this.props.description}</p>
        <div className="Card__links">
          <a href={'tel:' + this.props.phone} className="Card__phone">
            <img src={phoneImg} alt="call me" />
          </a>
          <a href={'mailto:' + this.props.email} className="Card__email">
            <img src={emailImg} alt="email me" />
          </a>
          <a
            href={this.props.link}
            target="_blank"
            className="Card__link-to-order"
            rel="noreferrer"
          >
            <img src={linkImg} alt="go to site" />
          </a>
          <button className="Card__mark-like" onClick={this.handleClick}>
            <img src={likeImg} alt="like" />
          </button>
        </div>
      </li>
    );
  }
}

Card.defaultProps = {
  img: tempImgHouse,
  adress: '3014 Tree Frog Lane, Lenexa, Missouri',
  name: 'Ut enim ad minim veniam',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  link: '#',
  email: '',
  phone: '',
};

interface CardProps {
  img?: string;
  adress?: string;
  name?: string;
  description?: string;
  link?: string;
  email?: string;
  phone?: string;
}
