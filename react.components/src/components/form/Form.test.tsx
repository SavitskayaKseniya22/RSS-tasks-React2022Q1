import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from './Form';

test('check form appearance', () => {
  render(<Form />);
  const adPage = screen.getByTestId('advertisements');
  expect(adPage).toHaveClass('advertisements');
  const formAd = screen.getByTestId('form-ad');
  expect(adPage).toContainElement(formAd);
});

test('check input title work', () => {
  render(<Form />);
  const title = screen.getByTestId('form__title') as HTMLInputElement;
  fireEvent.input(title, { target: { value: 'text input' } });
  expect(title.value).toEqual('text input');
});

test('check handleinput title work', () => {
  render(<Form />);
  const title = screen.getByTestId('form__title') as HTMLInputElement;
  const submit = screen.getByTestId('form__submit') as HTMLInputElement;
  expect(submit.disabled).toEqual(true);
  fireEvent.input(title, { target: { value: 'text input' } });
  expect(submit.disabled).toEqual(false);
});

test('check title error work', () => {
  render(<Form />);
  const title = screen.getByTestId('form__title') as HTMLInputElement;
  const submit = screen.getByTestId('form__submit') as HTMLInputElement;
  expect(submit.disabled).toEqual(true);
  fireEvent.input(title, { target: { value: 'text' } });
  fireEvent.click(submit);
  const error = screen.getByTestId('form__title-error') as HTMLInputElement;
  expect(error.textContent).toEqual('Too short or wrong title');
  fireEvent.input(title, { target: { value: 'texttexttext' } });
  expect(error.textContent).toEqual('');
  fireEvent.click(submit);
  expect(error.textContent).toEqual('');
});

test('check date input', () => {
  render(<Form />);
  const date = screen.getByTestId('form__date') as HTMLInputElement;
  const submit = screen.getByTestId('form__submit') as HTMLInputElement;
  fireEvent.input(date, { target: { value: '2023-04-04' } });
  expect(date.value).toEqual('2023-04-04');
  fireEvent.click(submit);
  const error = screen.getByTestId('form__date-error');
  expect(error.textContent).toEqual('Invalid date');
  fireEvent.input(date, { target: { value: '2021-04-04' } });
  expect(error.textContent).toEqual('');
});

test('test whole form for submit error', () => {
  render(<Form />);
  const submit = screen.getByTestId('form__submit') as HTMLInputElement;
  fireEvent.input(screen.getByTestId('form__title'), { target: { value: 'text' } });
  fireEvent.input(screen.getByTestId('form__description'), { target: { value: 'text' } });
  fireEvent.input(screen.getByTestId('form__tel'), { target: { value: 'text' } });
  fireEvent.input(screen.getByTestId('form__email'), { target: { value: 'text' } });
  fireEvent.input(screen.getByTestId('form__price'), { target: { value: 'text' } });
  fireEvent.input(screen.getByTestId('form__date'), { target: { value: 'text' } });
  fireEvent.input(screen.getByTestId('form__area'), { target: { value: 'text' } });
  fireEvent.click(submit);
  expect(screen.getByTestId('Cardlist').innerHTML).toEqual('');
});

test('test whole form for submit correct', () => {
  render(<Form />);
  window.URL.createObjectURL = jest.fn();
  const submit = screen.getByTestId('form__submit') as HTMLInputElement;
  fireEvent.input(screen.getByTestId('form__title'), { target: { value: 'texttext' } });
  fireEvent.input(screen.getByTestId('form__description'), {
    target: { value: 'texttexttexttext' },
  });
  fireEvent.input(screen.getByTestId('form__tel'), { target: { value: '5555555' } });
  fireEvent.input(screen.getByTestId('form__email'), { target: { value: 'tempo@gmail.com' } });
  fireEvent.input(screen.getByTestId('form__price'), { target: { value: '55555' } });
  fireEvent.input(screen.getByTestId('form__date'), { target: { value: '2021-04-04' } });
  fireEvent.input(screen.getByTestId('form__area'), { target: { value: '55555' } });
  const file = new File(['img'], 'img.png', { type: 'image/png' });
  userEvent.upload(screen.getByTestId('form__file'), file);
  fireEvent.click(submit);
  expect(screen.getByTestId('Cardlist').childNodes.length).toBeGreaterThan(0);
});
