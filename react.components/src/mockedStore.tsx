import { configureStore } from '@reduxjs/toolkit';
import { mockedState, mockedStateError } from './mockedState';
import { getStore } from './store';

export const mockStore = configureStore(getStore(mockedState));
