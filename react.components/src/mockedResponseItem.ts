import { data } from './mockedData';
import { mockChangedResponse } from './mockedResponse';

export const mockedResponseItem = {
  src: 'https://images.unsplash.com/photo-1651047947753-d053220b267a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTgzNjd8MHwxfHNlYXJjaHw0fHxjYXJ8ZW58MHx8Mnx8MTY1MTA5OTg2Ng&ixlib=rb-1.2.1&q=80&w=1080',
  description: 'Good picture',
  link: 'https://images.unsplash.com/photo-1651047947753-d053220b267a?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTgzNjd8MHwxfHNlYXJjaHw0fHxjYXJ8ZW58MHx8Mnx8MTY1MTA5OTg2Ng&ixlib=rb-1.2.1&q=85',
  author: 'taylorgsimpson',
  portfolio: 'https://www.etsy.com/shop/taylorsimpsonphoto',
  location: 'Balkans',
  width: 2880,
  height: 3600,
  likes: 17,
  unsplashLink: 'https://unsplash.com/photos/v7MXIdHaQqk',
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
  isMounted: false,
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
  isMounted: false,
  savedCards: [],
};

export const SearchResultListMockFullWithEmptyActiveCard = {
  value: 'car',
  response: mockChangedResponse,
  isDownloading: false,
  isSearchOver: true,
  isError: false,
  activeCard: mockedResponseItemEmpty,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '5',
  maxPageNumber: 500,
  isMounted: false,
  savedCards: data,
};

export const SearchResultListMockFull = {
  value: 'car',
  response: mockChangedResponse,
  isDownloading: false,
  isSearchOver: true,
  isError: false,
  activeCard: mockedResponseItem,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '5',
  maxPageNumber: 500,
  isMounted: false,
  savedCards: data,
};

export const SearchResultListMockFullWithoutActiveCard = {
  value: 'car',
  response: mockChangedResponse,
  isDownloading: false,
  isSearchOver: true,
  isError: false,
  activeCard: undefined,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '5',
  maxPageNumber: 500,
  isMounted: false,
  savedCards: data,
};

export const SearchResultListMockStart = {
  value: '',
  response: [],
  isDownloading: false,
  isSearchOver: false,
  isError: false,
  activeCard: undefined,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '1',
  maxPageNumber: 10,
  isMounted: false,
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
