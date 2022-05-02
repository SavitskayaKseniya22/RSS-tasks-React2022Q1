import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchItemDetails from './components/SearchItemDetails/SearchItemDetails';
import AboutUs from './pages/AboutUs/AboutUs';
import Ads from './pages/Ads/Ads';
import MainPage from './pages/MainPage/MainPage';
import { shallowEqual, useSelector } from 'react-redux';
import { GlobalTypes } from './interfaces';
import './App.css';

const App = () => {
  const activeCard = useSelector((state: GlobalTypes) => state.activeCard, shallowEqual);
  return (
    <div className="App" data-testid="app">
      <Header />
      <Footer />
      <Outlet />
      <Routes>
        <Route path="/ads" element={<Ads />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/card" element={activeCard ? <SearchItemDetails /> : <Navigate to="/" />} />
        <Route
          path="/*"
          element={
            <div className="empty-page">
              <span>404</span>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
