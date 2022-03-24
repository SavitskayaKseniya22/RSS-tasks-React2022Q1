import React from 'react';
import emailImg from '../assets/svg/mail.svg';
import phoneImg from '../assets/svg/phone.svg';
import linkImg from '../assets/svg/forward-next-arrow.svg';
import tempImgHouse from '../assets/svg/temp-house.jpg';

import './card.css';

export class Card extends React.Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }
  render() {
    return (
      <li className="Card">
        <figure className="Card__main-img">
          <img src={this.props.src || tempImgHouse} alt="lot img" />
          <h3>
            <strong>{this.props.imgDescription || 'Ut enim ad minim veniam'}</strong>
          </h3>
          <figcaption>
            <i>{this.props.lotAdress || '3014 Tree Frog Lane, Lenexa, Missouri'}</i>
          </figcaption>
        </figure>
        <p className="Card__description">
          {this.props.lotDescription ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
        </p>
        <div className="Card__links">
          <a href={'tel:' + this.props.phone} className="Card__phone">
            <img src={phoneImg} alt="call me" />
          </a>
          <a href={'emailto:' + this.props.email} className="Card__email">
            <img src={emailImg} alt="email me" />
          </a>
          <a
            href={this.props.link || '#'}
            target="_blank"
            className="Card__link-to-order"
            rel="noreferrer"
          >
            <img src={linkImg} alt="go to site" />
          </a>
        </div>
      </li>
    );
  }
}

interface CardProps {
  src?: string;
  lotAdress?: string;
  imgDescription?: string;
  lotDescription?: string;
  link?: string;
  email?: string;
  phone?: string;
}
