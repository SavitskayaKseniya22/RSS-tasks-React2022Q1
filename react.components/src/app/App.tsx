import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage } from '../pages/mainPage/MainPage';
import { MyAds } from '../pages/myAds/MyAds';
import { AboutUs } from '../pages/aboutUs/AboutUs';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';

function App() {
  return (
    <div className="App" data-testid="app">
      <Header />
      <Footer />
      <Outlet />
      <Routes>
        <Route path="/my-ads" element={<MyAds />} />
        <Route path="/" element={<MainPage />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route
          path="*"
          element={
            <div className="empty-page">
              <span>404</span>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
