import MainPage from '../../pages/MainPage/MainPage';
import SearchResultList from './SearchResultList';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockedState } from '../../mockedState';
import { mockStore } from '../../mockedStore';
import fetchMock from 'fetch-mock';
import { store } from '../../store';

describe('SearchResults tests', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  beforeEach(() => {
    fetchMock.restore();
  });

  test('check SearchResultList page empty search', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.queryByText('search for something')).toBeInTheDocument();
  });

  test('check SearchResultList page error', async () => {
    fetchMock.get(
      'https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&page=1&per_page=20&query=&order_by=latest',
      {
        status: 403,
      }
    );
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => fireEvent.submit(screen.getByTestId('search-form')));

    await waitFor(() => expect(screen.queryByText('something went wrong')).toBeInTheDocument());
    expect(screen.queryByText('no images found')).not.toBeInTheDocument();
    expect(screen.queryByText('search for something')).not.toBeInTheDocument();
  });

  test('check SearchResultList page full', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <SearchResultList />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.queryByText('search for something')).not.toBeInTheDocument();
    expect(screen.queryByText('no images found')).not.toBeInTheDocument();
    expect(screen.queryByText('something went wrong')).not.toBeInTheDocument();
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('card-item').length).toEqual(mockedState?.response?.length);
  });
});
