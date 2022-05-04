import MainPage from '../../pages/MainPage/MainPage';
import SearchResultList from './SearchResultList';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockedState } from '../../mockedState';
import { mockStore, mockStoreError, mockStoreStart } from '../../mockedStore';

describe('SearchResults tests', () => {
  test('check SearchResultList page download', async () => {
    render(
      <BrowserRouter>
        <Provider store={mockStoreStart}>
          <MainPage />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.queryByText('search for something')).toBeInTheDocument();

    await waitFor(() => fireEvent.submit(screen.getByTestId('search-form')));

    expect(screen.getByTestId('active-search')).toBeInTheDocument();
    expect(screen.queryByText('search for something')).not.toBeInTheDocument();
    expect(screen.queryByText('something went wrong')).not.toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText('no images found')).toBeInTheDocument());
    expect(screen.queryByText('something went wrong')).not.toBeInTheDocument();
    expect(screen.queryByText('active-search')).not.toBeInTheDocument();
  });

  test('check SearchResultList page error', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStoreError}>
          <SearchResultList />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.queryByText('something went wrong')).toBeInTheDocument();
    expect(screen.queryByText('no images found')).not.toBeInTheDocument();
    expect(screen.queryByText('search for something')).not.toBeInTheDocument();
  });

  test('check SearchResultList page full', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <SearchResultList />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.queryByText('search for something')).not.toBeInTheDocument();
    expect(screen.queryByText('no images found')).not.toBeInTheDocument();
    expect(screen.queryByText('something went wrong')).not.toBeInTheDocument();
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('card-item').length).toEqual(mockedState?.response?.length);
  });
});
