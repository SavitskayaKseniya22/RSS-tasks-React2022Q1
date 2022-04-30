import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { Ads } from './pages/Ads/Ads';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { SearchItemDetails } from './components/SearchItemDetails/SearchItemDetails';
import { Dispatch, useReducer } from 'react';
import { GlobalTypes, ReducerTypes } from './interfaces';
import './App.css';

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
          <Route path="/ads" element={<Ads />} />
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
