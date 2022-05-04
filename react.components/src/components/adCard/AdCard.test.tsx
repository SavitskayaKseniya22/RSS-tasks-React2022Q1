import AdCard from './AdCard';
import { data } from '../../mockedData';
import { mockedState } from '../../mockedState';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReducer } from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from '../../mockedStore';

describe('check forming card with data', () => {
  test('check card appearance', () => {
    render(<AdCard item={data[0]} />);
    const card = screen.getByTestId('card-item');
    expect(card).toHaveClass('card');
  });

  test('check card content', () => {
    render(<AdCard item={data[0]} />);
    const card = screen.getByTestId('card-item');
    const cardDescription = screen.getByTestId('card-item__description');
    expect(card).toContainElement(cardDescription);
    const cardLinks = screen.getByTestId('card-item__links');
    expect(card).toContainElement(cardLinks);
  });
});
