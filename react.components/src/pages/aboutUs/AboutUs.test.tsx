import { AboutUs } from './AboutUs';
import { render, screen } from '@testing-library/react';

test('check AboutUs page appearance', () => {
  render(<AboutUs />);
  const aboutUsPage = screen.getByTestId('about-us');
  expect(aboutUsPage).toMatchSnapshot();
});
