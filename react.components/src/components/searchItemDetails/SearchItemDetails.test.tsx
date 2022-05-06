import { BrowserRouter } from 'react-router-dom';
import SearchItemDetails from './SearchItemDetails';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { mockStore, mockedState } from '../../mockedStore';

describe('SearchItemDetails test', () => {
  test('check SearchItemDetails for full content', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <SearchItemDetails />
        </Provider>
      </BrowserRouter>
    );

    const { activeCard } = mockedState;

    expect(screen.queryByText(activeCard?.description as string)).toBeInTheDocument();
    expect(screen.queryByText(activeCard?.location as string)).toBeInTheDocument();
    expect(screen.getByTestId('item__description')).toHaveTextContent(
      activeCard?.description as string
    );
    expect(screen.getByTestId('item__likes')).toHaveTextContent(
      activeCard?.likes as unknown as string
    );
    expect(screen.getByTestId('item__author')).toHaveTextContent(activeCard?.author as string);
    expect(screen.getByTestId('item__portfolio')).toBeInTheDocument();
    expect(screen.getByTestId('item__location')).toHaveTextContent(activeCard?.location as string);
    expect(screen.getByTestId('item__size')).toHaveTextContent(
      activeCard?.width as unknown as string
    );
  });
});
