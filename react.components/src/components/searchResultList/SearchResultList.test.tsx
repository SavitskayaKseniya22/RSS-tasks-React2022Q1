import { SearchResultList } from './SearchResultList';
import { render, screen } from '@testing-library/react';

const SearchResultListMockIsDownloading = {
  value: 'text',
  response: [],
  isDownloading: true,
  isSearchOver: false,
  isError: false,
};

const SearchResultListMockError = {
  value: 'text',
  response: [],
  isDownloading: false,
  isSearchOver: false,
  isError: true,
};

const SearchResultListMockEmpty = {
  value: 'text',
  response: [],
  isDownloading: false,
  isSearchOver: true,
  isError: false,
};

const SearchResultListMockStart = {
  value: 'text',
  response: [],
  isDownloading: false,
  isSearchOver: false,
  isError: false,
};

const SearchResultListMockFull = {
  value: 'text',
  response: [
    {
      src: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTgzNjd8MHwxfHNlYXJjaHwxfHxjYXJ8ZW58MHx8fHwxNjQ5ODQxMzM0&ixlib=rb-1.2.1&q=80&w=1080',
      description: 'parked white Ford Explorer SUV',
      link: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTgzNjd8MHwxfHNlYXJjaHwxfHxjYXJ8ZW58MHx8fHwxNjQ5ODQxMzM0&ixlib=rb-1.2.1&q=85',
      author: 'steven1302',
      portfolio: null,
      location: null,
      width: 6000,
      height: 4000,
      likes: 163,
      unsplashLink: 'https://unsplash.com/photos/a4S6KUuLeoM',
    },
    {
      src: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTgzNjd8MHwxfHNlYXJjaHwxfHxjYXJ8ZW58MHx8fHwxNjQ5ODQxMzM0&ixlib=rb-1.2.1&q=80&w=1080',
      description: 'parked white Ford Explorer SUV',
      link: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTgzNjd8MHwxfHNlYXJjaHwxfHxjYXJ8ZW58MHx8fHwxNjQ5ODQxMzM0&ixlib=rb-1.2.1&q=85',
      author: 'steven1302',
      portfolio: null,
      location: null,
      width: 6000,
      height: 4000,
      likes: 163,
      unsplashLink: 'https://unsplash.com/photos/a4S6KUuLeoM',
    },
  ],
  isDownloading: false,
  isSearchOver: true,
  isError: false,
};

test('check SearchResultList page download', () => {
  render(<SearchResultList data={SearchResultListMockIsDownloading} />);
  expect(screen.getByTestId('active-search')).toBeInTheDocument();
  expect(screen.queryByText('no images found')).not.toBeInTheDocument();
  expect(screen.queryByText('search for something')).not.toBeInTheDocument();
  expect(screen.queryByText('something went wrong')).not.toBeInTheDocument();
});

test('check SearchResultList page error', () => {
  render(<SearchResultList data={SearchResultListMockError} />);
  expect(screen.queryByText('something went wrong')).toBeInTheDocument();
  expect(screen.queryByText('no images found')).not.toBeInTheDocument();
  expect(screen.queryByText('search for something')).not.toBeInTheDocument();
});

test('check SearchResultList page empty', () => {
  render(<SearchResultList data={SearchResultListMockEmpty} />);
  expect(screen.queryByText('no images found')).toBeInTheDocument();
  expect(screen.queryByText('something went wrong')).not.toBeInTheDocument();
  expect(screen.queryByText('search for something')).not.toBeInTheDocument();
});

test('check SearchResultList page empty start', () => {
  render(<SearchResultList data={SearchResultListMockStart} />);
  expect(screen.queryByText('search for something')).toBeInTheDocument();
  expect(screen.queryByText('no images found')).not.toBeInTheDocument();
  expect(screen.queryByText('something went wrong')).not.toBeInTheDocument();
});

test('check SearchResultList page full', () => {
  render(<SearchResultList data={SearchResultListMockFull} />);
  expect(screen.queryByText('search for something')).not.toBeInTheDocument();
  expect(screen.queryByText('no images found')).not.toBeInTheDocument();
  expect(screen.queryByText('something went wrong')).not.toBeInTheDocument();
  expect(screen.getByTestId('card-list')).toBeInTheDocument();
  expect(screen.getAllByTestId('card-item').length).toEqual(
    SearchResultListMockFull.response.length
  );
});
