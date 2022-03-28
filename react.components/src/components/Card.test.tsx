import { fireEvent, render, screen } from '@testing-library/react';
import { Card } from './Card';
import { data } from '../data';

test('check card appearance', () => {
  render(<Card key={1} houseItem={data[0]} />);
  const card = screen.getByTestId('card-item');
  expect(card).toHaveClass('Card');
});

test('check card content', () => {
  render(<Card key={1} houseItem={data[0]} />);
  const card = screen.getByTestId('card-item');
  const shortCard = screen.getByTestId('card-item__short-card');
  expect(card).toContainElement(shortCard);
  const cardDescription = screen.getByTestId('card-item__description');
  expect(card).toContainElement(cardDescription);
  const cardLinks = screen.getByTestId('card-item__links');
  expect(card).toContainElement(cardLinks);
});

test('check like button', () => {
  render(<Card key={1} houseItem={data[0]} />);
  const card = screen.getByTestId('card-item');
  const likeButton = screen.getByTestId('card__mark-like');
  expect(card).toContainElement(likeButton);
  fireEvent.click(likeButton);
  expect(likeButton).toHaveClass('favorite-add');
  fireEvent.click(likeButton);
  expect(likeButton).not.toHaveClass('favorite-add');
});
