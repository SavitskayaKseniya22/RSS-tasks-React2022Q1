import SearchItem from './SearchItem';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { mockedResponse, mockedResponseItem } from '../../mockedResponse';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore, mockStoreStart } from '../../mockedStore';
import App from '../../App';
import userEvent from '@testing-library/user-event';
import { store } from '../../store';
import fetchMock from 'fetch-mock';
import { wait } from '@testing-library/user-event/dist/utils';

describe('SearchItem test', () => {
  test('check searchItem appearance', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <SearchItem item={mockedResponseItem} />
        </Provider>
      </BrowserRouter>
    );
    const searchItem = screen.getByTestId('card-item');
    expect(searchItem).toHaveClass('item');
    expect(screen.getByTestId('item__img_preview')).toBeInTheDocument();
  });

  test('check searchItem transition to details', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={mockStore}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    const searchItem = screen.getAllByTestId('item__link')[0];
    expect(screen.getByTestId('main-page__link')).toHaveClass('active-link');
    expect(screen.getByTestId('card__link')).not.toHaveClass('active-link');
    userEvent.click(searchItem);
    expect(screen.getByTestId('card__link')).toHaveClass('active-link');
  });

  test('check back to searchItem from details', () => {
    render(
      <MemoryRouter initialEntries={['/card']}>
        <Provider store={mockStore}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('card__link')).toHaveClass('active-link');
    expect(screen.getByTestId('main-page__link')).not.toHaveClass('active-link');
    userEvent.click(screen.getByTestId('item__close'));
    expect(screen.getByTestId('main-page__link')).toHaveClass('active-link');
  });

  test('check empty route to card', async () => {
    fetchMock.mock(
      'https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&page=1&per_page=20&query=car&order_by=latest',
      {
        body: mockedResponse,
        status: 200,
      }
    );
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={mockStoreStart}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('main-page__link')).toHaveClass('active-link');
    userEvent.click(screen.getByTestId('card__link'));
    expect(screen.getByTestId('main-page__link')).toHaveClass('active-link');

    /*

    const search = screen.getByTestId('search-input') as HTMLInputElement;

    fireEvent.input(search, { target: { value: 'car' } });

    await waitFor(() => fireEvent.submit(screen.getByTestId('search-form')));

    await waitFor(() => {
      expect(screen.queryByText('Loading data')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      userEvent.click(screen.getAllByTestId('item__link')[0]);
    });

    wait();
    screen.debug();
    // expect(screen.getByTestId('card__link')).toHaveClass('active-link');
    //
    fetchMock.restore();*/
  });
});
