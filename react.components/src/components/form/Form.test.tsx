import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardProps } from '../../interfaces';

import { Form } from './Form';
describe('form test', () => {
  const func = jest.fn() as (object: CardProps) => void;

  test('check form appearance', () => {
    render(<Form changeState={func} />);
    const adPage = screen.getByTestId('form__container');
    expect(adPage).toBeInTheDocument();
    expect(adPage).toContainElement(screen.getByTestId('form-ad'));
  });

  test('check input title work', () => {
    render(<Form changeState={func} />);
    const title = screen.getByTestId('form__title') as HTMLInputElement;
    fireEvent.input(title, { target: { value: 'text input' } });
    expect(title.value).toEqual('text input');
  });

  test('check handleinput title work', () => {
    render(<Form changeState={func} />);
    const title = screen.getByTestId('form__title') as HTMLInputElement;
    const submit = screen.getByTestId('form__submit') as HTMLInputElement;
    expect(submit.disabled).toEqual(true);
    fireEvent.input(title, { target: { value: 'text input' } });
    expect(submit.disabled).toEqual(false);
  });

  test('check title error work', async () => {
    render(<Form changeState={func} />);
    const title = screen.getByTestId('form__title') as HTMLInputElement;
    const submit = screen.getByTestId('form__submit') as HTMLInputElement;
    expect(submit.disabled).toEqual(true);
    fireEvent.input(title, { target: { value: 'text' } });
    fireEvent.click(submit);
    await waitFor(() => expect(screen.getByTestId('form__title-error')).toBeInTheDocument());
    expect(screen.getByTestId('form__title-error').textContent).toEqual('Too short or wrong title');
    fireEvent.input(title, { target: { value: 'texttexttext' } });
    expect(screen.queryByText('Too short or wrong title')).not.toBeInTheDocument();
    fireEvent.click(submit);
    await waitFor(() =>
      expect(screen.queryByText('Too short or wrong title')).not.toBeInTheDocument()
    );
  });

  test('check date input', async () => {
    render(<Form changeState={func} />);
    const date = screen.getByTestId('form__date') as HTMLInputElement;
    const submit = screen.getByTestId('form__submit') as HTMLInputElement;
    fireEvent.input(date, { target: { value: '2023-04-04' } });
    expect(date.value).toEqual('2023-04-04');
    fireEvent.click(submit);
    await waitFor(() => expect(screen.getByTestId('form__date-error')).toBeInTheDocument());
    expect(screen.getByTestId('form__date-error').textContent).toEqual('Invalid date');
    fireEvent.input(date, { target: { value: '2021-04-04' } });
    expect(screen.queryByText('Invalid date')).not.toBeInTheDocument();
  });

  test('check the entire form for a submission error', async () => {
    render(<Form changeState={func} />);
    const submit = screen.getByTestId('form__submit') as HTMLInputElement;
    fireEvent.input(screen.getByTestId('form__title'), { target: { value: 'text' } });
    fireEvent.input(screen.getByTestId('form__description'), { target: { value: 'text' } });
    fireEvent.input(screen.getByTestId('form__tel'), { target: { value: 'text' } });
    fireEvent.input(screen.getByTestId('form__email'), { target: { value: 'text' } });
    fireEvent.input(screen.getByTestId('form__price'), { target: { value: 'text' } });
    fireEvent.input(screen.getByTestId('form__date'), { target: { value: 'text' } });
    fireEvent.input(screen.getByTestId('form__area'), { target: { value: 'text' } });
    fireEvent.click(submit);

    await waitFor(() => expect(screen.getByTestId('form-ad')).toHaveClass('form form_invalid'));
    expect(screen.queryByText('ads-list')).not.toBeInTheDocument();
  });

  test('reset test form after correct submission', async () => {
    render(<Form changeState={func} />);
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

    const fileUploader = screen.getByTestId('form__file') as HTMLInputElement;
    await waitFor(() => userEvent.upload(fileUploader, file));
    expect(fileUploader.files?.[0]).toStrictEqual(file);
    expect(fileUploader.files).toHaveLength(1);
    expect((screen.getByTestId('form__title') as HTMLInputElement).value).toEqual('texttext');
    fireEvent.click(submit);

    await waitFor(() =>
      expect((screen.getByTestId('form__title') as HTMLInputElement).value).toEqual('')
    );
    expect(screen.getByTestId('form-ad')).toHaveClass('form form_valid');
  });
});
