import App from '../../App';
import MainPage from './MainPage';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import { store } from '../../store';
import { mockStore } from '../../mockedStore';

describe('MainPage test', () => {
  test('check MainPage page appearance', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  test('check MainPage page appearance', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    const mainPage = screen.getByTestId('main-page');
    const searchForm = screen.getByTestId('search-form');
    expect(mainPage).toContainElement(searchForm);
  });

  test('check MainPage restore some data', async () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <MainPage />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('search-form')).toBeInTheDocument());
  });
});
