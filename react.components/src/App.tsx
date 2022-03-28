import { BrowserRouter, Outlet } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
  return (
    <div className="App" data-testid="app">
      <BrowserRouter>
        <Header />
      </BrowserRouter>
      <Footer />
      <Outlet />
    </div>
  );
}

export default App;
