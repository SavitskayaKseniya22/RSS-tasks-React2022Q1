import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { store } from './store';
import { Provider } from 'react-redux';

test('check 404 page', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/test']}>
        <App />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/404/i)).toBeInTheDocument();
});
