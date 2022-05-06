import AdList from './AdList';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { mockStore, mockedState } from '../../mockedStore';

test('check AdList appearance', () => {
  render(
    <Provider store={mockStore}>
      <AdList />
    </Provider>
  );

  const cards = screen.getAllByTestId('card-item');
  expect(cards.length).toEqual(mockedState.savedCards.length);
});
