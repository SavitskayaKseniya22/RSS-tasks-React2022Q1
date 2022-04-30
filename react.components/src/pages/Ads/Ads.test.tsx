import { Ads } from './Ads';
import { render, screen } from '@testing-library/react';

test('check Ads appearance', () => {
  render(<Ads />);
  expect(screen.getByTestId('ads')).toBeInTheDocument();
  expect(screen.getByText('my advertisements')).toBeInTheDocument();
  expect(screen.getByTestId('form-ad')).toBeInTheDocument();
});
