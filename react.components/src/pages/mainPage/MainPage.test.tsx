import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App, { ContextApp } from '../../app/App';
import {
  SearchResultListMockFull,
  SearchResultListMockLoading,
  SearchResultListMockStart,
} from '../../mockedResponseItem';
import { MainPage } from './MainPage';

describe('MainPage test', () => {
  test('check MainPage page appearance', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  test('check MainPage page appearance', async () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    const mainPage = screen.getByTestId('main-page');
    const searchForm = screen.getByTestId('search-form');
    expect(mainPage).toContainElement(searchForm);
  });

  test('check MainPage restore some data', async () => {
    render(
      <BrowserRouter>
        <ContextApp.Provider
          value={{
            state: SearchResultListMockFull,
            dispatch: () => null,
          }}
        >
          <MainPage />
        </ContextApp.Provider>
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('search-form')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());
  });
});
