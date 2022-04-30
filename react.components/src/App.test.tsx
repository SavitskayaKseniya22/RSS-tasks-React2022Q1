import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

test('check 404 page', () => {
  render(
    <MemoryRouter initialEntries={['/test']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/404/i)).toBeInTheDocument();
});
