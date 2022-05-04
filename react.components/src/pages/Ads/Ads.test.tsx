import Ads from './Ads';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { mockStore } from '../../mockedStore';

describe('myAds test', () => {
  test('check Ads page appearance with link', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/ads']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('ads')).toBeInTheDocument();
  });

  test('check Ads page appearance without state', () => {
    render(
      <Provider store={store}>
        <Ads />
      </Provider>
    );

    expect(screen.getByTestId('ads')).toBeInTheDocument();
    expect(screen.getByText('advertisements')).toBeInTheDocument();
    expect(screen.getByTestId('form-ad')).toBeInTheDocument();
    expect(screen.getByTestId('ads').childNodes.length).toBe(2);
  });

  test('check Ads page appearance with state', () => {
    render(
      <Provider store={mockStore}>
        <Ads />
      </Provider>
    );

    expect(screen.getByTestId('ads')).toBeInTheDocument();
    expect(screen.getByText('advertisements')).toBeInTheDocument();
    expect(screen.getByTestId('form-ad')).toBeInTheDocument();
    expect(screen.getByTestId('ads-list')).toBeInTheDocument();
    expect(screen.getByTestId('ads').childNodes.length).toBe(3);
  });
});
