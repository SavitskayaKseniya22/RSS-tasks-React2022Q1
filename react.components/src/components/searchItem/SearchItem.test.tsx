import SearchItem from './SearchItem';
import { BrowserRouter } from 'react-router-dom';
import { mockedResponseItem } from '../../mockedResponse';
import { mockedState } from '../../mockedState';
import { render, screen } from '@testing-library/react';

describe('SearchItem test', () => {
  /*
  test('check searchItem appearance', () => {
    render(
      <BrowserRouter>
        <ContextApp.Provider
          value={{
            state: mockedState,
            dispatch: () => null,
          }}
        >
          <SearchItem item={mockedResponseItem} />
        </ContextApp.Provider>
      </BrowserRouter>
    );
    const searchItem = screen.getByTestId('card-item');
    expect(searchItem).toHaveClass('item');
    expect(screen.getByTestId('item__img_preview')).toBeInTheDocument();
  });*/
});
