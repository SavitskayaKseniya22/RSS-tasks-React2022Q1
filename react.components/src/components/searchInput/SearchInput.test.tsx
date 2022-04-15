import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { mockedResponse } from '../../mockedResponse';
import { MainPage } from '../../pages/mainPage/MainPage';

describe('SearchInput tests', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  fetchMock.mock(
    'https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&per_page=30&query=car',
    {
      body: mockedResponse,
      status: 200,
    }
  );

  test('check search appearance', () => {
    render(<MainPage />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  test('check input work', () => {
    render(<MainPage />);
    const search = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.input(search, { target: { value: 'car' } });
    expect(search.value).toEqual('car');
  });

  test('check save value', () => {
    const { unmount } = render(<MainPage />);
    const search = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.input(search, { target: { value: 'car' } });
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
    Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
    unmount();
    expect(window.localStorage.setItem).toHaveBeenCalledWith('searchValue', 'car');
    expect(window.localStorage.getItem('searchValue')).toBe('car');
  });

  test('check restore value', () => {
    render(<MainPage />);
    const search = screen.getByTestId('search-input') as HTMLInputElement;
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
    Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
    window.localStorage.setItem('searchValue', 'car');
    expect(search.value).toBe(window.localStorage.getItem('searchValue'));
  });

  test('check search work with results', async () => {
    render(<MainPage />);
    const search = screen.getByTestId('search-input') as HTMLInputElement;
    await waitFor(() => fireEvent.input(search, { target: { value: 'car' } }));

    await waitFor(() =>
      fireEvent.keyDown(screen.getByTestId('search-form') as HTMLFormElement, {
        key: 'Enter',
        code: 'Enter',
        charCode: 13,
      })
    );
    await waitFor(() => expect(screen.getByTestId('active-search')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());
  });

  test('check search work with error', async () => {
    fetchMock.mock(
      'https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&per_page=30&query=car',
      Promise.reject('TypeError: Failed to fetch')
    );

    render(<MainPage />);
    const search = screen.getByTestId('search-input') as HTMLInputElement;
    await waitFor(() => fireEvent.input(search, { target: { value: 'car' } }));
    await waitFor(() =>
      fireEvent.keyDown(screen.getByTestId('search-form') as HTMLFormElement, {
        key: 'Enter',
        code: 'Enter',
        charCode: 13,
      })
    );
    await waitFor(() => expect(screen.getByTestId('error-search')).toBeInTheDocument());
  });
});
