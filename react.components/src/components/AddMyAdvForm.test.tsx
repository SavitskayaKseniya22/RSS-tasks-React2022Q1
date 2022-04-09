import { fireEvent, render, screen } from '@testing-library/react';
import { AddAdv } from './AddMyAdvForm';

test('check form appearance', () => {
  render(<AddAdv />);
  const adPage = screen.getByTestId('advertisements');
  expect(adPage).toHaveClass('advertisements');
  const formAd = screen.getByTestId('form-ad');
  expect(adPage).toContainElement(formAd);
});

test('check input title work', () => {
  render(<AddAdv />);
  const title = screen.getByTestId('title') as HTMLInputElement;
  fireEvent.input(title, { target: { value: 'text input' } });
  expect(title.value).toEqual('text input');
});

test('check handleinput title work', () => {
  render(<AddAdv />);
  const title = screen.getByTestId('title') as HTMLInputElement;
  const submit = screen.getByTestId('form-submit') as HTMLInputElement;
  expect(submit.disabled).toEqual(true);
  fireEvent.input(title, { target: { value: 'text input' } });
  expect(submit.disabled).toEqual(false);
});

test('check title error work', () => {
  render(<AddAdv />);
  const title = screen.getByTestId('title') as HTMLInputElement;
  const submit = screen.getByTestId('form-submit') as HTMLInputElement;
  expect(submit.disabled).toEqual(true);
  fireEvent.input(title, { target: { value: 'text' } });
  fireEvent.click(submit);
  const error = screen.getByTestId('title-error') as HTMLInputElement;
  expect(error.textContent).toEqual('Too short or wrong title');
  fireEvent.input(title, { target: { value: 'texttexttext' } });
  expect(error.textContent).toEqual('');
  fireEvent.click(submit);
  expect(error.textContent).toEqual('');
});
