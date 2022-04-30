import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ContextApp } from '../../App';
import { mockedState, mockedStateWithEmptyActiveCard } from '../../mockedState';

import { SearchItemDetails } from './SearchItemDetails';

describe('SearchItemDetails test', () => {
  test('check SearchItemDetails for full content', () => {
    render(
      <BrowserRouter>
        <ContextApp.Provider
          value={{
            state: mockedState,
            dispatch: () => null,
          }}
        >
          <SearchItemDetails />
        </ContextApp.Provider>
      </BrowserRouter>
    );

    expect(screen.queryByText(mockedState.activeCard.description)).toBeInTheDocument();
    expect(screen.queryByText(mockedState.activeCard.location)).toBeInTheDocument();
    expect(screen.getByTestId('item__description')).toHaveTextContent(
      mockedState.activeCard.description
    );
    expect(screen.getByTestId('item__likes')).toHaveTextContent(
      mockedState.activeCard.likes as unknown as string
    );
    expect(screen.getByTestId('item__author')).toHaveTextContent(mockedState.activeCard.author);
    expect(screen.getByTestId('item__portfolio')).toBeInTheDocument();
    expect(screen.getByTestId('item__location')).toHaveTextContent(mockedState.activeCard.location);
    expect(screen.getByTestId('item__size')).toHaveTextContent(
      mockedState.activeCard.width as unknown as string
    );
  });

  test('check SearchItemDetails with half-empty response', () => {
    render(
      <BrowserRouter>
        <ContextApp.Provider
          value={{
            state: mockedStateWithEmptyActiveCard,
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
