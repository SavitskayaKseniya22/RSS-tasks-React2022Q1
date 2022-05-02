import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchItemDetails from './components/SearchItemDetails/SearchItemDetails';
import AboutUs from './pages/AboutUs/AboutUs';
import Ads from './pages/Ads/Ads';
import MainPage from './pages/MainPage/MainPage';
import { configureStore } from '@reduxjs/toolkit';
import { GlobalTypes, ReducerTypes } from './interfaces';
import './App.css';

import { Provider } from 'react-redux';

export const initialValues: GlobalTypes = {
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

export const reducer = (state = initialValues, action: ReducerTypes) => {
  switch (action.type) {
    case 'handleDownload':
      return {
        ...state,
        response: action.payload.response,
        isLoading: action.payload.isLoading,
        isSearchOver: !action.payload.isLoading,
        isError: action.payload.isError || false,
      };

    case 'toggleCard':
      return { ...state, activeCard: action.payload.activeCard };

    case 'handleSearchForm':
      return {
        ...state,
        sort: action.payload.sort,
        itemsPerPage: action.payload.itemsPerPage,
        pageNumber: action.payload.pageNumber,
        maxPageNumber: action.payload.maxPageNumber,
        value: action.payload.value,
        shouldUpdate: action.payload.shouldUpdate,
      };

    case 'handleSavedCards':
      return {
        ...state,
        savedCards: action.payload.savedCards,
      };
    case 'handleAddsForm':
      return {
        ...state,
        adsFormValues: action.payload.adsFormValues,
      };

    default:
      return state;
  }
};

export const store = configureStore({ reducer });

const App = () => {
  return (
    <div className="App" data-testid="app">
      <Provider store={store}>
        <Header />
        <Footer />
        <Outlet />
        <Routes>
          <Route path="/ads" element={<Ads />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/card"
            element={store.getState().activeCard ? <SearchItemDetails /> : <Navigate to="/" />}
          />

          <Route
            path="/*"
            element={
              <div className="empty-page">
                <span>404</span>
              </div>
            }
          />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
