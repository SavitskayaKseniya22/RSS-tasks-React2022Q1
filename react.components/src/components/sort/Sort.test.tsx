import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ContextApp, reducer } from '../../app/App';
import { SearchResultListMockFull } from '../../mockedResponseItem';
import { MainPage } from '../../pages/mainPage/MainPage';
import { Sort } from './Sort';

test('check Sort appearance', async () => {
  render(
    <ContextApp.Provider
      value={{
        state: SearchResultListMockFull,
        dispatch: () => null,
      }}
    >
      <Sort />
    </ContextApp.Provider>
  );

  await waitFor(() => expect(screen.getByTestId('search-sort')).toBeInTheDocument());
  expect((screen.getByTestId('search-sort') as HTMLSelectElement).value).toEqual(
    SearchResultListMockFull.sort
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

  await waitFor(() => userEvent.selectOptions(screen.getByTestId('search-sort'), ['popular']));
  await waitFor(() =>
    expect((screen.getByTestId('search-sort') as HTMLSelectElement).value).toEqual('popular')
  );
  expect(screen.getByText('Loading data')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());
  await waitFor(() => {
    expect(screen.queryByText('Loading data')).not.toBeInTheDocument();
  });
});
