import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardProps, GlobalTypes, SearchItemDetailType } from './interfaces';

export const initialState: GlobalTypes = {
  value: window.localStorage.getItem('searchValue') || '',
  response: [],
  isLoading: false,
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

export const mainReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    handleValueInSearchInput: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },

    handlePageNumber: (state, action: PayloadAction<string>) => {
      state.pageNumber = action.payload;
      state.shouldUpdate = true;
    },

    handleItemPerPage: (state, action: PayloadAction<string>) => {
      state.itemsPerPage = action.payload;
      state.pageNumber = '1';
      state.shouldUpdate = true;
    },

    handleSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
      state.shouldUpdate = true;
    },

    handleShouldUpdateStatus: (state, action: PayloadAction<boolean>) => {
      state.shouldUpdate = action.payload;
    },

    handleLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      state.isSearchOver = !action.payload;
    },

    handleDataAndUpdateStatus: (
      state,
      action: PayloadAction<{ data: SearchItemDetailType[]; totalPages: number }>
    ) => {
      state.isLoading = false;
      state.isSearchOver = true;
      state.shouldUpdate = false;
      state.response = action.payload.data;
      state.maxPageNumber = action.payload.totalPages;
    },

    handleError: (state) => {
      state.isLoading = false;
      state.shouldUpdate = false;
      state.isError = true;
    },

    handleActiveCard: (state, action: PayloadAction<SearchItemDetailType>) => {
      state.activeCard = action.payload;
    },

    handleSavedCards: (state, action: PayloadAction<CardProps>) => {
      state.savedCards?.push(action.payload);
    },

    handleAdsForm: (state, action: PayloadAction<CardProps>) => {
      state.adsFormValues = action.payload;
    },
  },
});

export const store = configureStore(mainReducer);

export const {
  handleValueInSearchInput,
  handlePageNumber,
  handleItemPerPage,
  handleShouldUpdateStatus,
  handleSort,
  handleDataAndUpdateStatus,
  handleLoadingStatus,
  handleError,
  handleActiveCard,
  handleSavedCards,
  handleAdsForm,
} = mainReducer.actions;
