import { render, screen } from '@testing-library/react';
import { MyAds } from './MyAds';

test('check MyAds appearance', () => {
  render(<MyAds />);
  expect(screen.getByTestId('my-ads')).toBeInTheDocument();
  expect(screen.getByText('my advertisements')).toBeInTheDocument();
  expect(screen.getByTestId('form-ad')).toBeInTheDocument();
});
