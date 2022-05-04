import { GlobalTypes } from './interfaces';
import { data } from './mockedData';
import { mockChangedResponse, mockedResponseItem } from './mockedResponse';
import { defaultValues } from './store';

export const mockedStateError: GlobalTypes = {
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
  adsFormValues: defaultValues,
};

export const mockedState: GlobalTypes = {
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
  adsFormValues: defaultValues,
};

export const mockedStateStart: GlobalTypes = {
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
  adsFormValues: defaultValues,
};
