import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

test('check footer appearance', () => {
  render(<Footer />);
  const footer = screen.getByTestId('footer');
  expect(footer).toMatchSnapshot();
});
