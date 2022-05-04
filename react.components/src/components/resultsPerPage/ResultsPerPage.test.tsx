import ResultsPerPage from './ResultsPerPage';
import MainPage from '../../pages/MainPage/MainPage';
import { MemoryRouter } from 'react-router-dom';
import { mockedState } from '../../mockedState';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { mockStore } from '../../mockedStore';

describe('ResultsPerPage tests', () => {
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
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/']}>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

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
