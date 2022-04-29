import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage } from '../pages/mainPage/MainPage';
import { MyAds } from '../pages/myAds/MyAds';
import { AboutUs } from '../pages/aboutUs/AboutUs';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';
import { Dispatch, useReducer } from 'react';
import { GlobalTypes, ReducerTypes } from '../interfaces';
import React from 'react';
import { SearchItemDetails } from '../components/searchItemDetails/SearchItemDetails';

export const initialValues: GlobalTypes = {
  value: window.localStorage.getItem('searchValue') || '',
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

export const ContextApp = React.createContext<{
  state: GlobalTypes;
  dispatch: Dispatch<ReducerTypes>;
}>({
  state: initialValues,
  dispatch: () => null,
});

export function reducer(state: GlobalTypes, action: ReducerTypes): GlobalTypes {
  switch (action.type) {
    case 'handleDownload':
      return {
        ...state,
        response: action.payload.response,
        isDownloading: action.payload.isDownloading,
        isSearchOver: !action.payload.isDownloading,
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
        isMounted: action.payload.isMounted,
      };

    case 'handleSavedCards':
      return {
        ...state,
        savedCards: action.payload.savedCards,
      };
    case 'handleAddsForm':
      return {
        ...state,
        addsFormValues: action.payload.addsFormValues,
      };

    default:
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialValues);

  return (
    <div className="App" data-testid="app">
      <ContextApp.Provider value={{ state, dispatch }}>
        <Header />
        <Footer />
        <Outlet />
        <Routes>
          <Route path="/my-ads" element={<MyAds />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/card"
            element={state.activeCard ? <SearchItemDetails /> : <Navigate to="/" />}
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
      </ContextApp.Provider>
    </div>
  );
}

export default App;
