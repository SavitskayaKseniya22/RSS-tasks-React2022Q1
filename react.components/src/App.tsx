import { MainPage } from './pages/MainPage/MainPage';
import { Ads } from './pages/Ads/Ads';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
function App() {
  return (
    <div className="App" data-testid="app">
      <Header />
      <Footer />
      <Outlet />
      <Routes>
        <Route path="/ads" element={<Ads />} />
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
