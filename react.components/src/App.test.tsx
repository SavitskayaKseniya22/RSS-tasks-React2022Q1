import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('check app page appearance', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const app = screen.getByTestId('app');
  expect(app).toMatchSnapshot();
});
