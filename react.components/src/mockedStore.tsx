import { configureStore } from '@reduxjs/toolkit';
import { getSlice } from './store';
import { mockedState } from './mockedState';

export const mockStore = configureStore(getSlice(mockedState));
