import { render, screen } from '@testing-library/react';
import { MainPage } from './MainPage';
import { data } from '../../data';

test('check MainPage page appearance', () => {
  render(<MainPage />);
  const aboutUsPage = screen.getByTestId('main-page');
  const cardList = screen.getByTestId('card-list');
  expect(aboutUsPage).toContainElement(cardList);
});

test('check render all cards', () => {
  render(<MainPage />);
  const cardList = screen.getAllByTestId('card-item');
  expect(cardList.length).toEqual(data.length);
});
