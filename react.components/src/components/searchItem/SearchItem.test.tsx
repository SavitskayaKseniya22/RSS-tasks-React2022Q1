import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { ContextApp } from '../../app/App';
import { mockedResponseItem, SearchResultListMockFull } from '../../mockedResponseItem';

import { SearchItem } from './SearchItem';

describe('SearchItem test', () => {
  test('check searchItem appearance', () => {
    render(
      <BrowserRouter>
        <ContextApp.Provider
          value={{
            state: SearchResultListMockFull,
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
  });
});
