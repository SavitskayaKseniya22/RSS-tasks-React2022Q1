import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ContextApp, reducer } from '../../app/App';
import { SearchResultListMockFull, SearchResultListMockStart } from '../../mockedResponseItem';
import { MainPage } from '../../pages/mainPage/MainPage';
import { ResultsPerPage } from './ResultsPerPage';

test('check Sort appearance', async () => {
  render(
    <ContextApp.Provider
      value={{
        state: SearchResultListMockFull,
        dispatch: () => null,
      }}
    >
      <ResultsPerPage />
    </ContextApp.Provider>
  );

  await waitFor(() => expect(screen.getByTestId('search-per-page')).toBeInTheDocument());
  expect((screen.getByTestId('search-per-page') as HTMLSelectElement).value).toEqual(
    SearchResultListMockFull.itemsPerPage
  );
});

test('check Sort select new option', async () => {
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

  await waitFor(() => userEvent.type(screen.getByTestId('search-per-page'), '30'));
  await waitFor(() =>
    expect((screen.getByTestId('search-per-page') as HTMLInputElement).value).toEqual(
      SearchResultListMockFull.itemsPerPage + '30'
    )
  );
  expect(screen.getByText('Loading data')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());
  await waitFor(() => {
    expect(screen.queryByText('Loading data')).not.toBeInTheDocument();
  });
});
