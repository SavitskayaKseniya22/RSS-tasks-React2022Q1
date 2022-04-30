import App from '../../App';
import { AboutUs } from './AboutUs';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('AboutUs test', () => {
  test('check AboutUs page appearance', () => {
    render(<AboutUs />);
    const aboutUsPage = screen.getByTestId('about-us');
    expect(aboutUsPage).toMatchSnapshot();
  });

  test('check AboutUs page appearance with link', () => {
    render(
      <MemoryRouter initialEntries={['/about-us']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('about-us')).toBeInTheDocument();
  });
});
