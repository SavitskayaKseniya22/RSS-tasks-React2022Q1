import { MainPage } from './MainPage';
import { render, screen } from '@testing-library/react';

test('check MainPage page appearance', () => {
  render(<MainPage />);
  const mainPage = screen.getByTestId('main-page');
  const searchForm = screen.getByTestId('search-form');
  expect(mainPage).toContainElement(searchForm);
});
