import { render, screen } from '@testing-library/react';
import { ContextApp } from '../../app/App';
import { SearchResultListMockFull } from '../../mockedResponseItem';
import { AdsList } from './AdsList';

test('check AdsList appearance', () => {
  render(
    <ContextApp.Provider
      value={{
        state: SearchResultListMockFull,
        dispatch: () => null,
      }}
    >
      <AdsList />
    </ContextApp.Provider>
  );

  const cards = screen.getAllByTestId('card-item');
  expect(cards.length).toEqual(SearchResultListMockFull.savedCards.length);
});
