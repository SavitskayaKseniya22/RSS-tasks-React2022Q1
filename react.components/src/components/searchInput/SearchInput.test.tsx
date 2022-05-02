import MainPage from '../../pages/MainPage/MainPage';
import SearchInput from './SearchInput';
import { BrowserRouter } from 'react-router-dom';

import { mockedResponse } from '../../mockedResponse';
import { mockedStateStart } from '../../mockedState';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { useReducer } from 'react';

describe('SearchInput tests', () => {
  /*
  afterEach(() => {
    fetchMock.restore();
  });

  test('check search appearance', () => {
    render(<MainPage />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  test('check input work', async () => {
    const Wrapper = () => {
      const [state, dispatch] = useReducer(reducer, mockedStateStart);
      return (
        <ContextApp.Provider value={{ state, dispatch }}>
          <SearchInput />
        </ContextApp.Provider>
      );
    };

    render(<Wrapper />);
    const search = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.input(search, { target: { value: 'car' } });
    await waitFor(() => {
      expect(search.value).toEqual('car');
    });
  });

  test('check save value', async () => {
    const Wrapper = () => {
      const [state, dispatch] = useReducer(reducer, mockedStateStart);
      return (
        <ContextApp.Provider value={{ state, dispatch }}>
          <SearchInput />
        </ContextApp.Provider>
      );
    };

    const { unmount } = render(<Wrapper />);
    const search = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.input(search, { target: { value: 'car' } });
    await waitFor(() => {
      expect(search.value).toEqual('car');
    });
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
    Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
    Object.setPrototypeOf(window.localStorage.getItem, jest.fn());

    unmount();

    await waitFor(() => {
      expect(window.localStorage.setItem).toHaveBeenCalledWith('searchValue', 'car');
    });

    expect(window.localStorage.getItem('searchValue')).toBe('car');
  });

  test('check search work with results', async () => {
    fetchMock.mock(
      'https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&page=1&per_page=20&query=car&order_by=latest',
      {
        body: mockedResponse,
        status: 200,
      }
    );
    const Wrapper = () => {
      const [state, dispatch] = useReducer(reducer, mockedStateStart);

      return (
        <BrowserRouter>
          <ContextApp.Provider value={{ state, dispatch }}>
            <MainPage />
          </ContextApp.Provider>
        </BrowserRouter>
      );
    };

    render(<Wrapper />);

    const search = screen.getByTestId('search-input') as HTMLInputElement;
    await waitFor(() => fireEvent.input(search, { target: { value: 'car' } }));

    expect(screen.queryByText('search for something')).toBeInTheDocument();
    await waitFor(() => fireEvent.submit(screen.getByTestId('search-form')));

    expect(screen.queryByText('search for something')).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());
  });

  test('check search work with error', async () => {
    fetchMock.mock(
      'https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&page=1&per_page=20&query=car&order_by=latest',
      () => {
        throw new Error('ERROR');
      }
    );

    const Wrapper = () => {
      const [state, dispatch] = useReducer(reducer, mockedStateStart);

      return (
        <BrowserRouter>
          <ContextApp.Provider value={{ state, dispatch }}>
            <MainPage />
          </ContextApp.Provider>
        </BrowserRouter>
      );
    };

    render(<Wrapper />);
    const search = screen.getByTestId('search-input') as HTMLInputElement;
    await waitFor(() => fireEvent.input(search, { target: { value: 'car' } }));
    await waitFor(() => fireEvent.submit(screen.getByTestId('search-form')));
    await waitFor(() => expect(screen.getByTestId('error-search')).toBeInTheDocument());
  });*/
});
