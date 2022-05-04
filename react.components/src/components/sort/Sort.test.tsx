import Sort from './Sort';
import MainPage from '../../pages/MainPage/MainPage';
import { BrowserRouter } from 'react-router-dom';

import { mockedState } from '../../mockedState';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReducer } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { mockStore } from '../../mockedStore';

describe('Sort tests', () => {
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
      <Provider store={mockStore}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

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
