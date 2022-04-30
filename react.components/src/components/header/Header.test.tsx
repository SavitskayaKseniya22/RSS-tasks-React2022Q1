import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

describe('header tests', () => {
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
    expect(header).toHaveTextContent('ads');
    expect(header).toHaveTextContent('card');
  });

  test('check link work', async () => {
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
    expect(navLinkMain).toHaveClass('inActiveLink');

    const navLinkAds = screen.getByTestId('ads__link');
    fireEvent.click(navLinkAds);
    expect(navLinkAds).toHaveClass('active-link');
    expect(navLinkAboutUs).toHaveClass('inActiveLink');

    const navLinkCard = screen.getByTestId('card__link');
    fireEvent.click(navLinkCard);
    expect(navLinkCard).toHaveClass('active-link');
    expect(navLinkAds).toHaveClass('inActiveLink');
  });
});
