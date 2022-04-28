import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ContextApp, reducer } from '../../app/App';
import { SearchResultListMockFull, SearchResultListMockStart } from '../../mockedResponseItem';
import { MainPage } from '../../pages/mainPage/MainPage';
import { Pagination } from './Pagination';

test('check Pagination appearance', async () => {
  render(
    <ContextApp.Provider
      value={{
        state: SearchResultListMockFull,
        dispatch: () => null,
      }}
    >
      <Pagination />
    </ContextApp.Provider>
  );

  await waitFor(() => expect(screen.getByTestId('search-page-number')).toBeInTheDocument());
  expect((screen.getByTestId('search-page-number') as HTMLInputElement).value).toEqual(
    SearchResultListMockFull.pageNumber
  );

  expect((screen.getByTestId('search-page-number-start') as HTMLButtonElement).textContent).toEqual(
    '1'
  );

  expect((screen.getByTestId('search-page-number-end') as HTMLSelectElement).textContent).toEqual(
    String(SearchResultListMockFull.maxPageNumber)
  );
});

test('check Pagination change page in input', async () => {
  const Wrapper = () => {
    const [state, dispatch] = useReducer(reducer, SearchResultListMockFull);
    return (
      <ContextApp.Provider value={{ state, dispatch }}>
        <Pagination />
      </ContextApp.Provider>
    );
  };

  render(<Wrapper />);
  await waitFor(() =>
    fireEvent.change(screen.getByTestId('search-page-number'), { target: { value: '30' } })
  );

  await waitFor(() =>
    expect((screen.getByTestId('search-page-number') as HTMLInputElement).value).toEqual('30')
  );
});

test('check Pagination buttons start and end', async () => {
  const Wrapper = () => {
    const [state, dispatch] = useReducer(reducer, SearchResultListMockFull);
    return (
      <BrowserRouter>
        <ContextApp.Provider value={{ state, dispatch }}>
          <MainPage />
        </ContextApp.Provider>
      </BrowserRouter>
    );
  };

  render(<Wrapper />);

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
      String(SearchResultListMockFull.maxPageNumber)
    )
  );
  await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());
});
