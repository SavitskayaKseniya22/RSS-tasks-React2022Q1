import { render, screen } from '@testing-library/react';
import { MainPage } from './MainPage';

test('check MainPage page appearance', () => {
  render(<MainPage />);
  const aboutUsPage = screen.getByTestId('main-page');
  const cardList = screen.getByTestId('card-list');
  expect(aboutUsPage).toContainElement(cardList);
});
