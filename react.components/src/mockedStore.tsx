import { configureStore } from '@reduxjs/toolkit';
import { GlobalTypes } from './interfaces';
import { data } from './mockedData';
import { mockChangedResponse, mockedResponseItem } from './mockedResponse';
import { defaultValues, getSlice } from './store';

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

export const mockStore = configureStore(getSlice(mockedState));
