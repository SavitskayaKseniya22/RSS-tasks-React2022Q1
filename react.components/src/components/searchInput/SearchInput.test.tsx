import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import fetchMock from 'fetch-mock';
import { useReducer } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { ContextApp, initialValues, reducer } from '../../app/App';
import { mockedResponse } from '../../mockedResponse';
import { SearchResultListMockStart } from '../../mockedResponseItem';
import { MainPage } from '../../pages/mainPage/MainPage';
import { SearchInput } from './SearchInput';

describe('SearchInput tests', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  fetchMock.mock(
    'https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&page=1&per_page=20&query=car&order_by=latest',
    {
      body: mockedResponse,
      status: 200,
    }
  );

  test('check search appearance', () => {
    render(<MainPage />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  test('check input work', async () => {
    const Wrapper = () => {
      const [state, dispatch] = useReducer(reducer, SearchResultListMockStart);
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
      const [state, dispatch] = useReducer(reducer, SearchResultListMockStart);
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

  test('check restore value', async () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
    Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
    Object.setPrototypeOf(window.localStorage.getItem, jest.fn());

    await waitFor(() => {
      window.localStorage.setItem('searchValue', 'car');
    });

    const Wrapper = () => {
      const [state, dispatch] = useReducer(reducer, {
        value: window.localStorage.getItem('searchValue') || '',
        response: [],
        isDownloading: false,
        isSearchOver: false,
        isError: false,
        activeCard: undefined,
        sort: 'latest',
        itemsPerPage: '20',
        pageNumber: '1',
        maxPageNumber: 10,
        isMounted: false,
        savedCards: [],
      });

      return (
        <ContextApp.Provider value={{ state, dispatch }}>
          <SearchInput />
        </ContextApp.Provider>
      );
    };
    render(<Wrapper />);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('searchValue', 'car');
    expect(window.localStorage.getItem).toHaveBeenCalled();
    expect(window.localStorage.getItem).toHaveBeenCalledWith('searchValue');
    //expect(window.localStorage.getItem).toHaveReturnedWith('car');
    //const search = screen.getByTestId('search-input') as HTMLInputElement;
    /*
    await waitFor(() => {
      expect(search.value).toBe(window.localStorage.getItem('searchValue'));
    });*/
  });

  test('check search work with results', async () => {
    const Wrapper = () => {
      const [state, dispatch] = useReducer(reducer, SearchResultListMockStart);

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
    await waitFor(() => expect(screen.getByTestId('active-search')).toBeInTheDocument());
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
      const [state, dispatch] = useReducer(reducer, SearchResultListMockStart);

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
  });
});
