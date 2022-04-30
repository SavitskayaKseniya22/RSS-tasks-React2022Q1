import { BrowserRouter } from 'react-router-dom';
import { ContextApp } from '../../App';
import { SearchResultList } from './SearchResultList';
import {
  mockedStateLoading,
  mockedStateError,
  mockedStateEmpty,
  mockedStateStart,
  mockedState,
} from '../../mockedState';
import { render, screen } from '@testing-library/react';

describe('SearchResults tests', () => {
  test('check SearchResultList page download', () => {
    render(
      <BrowserRouter>
        <ContextApp.Provider
          value={{
            state: mockedStateLoading,
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
            state: mockedStateError,
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
            state: mockedStateEmpty,
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
            state: mockedStateStart,
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
            state: mockedState,
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
    expect(screen.getAllByTestId('card-item').length).toEqual(mockedState.response.length);
  });
});
