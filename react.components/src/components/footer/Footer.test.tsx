import { Footer } from './Footer';
import { render, screen } from '@testing-library/react';

test('check footer appearance', () => {
  render(<Footer />);
  const footer = screen.getByTestId('footer');
  expect(footer).toMatchSnapshot();
});
