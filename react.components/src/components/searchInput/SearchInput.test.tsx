import { fireEvent, render, screen } from '@testing-library/react';
import { SearchInput } from './SearchInput';
/*
test('check search appearance', () => {
  render(<SearchInput />);
  const search = screen.getByTestId('search-input');
  expect(search).toHaveClass('Search-input');
});

test('check search work', () => {
  render(<SearchInput />);
  const search = screen.getByTestId('search-input') as HTMLInputElement;
  expect(search).toHaveClass('Search-input');
  fireEvent.input(search, { target: { value: 'text input' } });
  expect(search.value).toEqual('text input');
});

test('check save value', () => {
  const { unmount } = render(<SearchInput />);
  const search = screen.getByTestId('search-input') as HTMLInputElement;
  fireEvent.input(search, { target: { value: 'text input' } });
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
  Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
  unmount();
  expect(window.localStorage.setItem).toHaveBeenCalledWith('searchValue', 'text input');
  expect(window.localStorage.getItem('searchValue')).toBe('text input');
});

test('check restore value', () => {
  render(<SearchInput />);
  const search = screen.getByTestId('search-input') as HTMLInputElement;
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
  Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
  window.localStorage.setItem('searchValue', 'text input');
  expect(search.value).toBe(window.localStorage.getItem('searchValue'));
});*/
