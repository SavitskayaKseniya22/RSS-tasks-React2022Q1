import { render, screen } from '@testing-library/react';
import { AboutUs } from './AboutUs';

test('check AboutUs page appearance', () => {
  render(<AboutUs />);
  const aboutUsPage = screen.getByTestId('about-us');
  expect(aboutUsPage).toMatchSnapshot();
});
