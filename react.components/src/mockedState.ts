import { data } from './mockedData';
import { mockChangedResponse, mockedResponseItem, mockedResponseItemEmpty } from './mockedResponse';

export const mockedStateEmpty = {
  value: '',
  response: [],
  isLoading: false,
  isSearchOver: true,
  isError: false,
  activeCard: undefined,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '1',
  maxPageNumber: 10,
  shouldUpdate: false,
  savedCards: [],
};

export const mockedStateError = {
  value: 'text',
  response: [],
  isLoading: false,
  isSearchOver: false,
  isError: true,
  activeCard: undefined,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '1',
  maxPageNumber: 10,
  shouldUpdate: false,
  savedCards: [],
};

export const mockedStateWithEmptyActiveCard = {
  value: 'car',
  response: mockChangedResponse,
  isLoading: false,
  isSearchOver: true,
  isError: false,
  activeCard: mockedResponseItemEmpty,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '5',
  maxPageNumber: 500,
  shouldUpdate: false,
  savedCards: data,
};

export const mockedState = {
  value: 'car',
  response: mockChangedResponse,
  isLoading: false,
  isSearchOver: true,
  isError: false,
  activeCard: mockedResponseItem,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '5',
  maxPageNumber: 500,
  shouldUpdate: false,
  savedCards: data,
};

export const mockedStateWithoutActiveCard = {
  value: 'car',
  response: mockChangedResponse,
  isLoading: false,
  isSearchOver: true,
  isError: false,
  activeCard: undefined,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '5',
  maxPageNumber: 500,
  shouldUpdate: false,
  savedCards: data,
};

export const mockedStateStart = {
  value: '',
  response: [],
  isLoading: false,
  isSearchOver: false,
  isError: false,
  activeCard: undefined,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '1',
  maxPageNumber: 10,
  shouldUpdate: false,
  savedCards: [],
};

export const mockedStateLoading = {
  value: 'text',
  response: [],
  isLoading: true,
  isSearchOver: false,
  isError: false,
  activeCard: undefined,
  sort: 'latest',
  itemsPerPage: '20',
  pageNumber: '1',
  maxPageNumber: 10,
  shouldUpdate: true,
  savedCards: [],
};
