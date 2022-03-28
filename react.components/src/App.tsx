import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { AboutUs } from './pages/AboutUs';
import { MainPage } from './pages/MainPage';

function App() {
  return (
    <div className="App" data-testid="app">
      <Header />
      <Footer />
      <Outlet />
      <Routes>
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
