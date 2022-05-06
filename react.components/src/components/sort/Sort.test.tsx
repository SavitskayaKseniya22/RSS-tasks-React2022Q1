import Sort from './Sort';
import MainPage from '../../pages/MainPage/MainPage';
import { BrowserRouter } from 'react-router-dom';

import { mockedState } from '../../mockedState';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { mockStore } from '../../mockedStore';
import fetchMock from 'fetch-mock';
import { mockedResponse } from '../../mockedResponse';
import { store } from '../../store';

describe('Sort tests', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  beforeEach(() => {
    fetchMock.restore();
  });
  test('check Sort appearance', async () => {
    render(
      <Provider store={mockStore}>
        <Sort />
      </Provider>
    );

    await waitFor(() => expect(screen.getByTestId('search-sort')).toBeInTheDocument());
    expect((screen.getByTestId('search-sort') as HTMLSelectElement).value).toEqual(
      mockedState.sort
    );
  });

  test('check Sort select new option', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    const search = screen.getByTestId('search-input') as HTMLInputElement;
    await waitFor(() => fireEvent.input(search, { target: { value: 'car' } }));

    fetchMock.mock(
      'https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&page=1&per_page=20&query=car&order_by=latest',
      mockedResponse
    );

    await waitFor(() => fireEvent.submit(screen.getByTestId('search-form')));
    await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());

    fetchMock.mock(
      'https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&page=1&per_page=20&query=car&order_by=popular',
      mockedResponse
    );

    await waitFor(() => userEvent.selectOptions(screen.getByTestId('search-sort'), ['popular']));
    await waitFor(() =>
      expect((screen.getByTestId('search-sort') as HTMLSelectElement).value).toEqual('popular')
    );

    await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());
    await waitFor(() => {
      expect(screen.queryByText('Loading data')).not.toBeInTheDocument();
    });
  });
});
