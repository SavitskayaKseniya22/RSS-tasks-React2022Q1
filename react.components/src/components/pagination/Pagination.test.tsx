import MainPage from '../../pages/MainPage/MainPage';
import Pagination from './Pagination';
import { BrowserRouter } from 'react-router-dom';
import { mockedState } from '../../mockedState';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { mockStore } from '../../mockedStore';

describe('Pagination tests', () => {
  test('check Pagination appearance', async () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Pagination />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByTestId('search-page-number')).toBeInTheDocument());
    expect((screen.getByTestId('search-page-number') as HTMLInputElement).value).toEqual(
      mockedState.pageNumber
    );

    expect(
      (screen.getByTestId('search-page-number-start') as HTMLButtonElement).textContent
    ).toEqual('1');

    expect((screen.getByTestId('search-page-number-end') as HTMLSelectElement).textContent).toEqual(
      String(mockedState.maxPageNumber)
    );
  });

  test('check Pagination change page in input', async () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Pagination />
        </Provider>
      </BrowserRouter>
    );
    await waitFor(() =>
      fireEvent.change(screen.getByTestId('search-page-number'), { target: { value: '30' } })
    );

    await waitFor(() =>
      expect((screen.getByTestId('search-page-number') as HTMLInputElement).value).toEqual('30')
    );
  });

  test('check Pagination buttons start and end', async () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <MainPage />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => userEvent.click(screen.getByTestId('search-page-number-start')));
    await waitFor(() =>
      expect((screen.getByTestId('search-page-number') as HTMLInputElement).value).toEqual('1')
    );
    expect(screen.getByText('Loading data')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());
    await waitFor(() => {
      expect(screen.queryByText('Loading data')).not.toBeInTheDocument();
    });

    await waitFor(() => userEvent.click(screen.getByTestId('search-page-number-end')));

    await waitFor(() =>
      expect((screen.getByTestId('search-page-number') as HTMLInputElement).value).toEqual(
        String(mockedState.maxPageNumber)
      )
    );
    await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());
  });
});
