import { render, screen } from '@testing-library/react';
import { MyAds } from './MyAds';

test('check form appearance', () => {
  render(<MyAds />);
  const adPage = screen.getByTestId('my-ads');
  expect(adPage).toMatchSnapshot();
});
