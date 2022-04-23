import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage } from '../pages/mainPage/MainPage';
import { MyAds } from '../pages/myAds/MyAds';
import { AboutUs } from '../pages/aboutUs/AboutUs';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';
import { Dispatch, useReducer } from 'react';
import { MainPageType, ReducerTypes, SearchItemDetailType } from '../interfaces';
import React from 'react';
import { SearchItemDetails } from '../components/searchItemDetails/SearchItemDetails';

const initialValues = {
  value: window.localStorage.getItem('searchValue') || '',
  response: [],
  isDownloading: false,
  isSearchOver: false,
  isError: false,
  activeCard: undefined,
};

export const ContextApp = React.createContext<{
  state: MainPageType;
  dispatch: Dispatch<ReducerTypes>;
}>({
  state: initialValues,
  dispatch: () => null,
});

function App() {
  const [state, dispatch] = useReducer(reducer, initialValues);

  function reducer(state: MainPageType, action: ReducerTypes): MainPageType {
    switch (action.type) {
      case 'handleDownload':
        return {
          ...state,
          response: action.payload.response,
          isDownloading: action.payload.load,
          isSearchOver: !action.payload.load,
          isError: action.payload.error || false,
        };

      case 'handleChange':
        return { ...state, value: action.payload.value };

      case 'toggleCard':
        return { ...state, activeCard: action.payload.activeCard };

      default:
        return state;
    }
  }

  return (
    <div className="App" data-testid="app">
      <ContextApp.Provider value={{ state, dispatch }}>
        <Header />
        <Footer />
        <Outlet />
        <Routes>
          <Route path="/my-ads" element={<MyAds />} />
          <Route path="/" element={<MainPage />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route
            path="/card"
            element={state.activeCard ? <SearchItemDetails /> : <Navigate to="/" />}
          />

          <Route
            path="*"
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
