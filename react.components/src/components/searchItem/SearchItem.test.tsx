import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ContextApp } from '../../app/App';
import {
  mockedResponseItem,
  mockedResponseItemEmpty,
  SearchResultListMockFull,
} from '../../mockedResponseItem';
import { MainPage } from '../../pages/mainPage/MainPage';
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

  test('check searchItem popup appearance', async () => {
    render(
      <BrowserRouter>
        <ContextApp.Provider
          value={{
            state: SearchResultListMockFull,
            dispatch: () => null,
          }}
        >
          <MainPage />
        </ContextApp.Provider>
      </BrowserRouter>
    );

    await waitFor(() => userEvent.click(screen.getAllByTestId('card__link')[0]));

    /*
    const img = screen.getByTestId('item__img_preview');
    expect(screen.queryByText('Author:')).not.toBeInTheDocument();

    fireEvent.click(img);
    expect(screen.queryByText('Author:')).toBeInTheDocument();
    expect(screen.getByTestId('item__popup_container')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('item__close'));
    expect(screen.queryByText('Author:')).not.toBeInTheDocument();
    fireEvent.click(img);
    expect(screen.queryByText('Author:')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('item__popup_container'));
    expect(screen.queryByText('Author:')).not.toBeInTheDocument();*/
  });
  /*
  test('check searchItem popup content', () => {
    render(<SearchItem item={mockedResponseItem} />);
    fireEvent.click(screen.getByTestId('item__img_preview'));
    expect(screen.getByTestId('item__description')).toHaveTextContent(
      mockedResponseItem.description
    );
    expect(screen.getByTestId('item__likes')).toHaveTextContent(
      mockedResponseItem.likes as unknown as string
    );
    expect(screen.getByTestId('item__author')).toHaveTextContent(mockedResponseItem.author);
    expect(screen.getByTestId('item__portfolio')).toBeInTheDocument();
    expect(screen.getByTestId('item__location')).toHaveTextContent(mockedResponseItem.location);
    expect(screen.getByTestId('item__size')).toHaveTextContent(
      mockedResponseItem.width as unknown as string
    );
  });

  test('check searchItem popup content with half-empty response', () => {
    render(<SearchItem item={mockedResponseItemEmpty} />);
    fireEvent.click(screen.getByTestId('item__img_preview'));
    expect(screen.getByTestId('item__description')).toHaveTextContent('Nice picture');
    expect(screen.getByTestId('item__likes')).toHaveTextContent('0');
    expect(screen.queryByText('&#8690')).not.toBeInTheDocument();
    expect(screen.getByTestId('item__location')).toHaveTextContent('Unknown');
    expect(screen.getByTestId('item__size')).toHaveTextContent('Unknown');
  });*/
});
