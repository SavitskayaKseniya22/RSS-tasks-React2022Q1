import { fireEvent, render, screen } from '@testing-library/react';
import { AdCard } from './AdCard';
import tempImgHouse from '../../assets/svg/temp-house.jpg';

describe('check forming card with data', () => {
  const defaultData = {
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
    isFavorite: false,
  };

  test('check card appearance', () => {
    render(<AdCard item={defaultData} />);
    const card = screen.getByTestId('card-item');
    expect(card).toHaveClass('card');
  });

  test('check card content', () => {
    render(<AdCard item={defaultData} />);
    const card = screen.getByTestId('card-item');
    const cardDescription = screen.getByTestId('card-item__description');
    expect(card).toContainElement(cardDescription);
    const cardLinks = screen.getByTestId('card-item__links');
    expect(card).toContainElement(cardLinks);
  });

  test('check like button', () => {
    render(<AdCard item={defaultData} />);
    const card = screen.getByTestId('card-item');
    const likeButton = screen.getByTestId('card__mark-like');
    expect(card).toContainElement(likeButton);
    fireEvent.click(likeButton);
    expect(likeButton).toHaveClass('favorite-add');
    fireEvent.click(likeButton);
    expect(likeButton).not.toHaveClass('favorite-add');
  });
});
