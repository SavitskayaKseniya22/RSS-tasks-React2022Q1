import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ContextApp } from '../../app/App';
import {
  SearchResultListMockFull,
  SearchResultListMockFullWithEmptyActiveCard,
} from '../../mockedResponseItem';
import { SearchItemDetails } from './SearchItemDetails';

describe('SearchItemDetails test', () => {
  test('check SearchItemDetails for full content', () => {
    render(
      <BrowserRouter>
        <ContextApp.Provider
          value={{
            state: SearchResultListMockFull,
            dispatch: () => null,
          }}
        >
          <SearchItemDetails />
        </ContextApp.Provider>
      </BrowserRouter>
    );

    expect(screen.queryByText(SearchResultListMockFull.activeCard.description)).toBeInTheDocument();
    expect(screen.queryByText(SearchResultListMockFull.activeCard.location)).toBeInTheDocument();
    expect(screen.getByTestId('item__description')).toHaveTextContent(
      SearchResultListMockFull.activeCard.description
    );
    expect(screen.getByTestId('item__likes')).toHaveTextContent(
      SearchResultListMockFull.activeCard.likes as unknown as string
    );
    expect(screen.getByTestId('item__author')).toHaveTextContent(
      SearchResultListMockFull.activeCard.author
    );
    expect(screen.getByTestId('item__portfolio')).toBeInTheDocument();
    expect(screen.getByTestId('item__location')).toHaveTextContent(
      SearchResultListMockFull.activeCard.location
    );
    expect(screen.getByTestId('item__size')).toHaveTextContent(
      SearchResultListMockFull.activeCard.width as unknown as string
    );
  });

  test('check SearchItemDetails with half-empty response', () => {
    render(
      <BrowserRouter>
        <ContextApp.Provider
          value={{
            state: SearchResultListMockFullWithEmptyActiveCard,
            dispatch: () => null,
          }}
        >
          <SearchItemDetails />
        </ContextApp.Provider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('item__description')).toHaveTextContent('Nice picture');
    expect(screen.getByTestId('item__likes')).toHaveTextContent('0');
    expect(screen.queryByText('&#8690')).not.toBeInTheDocument();
    expect(screen.getByTestId('item__location')).toHaveTextContent('Unknown');
    expect(screen.getByTestId('item__size')).toHaveTextContent('Unknown');
  });
});
