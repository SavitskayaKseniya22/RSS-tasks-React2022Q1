import { render, screen } from '@testing-library/react';
import { ContextApp } from '../../app/App';
import { SearchResultListMockFull } from '../../mockedResponseItem';
import { MyAds } from './MyAds';

test('check MyAds page appearance without state', () => {
  render(<MyAds />);

  expect(screen.getByTestId('my-ads')).toBeInTheDocument();
  expect(screen.getByText('my advertisements')).toBeInTheDocument();
  expect(screen.getByTestId('form-ad')).toBeInTheDocument();
  expect(screen.getByTestId('my-ads').childNodes.length).toBe(2);
});

test('check MyAds page appearance with state', () => {
  render(
    <ContextApp.Provider
      value={{
        state: SearchResultListMockFull,
        dispatch: () => null,
      }}
    >
      <MyAds />
    </ContextApp.Provider>
  );

  screen.debug();

  expect(screen.getByTestId('my-ads')).toBeInTheDocument();
  expect(screen.getByText('my advertisements')).toBeInTheDocument();
  expect(screen.getByTestId('form-ad')).toBeInTheDocument();
  expect(screen.getByTestId('ads-list')).toBeInTheDocument();
  expect(screen.getByTestId('my-ads').childNodes.length).toBe(3);
});
