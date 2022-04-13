import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

test('check link appearance', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const header = screen.getByTestId('header');
  expect(header).toHaveClass('header');
  expect(header).toHaveTextContent('main page');
  expect(header).toHaveTextContent('about us');

  const navLinkMain = screen.getByTestId('main-page__link');
  fireEvent.click(navLinkMain);
  expect(navLinkMain).toHaveClass('active-link');

  const navLinkAboutUs = screen.getByTestId('about-us__link');
  fireEvent.click(navLinkAboutUs);
  expect(navLinkAboutUs).toHaveClass('active-link');
});

test('check link work', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const navLinkMain = screen.getByTestId('main-page__link');
  fireEvent.click(navLinkMain);
  expect(navLinkMain).toHaveClass('active-link');

  const navLinkAboutUs = screen.getByTestId('about-us__link');
  fireEvent.click(navLinkAboutUs);
  expect(navLinkAboutUs).toHaveClass('active-link');
});
