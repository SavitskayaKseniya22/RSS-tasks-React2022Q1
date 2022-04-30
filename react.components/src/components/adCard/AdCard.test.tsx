import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReducer } from 'react';
import { reducer, ContextApp } from '../../App';
import { data } from '../../mockedData';
import { mockedState } from '../../mockedState';
import { AdCard } from './AdCard';
import { render, screen } from '@testing-library/react';

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

  test('check like button', () => {
    render(<AdCard item={data[0]} />);
    const card = screen.getByTestId('card-item');
    const likeButton = screen.getByTestId('card__mark-like');
    expect(card).toContainElement(likeButton);
    fireEvent.click(likeButton);
    expect(likeButton).toHaveClass('favorite-add');
    fireEvent.click(likeButton);
    expect(likeButton).not.toHaveClass('favorite-add');
  });

  test('check restore like condition after unmount', async () => {
    const Wrapper = () => {
      const [state, dispatch] = useReducer(reducer, mockedState);

      return (
        <ContextApp.Provider value={{ state, dispatch }}>
          <AdCard item={data[0]} />
        </ContextApp.Provider>
      );
    };
    const { unmount } = render(<Wrapper />);
    const likeButton = screen.getByTestId('card__mark-like');
    expect(likeButton).not.toHaveClass('favorite-add');
    userEvent.click(likeButton);
    expect(likeButton).toHaveClass('favorite-add');
    unmount();
    render(<Wrapper />);
    expect(likeButton).toHaveClass('favorite-add');
  });
});
