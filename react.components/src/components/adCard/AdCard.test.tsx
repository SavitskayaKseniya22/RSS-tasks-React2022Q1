import { AdCard } from './AdCard';
import { fireEvent, render, screen } from '@testing-library/react';

test('check card appearance', () => {
  render(<AdCard />);
  const card = screen.getByTestId('card-item');
  expect(card).toHaveClass('card');
});

test('check card content', () => {
  render(<AdCard />);
  const card = screen.getByTestId('card-item');
  const cardDescription = screen.getByTestId('card-item__description');
  expect(card).toContainElement(cardDescription);
  const cardLinks = screen.getByTestId('card-item__links');
  expect(card).toContainElement(cardLinks);
});

test('check like button', () => {
  render(<AdCard />);
  const card = screen.getByTestId('card-item');
  const likeButton = screen.getByTestId('card__mark-like');
  expect(card).toContainElement(likeButton);
  fireEvent.click(likeButton);
  expect(likeButton).toHaveClass('favorite-add');
  fireEvent.click(likeButton);
  expect(likeButton).not.toHaveClass('favorite-add');
});
