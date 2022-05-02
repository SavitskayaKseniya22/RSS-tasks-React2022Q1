import Ads from '../../pages/Ads/Ads';
import Form from './Form';
import App, { reducer } from '../../App';
import { mockedStateStart } from '../../mockedState';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReducer } from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

describe('form test', () => {
  /*
  test('check form appearance', () => {
    render(<Form />);
    const adPage = screen.getByTestId('form__container');
    expect(adPage).toContainElement(screen.getByTestId('form-ad'));
  });

  test('check input title work', () => {
    render(<Form />);
    const title = screen.getByTestId('form__title') as HTMLInputElement;
    fireEvent.input(title, { target: { value: 'text input' } });
    expect(title.value).toEqual('text input');
  });

  test('check submit button disabled work', () => {
    render(<Form />);
    const submit = screen.getByTestId('form__submit') as HTMLInputElement;
    expect(submit.disabled).toEqual(true);
    fireEvent.input(screen.getByTestId('form__title'), { target: { value: 'text input' } });
    expect(submit.disabled).toEqual(false);
  });

  test('check title error work', async () => {
    render(<Form />);
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
    render(<Form />);
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
    render(<Form />);
    const submit = screen.getByTestId('form__submit') as HTMLInputElement;
    fireEvent.input(screen.getByTestId('form__title'), { target: { value: 'text' } });
    fireEvent.input(screen.getByTestId('form__date'), { target: { value: 'text' } });
    fireEvent.click(submit);

    await waitFor(() => expect(screen.getByTestId('form-ad')).toHaveClass('form form_invalid'));
  });

  test('reset test form after correct submission and add cart to page', async () => {
    const Wrapper = () => {
      const [state, dispatch] = useReducer(reducer, mockedStateStart);
      return (
        <BrowserRouter>
          <ContextApp.Provider value={{ state, dispatch }}>
            <Ads />
          </ContextApp.Provider>
        </BrowserRouter>
      );
    };

    render(<Wrapper />);
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

    await waitFor(() => fireEvent.click(submit));

    await waitFor(() =>
      expect((screen.getByTestId('form__title') as HTMLInputElement).value).toEqual('')
    );
    expect(screen.getByTestId('form-ad')).toHaveClass('form form_valid');
    await waitFor(() => expect(screen.getByTestId('ads').childNodes.length).toBe(3));
    await waitFor(() => expect(screen.getByTestId('ads-list').childNodes.length).toBe(1));
  });

  test('test restore data after unmount/mount', async () => {
    const Wrapper = () => {
      return (
        <MemoryRouter initialEntries={['/ads']}>
          <App />
        </MemoryRouter>
      );
    };
    render(<Wrapper />);

    fireEvent.input(screen.getByTestId('form__title'), { target: { value: 'texttext' } });
    userEvent.selectOptions(screen.getByTestId('form__currency'), ['₽']);
    userEvent.click(screen.getByTestId('form__ready-chechbox'));

    const file = new File(['img'], 'img.png', { type: 'image/png' });
    const fileUploader = screen.getByTestId('form__file') as HTMLInputElement;
    await waitFor(() => userEvent.upload(fileUploader, file));

    expect((screen.getByTestId('form__title') as HTMLInputElement).value).toEqual('texttext');
    expect(screen.queryByText('Description:')).toBeInTheDocument();

    await waitFor(() => userEvent.click(screen.getByTestId('main-page__link')));

    expect(screen.queryByText('Description:')).not.toBeInTheDocument();

    await waitFor(() => userEvent.click(screen.getByTestId('ads__link')));

    expect(screen.queryByText('Description:')).toBeInTheDocument();
    expect((screen.getByTestId('form__title') as HTMLInputElement).value).toEqual('texttext');
    expect((screen.getByTestId('form__currency') as HTMLSelectElement).value).toEqual('₽');
    expect(screen.getByTestId('form__ready-chechbox')).toBeChecked();

    expect(fileUploader.files?.[0]).toStrictEqual(file);
    expect(fileUploader.files).toHaveLength(1);
  });*/
});
