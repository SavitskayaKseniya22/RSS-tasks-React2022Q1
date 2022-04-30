import { Sort } from './Sort';
import { MainPage } from '../../pages/MainPage/MainPage';
import { BrowserRouter } from 'react-router-dom';
import { ContextApp, reducer } from '../../App';
import { mockedState } from '../../mockedState';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReducer } from 'react';

describe('Sort tests', () => {
  test('check Sort appearance', async () => {
    render(
      <ContextApp.Provider
        value={{
          state: mockedState,
          dispatch: () => null,
        }}
      >
        <Sort />
      </ContextApp.Provider>
    );

    await waitFor(() => expect(screen.getByTestId('search-sort')).toBeInTheDocument());
    expect((screen.getByTestId('search-sort') as HTMLSelectElement).value).toEqual(
      mockedState.sort
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
});
