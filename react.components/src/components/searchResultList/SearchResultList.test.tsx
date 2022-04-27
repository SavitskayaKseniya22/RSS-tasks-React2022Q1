import { render, screen } from '@testing-library/react';
import { SearchResultList } from './SearchResultList';
import { ContextApp } from './../../app/App';
import { BrowserRouter } from 'react-router-dom';
import {
  SearchResultListMockEmpty,
  SearchResultListMockError,
  SearchResultListMockFull,
  SearchResultListMockLoading,
  SearchResultListMockStart,
} from '../../mockedResponseItem';

test('check SearchResultList page download', () => {
  render(
    <BrowserRouter>
      <ContextApp.Provider
        value={{
          state: SearchResultListMockLoading,
          dispatch: () => null,
        }}
      >
        <SearchResultList />
      </ContextApp.Provider>
    </BrowserRouter>
  );

  expect(screen.getByTestId('active-search')).toBeInTheDocument();
  expect(screen.queryByText('no images found')).not.toBeInTheDocument();
  expect(screen.queryByText('search for something')).not.toBeInTheDocument();
  expect(screen.queryByText('something went wrong')).not.toBeInTheDocument();
});

test('check SearchResultList page error', () => {
  render(
    <BrowserRouter>
      <ContextApp.Provider
        value={{
          state: SearchResultListMockError,
          dispatch: () => null,
        }}
      >
        <SearchResultList />
      </ContextApp.Provider>
    </BrowserRouter>
  );
  expect(screen.queryByText('something went wrong')).toBeInTheDocument();
  expect(screen.queryByText('no images found')).not.toBeInTheDocument();
  expect(screen.queryByText('search for something')).not.toBeInTheDocument();
});

test('check SearchResultList for empty search', () => {
  render(
    <BrowserRouter>
      <ContextApp.Provider
        value={{
          state: SearchResultListMockEmpty,
          dispatch: () => null,
        }}
      >
        <SearchResultList />
      </ContextApp.Provider>
    </BrowserRouter>
  );

  expect(screen.queryByText('no images found')).toBeInTheDocument();
  expect(screen.queryByText('something went wrong')).not.toBeInTheDocument();
  expect(screen.queryByText('search for something')).not.toBeInTheDocument();
});

test('check SearchResultList page empty', () => {
  render(
    <BrowserRouter>
      <ContextApp.Provider
        value={{
          state: SearchResultListMockStart,
          dispatch: () => null,
        }}
      >
        <SearchResultList />
      </ContextApp.Provider>
    </BrowserRouter>
  );
  expect(screen.queryByText('search for something')).toBeInTheDocument();
  expect(screen.queryByText('no images found')).not.toBeInTheDocument();
  expect(screen.queryByText('something went wrong')).not.toBeInTheDocument();
});

test('check SearchResultList page full', () => {
  render(
    <BrowserRouter>
      <ContextApp.Provider
        value={{
          state: SearchResultListMockFull,
          dispatch: () => null,
        }}
      >
        <SearchResultList />
      </ContextApp.Provider>
    </BrowserRouter>
  );
  expect(screen.queryByText('search for something')).not.toBeInTheDocument();
  expect(screen.queryByText('no images found')).not.toBeInTheDocument();
  expect(screen.queryByText('something went wrong')).not.toBeInTheDocument();
  expect(screen.getByTestId('card-list')).toBeInTheDocument();
  expect(screen.getAllByTestId('card-item').length).toEqual(
    SearchResultListMockFull.response.length
  );
});
