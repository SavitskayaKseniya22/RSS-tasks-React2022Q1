import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('check 404 page', () => {
  render(
    <MemoryRouter initialEntries={['/test']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/404/i)).toBeInTheDocument();
});
