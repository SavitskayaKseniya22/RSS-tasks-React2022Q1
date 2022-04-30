import ResultsPerPage from './ResultsPerPage';
import MainPage from '../../pages/MainPage/MainPage';
import { BrowserRouter } from 'react-router-dom';
import { ContextApp, reducer } from '../../App';
import { mockedState } from '../../mockedState';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReducer } from 'react';

describe('ResultsPerPage tests', () => {
  test('check Sort appearance', async () => {
    render(
      <ContextApp.Provider
        value={{
          state: mockedState,
          dispatch: () => null,
        }}
      >
        <ResultsPerPage />
      </ContextApp.Provider>
    );

    await waitFor(() => expect(screen.getByTestId('search-per-page')).toBeInTheDocument());
    expect((screen.getByTestId('search-per-page') as HTMLSelectElement).value).toEqual(
      mockedState.itemsPerPage
    );
  });

  test('check Sort select new option', async () => {
    const Wrapper = () => {
      const [state, dispatch] = useReducer(reducer, mockedState);
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
        mockedState.itemsPerPage + '30'
      )
    );
    expect(screen.getByText('Loading data')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('card-list')).toBeInTheDocument());
    await waitFor(() => {
      expect(screen.queryByText('Loading data')).not.toBeInTheDocument();
    });
  });
});
