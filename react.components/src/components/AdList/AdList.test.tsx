import { ContextApp } from '../../App';
import { mockedState } from '../../mockedState';
import { AdList } from './AdList';
import { render, screen } from '@testing-library/react';

test('check AdList appearance', () => {
  render(
    <ContextApp.Provider
      value={{
        state: mockedState,
        dispatch: () => null,
      }}
    >
      <AdList />
    </ContextApp.Provider>
  );

  const cards = screen.getAllByTestId('card-item');
  expect(cards.length).toEqual(mockedState.savedCards.length);
});
