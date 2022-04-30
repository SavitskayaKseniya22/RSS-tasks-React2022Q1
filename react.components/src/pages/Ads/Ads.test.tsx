import Ads from './Ads';
import { MemoryRouter } from 'react-router-dom';
import App, { ContextApp } from '../../App';
import { mockedState } from '../../mockedState';
import { render, screen } from '@testing-library/react';

describe('myAds test', () => {
  test('check Ads page appearance with link', () => {
    render(
      <MemoryRouter initialEntries={['/ads']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('ads')).toBeInTheDocument();
  });

  test('check Ads page appearance without state', () => {
    render(<Ads />);

    expect(screen.getByTestId('ads')).toBeInTheDocument();
    expect(screen.getByText('advertisements')).toBeInTheDocument();
    expect(screen.getByTestId('form-ad')).toBeInTheDocument();
    expect(screen.getByTestId('ads').childNodes.length).toBe(2);
  });

  test('check Ads page appearance with state', () => {
    render(
      <ContextApp.Provider
        value={{
          state: mockedState,
          dispatch: () => null,
        }}
      >
        <Ads />
      </ContextApp.Provider>
    );

    expect(screen.getByTestId('ads')).toBeInTheDocument();
    expect(screen.getByText('advertisements')).toBeInTheDocument();
    expect(screen.getByTestId('form-ad')).toBeInTheDocument();
    expect(screen.getByTestId('ads-list')).toBeInTheDocument();
    expect(screen.getByTestId('ads').childNodes.length).toBe(3);
  });
});
