import { configureStore, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getShortData } from './components/SearchForm/SearchForm';
import { CardProps, GlobalTypes, SearchItemDetailType } from './interfaces';

export const defaultValues = {
  adress: undefined,
  link: undefined,
  description: '',
  title: '',
  phone: '',
  email: '',
  img: '',
  date: '',
  price: '',
  typeAdd: '',
  isReady: false,
  area: '',
  currency: '$',
  adCreationDate: 0,
};

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
  shouldUpdate: window.localStorage.getItem('searchValue') ? true : false,
  savedCards: [],
  adsFormValues: defaultValues,
};

export const fetchImages = createAsyncThunk(
  'fetchImages',
  async ({
    pageNumber,
    itemsPerPage,
    value,
    sort,
  }: {
    pageNumber: string;
    itemsPerPage: string;
    value: string;
    sort: string;
  }) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&page=${pageNumber}&per_page=${itemsPerPage}&query=${value}&order_by=${sort}`
    );
    const responseJson = await response.json();
    const data = getShortData(responseJson);
    const totalPages = responseJson.total_pages;
    return { data, totalPages };
  }
);

export const getSlice = (initialState: GlobalTypes) => {
  return createSlice({
    name: 'app',
    initialState,
    reducers: {
      handleValueInSearchInput: (state, action: PayloadAction<string>) => {
        state.value = action.payload;
        state.pageNumber = '1';
        state.response = [];
        state.isSearchOver = false;
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

    extraReducers: (builder) => {
      builder.addCase(fetchImages.pending, (state) => {
        state.isLoading = true;
        state.response = [];
        state.isSearchOver = false;
      });
      builder.addCase(fetchImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSearchOver = true;
        state.shouldUpdate = false;
        state.response = action.payload.data;
        state.maxPageNumber = action.payload.totalPages;
      });
      builder.addCase(fetchImages.rejected, (state) => {
        state.isLoading = false;
        state.shouldUpdate = false;
        state.isError = true;
      });
    },
  });
};

const slice = getSlice(initialState);

export const store = configureStore(slice);

export const {
  handleValueInSearchInput,
  handlePageNumber,
  handleItemPerPage,
  handleShouldUpdateStatus,
  handleSort,
  handleActiveCard,
  handleSavedCards,
  handleAdsForm,
} = slice.actions;
