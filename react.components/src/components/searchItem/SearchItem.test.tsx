import { SearchItem } from './SearchItem';
import { mockedResponseItem, mockedResponseItemEmpty } from '../../mockedResponseItem';
import { fireEvent, render, screen } from '@testing-library/react';

describe('SearchItem test', () => {
  test('check searchItem appearance', () => {
    render(<SearchItem item={mockedResponseItem} />);
    const searchItem = screen.getByTestId('card-item');
    expect(searchItem).toHaveClass('item');
  });

  test('check searchItem content', () => {
    render(<SearchItem item={mockedResponseItem} />);
    const img = screen.getByTestId('item__img_preview');
    expect(img).toBeInTheDocument();
  });

  test('check searchItem popup appearance', () => {
    render(<SearchItem item={mockedResponseItem} />);
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
    expect(screen.queryByText('Author:')).not.toBeInTheDocument();
  });

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
  });
});
