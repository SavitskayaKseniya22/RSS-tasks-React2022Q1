import { render, screen } from '@testing-library/react';
import App from './App';

test('check app page appearance', () => {
  render(<App />);
  const app = screen.getByTestId('app');
  expect(app).toMatchSnapshot();
});
