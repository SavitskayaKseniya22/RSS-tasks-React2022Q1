import App from '../../App';
import AboutUs from './AboutUs';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('AboutUs test', () => {
  test('check AboutUs page appearance', () => {
    render(
      <Provider store={store}>
        <AboutUs />
      </Provider>
    );
    const aboutUsPage = screen.getByTestId('about-us');
    expect(aboutUsPage).toMatchSnapshot();
  });

  test('check AboutUs page appearance with link', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/about-us']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('about-us')).toBeInTheDocument();
  });
});
