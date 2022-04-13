import { render, screen } from '@testing-library/react';
import { MainPage } from './MainPage';

test('check MainPage page appearance', () => {
  render(<MainPage />);
  const aboutUsPage = screen.getByTestId('main-page');
  const searchForm = screen.getByTestId('search-form');
  expect(aboutUsPage).toContainElement(searchForm);
});

test('check render all cards', () => {
  render(<MainPage />);
});
