import ResultsPerPage from './ResultsPerPage';
import MainPage from '../../pages/MainPage/MainPage';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { mockedState } from '../../mockedState';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { mockStore } from '../../mockedStore';
import { store } from '../../store';
import fetchMock from 'fetch-mock';
import { mockedResponse } from '../../mockedResponse';

describe('ResultsPerPage tests', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  beforeEach(() => {
    fetchMock.restore();
  });
  test('check Sort appearance', async () => {
    render(
      <Provider store={mockStore}>
        <ResultsPerPage />
      </Provider>
    );

    await waitFor(() => expect(screen.getByTestId('search-per-page')).toBeInTheDocument());
    expect((screen.getByTestId('search-per-page') as HTMLSelectElement).value).toEqual(
      mockedState.itemsPerPage
    );
  });

  test('check Sort select new option', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.queryByText('no images found')).toBeInTheDocument());

    const search = screen.getByTestId('search-input') as HTMLInputElement;
    await waitFor(() => fireEvent.input(search, { target: { value: 'car' } }));

    fetchMock.mock(
      'https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&page=1&per_page=20&query=car&order_by=latest',
      mockedResponse
    );

    await waitFor(() => fireEvent.submit(screen.getByTestId('search-form')));
    await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());

    fetchMock.mock(
      'https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&page=1&per_page=30&query=car&order_by=latest',
      mockedResponse
    );

    await waitFor(() =>
      fireEvent.input(screen.getByTestId('search-per-page'), { target: { value: '30' } })
    );
    await waitFor(() =>
      expect((screen.getByTestId('search-per-page') as HTMLInputElement).value).toEqual('30')
    );

    expect(fetchMock.called()).toBe(true);
  });
});
