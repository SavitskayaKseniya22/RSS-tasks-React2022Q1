import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ContextApp } from '../../app/App';
import {
  SearchResultListMockFull,
  SearchResultListMockLoading,
  SearchResultListMockStart,
} from '../../mockedResponseItem';
import { MainPage } from './MainPage';

test('check MainPage page appearance', async () => {
  render(
    <BrowserRouter>
      <ContextApp.Provider
        value={{
          state: SearchResultListMockStart,
          dispatch: () => null,
        }}
      >
        <MainPage />
      </ContextApp.Provider>
    </BrowserRouter>
  );

  const mainPage = screen.getByTestId('main-page');
  const searchForm = screen.getByTestId('search-form');
  expect(mainPage).toContainElement(searchForm);
});

test('check MainPage restore some data ', async () => {
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
});
