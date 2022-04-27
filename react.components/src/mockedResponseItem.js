export const mockedResponseItem = {
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
};

export const mockedResponseItemEmpty = {
  src: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTgzNjd8MHwxfHNlYXJjaHwxfHxjYXJ8ZW58MHx8fHwxNjQ5ODQxMzM0&ixlib=rb-1.2.1&q=80&w=1080',
  description: null,
  link: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTgzNjd8MHwxfHNlYXJjaHwxfHxjYXJ8ZW58MHx8fHwxNjQ5ODQxMzM0&ixlib=rb-1.2.1&q=85',
  author: null,
  portfolio: null,
  location: null,
  width: null,
  height: null,
  likes: null,
  unsplashLink: 'https://unsplash.com/photos/a4S6KUuLeoM',
};

export const SearchResultListMockEmpty = {
  value: '',
  response: [],
  isDownloading: false,
  isSearchOver: true,
  isError: false,
  activeCard: undefined,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '1',
  maxPageNumber: 10,
  isMounted: true,
  savedCards: [],
};

export const SearchResultListMockError = {
  value: 'text',
  response: [],
  isDownloading: false,
  isSearchOver: false,
  isError: true,
  activeCard: undefined,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '1',
  maxPageNumber: 10,
  isMounted: true,
  savedCards: [],
};

export const SearchResultListMockFull = {
  value: 'text',
  response: [mockedResponseItem, mockedResponseItem],
  isDownloading: false,
  isSearchOver: true,
  isError: false,
  activeCard: undefined,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '1',
  maxPageNumber: 10,
  isMounted: true,
  savedCards: [],
};

export const SearchResultListMockStart = {
  value: 'text',
  response: [],
  isDownloading: false,
  isSearchOver: false,
  isError: false,
  activeCard: undefined,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '1',
  maxPageNumber: 10,
  isMounted: true,
  savedCards: [],
};

export const SearchResultListMockLoading = {
  value: 'text',
  response: [],
  isDownloading: true,
  isSearchOver: false,
  isError: false,
  activeCard: undefined,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '1',
  maxPageNumber: 10,
  isMounted: true,
  savedCards: [],
};
