import { FormEvent, useState } from 'react';
import './form.css';
import { AdsList } from '../adsList/AdsList';
import { useForm } from 'react-hook-form';
import { CardProps, FormStateTypes } from '../../interfaces';

export function Form() {
  const initialValues: FormStateTypes = {
    isValidTitle: null,
    isValidDescription: null,
    isValidTel: null,
    isValidEmail: null,
    isValidArea: null,
    isValidPrice: null,
    isValidDate: null,
    isValidFile: null,
    savedCards: [],
    isSubmitBlock: true,
    isErrorsOpen: false,
  };

  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      description: '',
      title: '',
      phone: '',
      email: '',
      img: '',
      date: '',
      price: '',
      typeAdd: '',
      isReady: false,
      area: '',
      currency: '$',
    },
  });
  const [state, setState] = useState(initialValues);

  function onSubmit(data: CardProps) {
    if (validation(data)) {
      const object = {
        title: data.title,
        description: data.description,
        email: data.email,
        phone: data.phone,
        price: data.price,
        date: data.date,
        area: data.area,
        typeAdd: data.typeAdd,
        isReady: data.isReady,
        currency: data.currency,
        img: data.img,
      };

      if (data.img) {
        const file = data.img[0] as unknown as File;
        const fileReader = new FileReader();

        fileReader.onloadend = () => {
          object.img = fileReader.result as string;
          setState({
            ...state,
            savedCards: [...state.savedCards, object],
          });
        };
        fileReader.readAsDataURL(file);
      }

      reset();
    }
  }
  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (state.isSubmitBlock) {
      setState({
        ...state,
        isSubmitBlock: false,
      });
    }
    if (state.isErrorsOpen) {
      const name = (event.target as HTMLInputElement).getAttribute('name') as string;

      resetError(name);
    }
  };

  const validation = (values: CardProps) => {
    const checkList = {
      isValidTitle: false,
      isValidDescription: false,
      isValidTel: false,
      isValidEmail: false,
      isValidArea: false,
      isValidPrice: false,
      isValidDate: false,
      isValidFile: false,
      isErrorsOpen: false,
    };

    let isCorrect = true;

    if (/^[A-Za-z0-9\s\.,]{6,}$/.test(values.title)) {
      checkList.isValidTitle = true;
    } else {
      isCorrect = false;
    }

    if (/^[A-Za-z0-9\s\.,]{10,}$/.test(values.description)) {
      checkList.isValidDescription = true;
    } else {
      isCorrect = false;
    }

    if (/^[0-9\s-]{5,}$/.test(values.phone)) {
      checkList.isValidTel = true;
    } else {
      isCorrect = false;
    }

    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)) {
      checkList.isValidEmail = true;
    } else {
      isCorrect = false;
    }

    if (/^[0-9]*[.,]?[0-9]+$/.test(values.area)) {
      checkList.isValidArea = true;
    } else {
      isCorrect = false;
    }

    if (/^[0-9]*[.,]?[0-9]+$/.test(values.price)) {
      checkList.isValidPrice = true;
    } else {
      isCorrect = false;
    }

    if (new Date(values.date) < new Date()) {
      checkList.isValidDate = true;
    } else {
      isCorrect = false;
    }

    if (values.img) {
      checkList.isValidFile = true;
    } else {
      isCorrect = false;
    }

    checkList.isErrorsOpen = !isCorrect;

    setState({
      ...state,
      ...checkList,
    });

    return isCorrect;
  };

  const resetError = (inputName: string) => {
    switch (inputName) {
      case 'title':
        setState({
          ...state,
          isValidTitle: null,
        });

        break;
      case 'description':
        setState({
          ...state,
          isValidDescription: null,
        });

        break;
      case 'phone':
        setState({
          ...state,
          isValidTel: null,
        });

        break;
      case 'email':
        setState({
          ...state,
          isValidEmail: null,
        });

        break;
      case 'area':
        setState({
          ...state,
          isValidArea: null,
        });

        break;
      case 'price':
        setState({
          ...state,
          isValidPrice: null,
        });

        break;
      case 'date':
        setState({
          ...state,
          isValidDate: null,
        });

        break;
      case 'img':
        setState({
          ...state,
          isValidFile: null,
        });

        break;
    }
  };

  return (
    <div data-testid="advertisements" className="advertisements">
      <form className="add-adv" onSubmit={handleSubmit(onSubmit)} noValidate data-testid="form-ad">
        <label className="big-field">
          <h3>Title:</h3>
          <input
            data-testid="form__title"
            type="text"
            {...register('title')}
            onInput={handleInput}
            placeholder="Please enter a valid title. String must contain at least 6 characters."
          />
          {
            <span className="error-note" data-testid="form__title-error">
              {state.isValidTitle === false ? 'Too short or wrong title' : ''}
            </span>
          }
        </label>

        <label className="big-field">
          <h3>Description:</h3>
          <input
            data-testid="form__description"
            type="text"
            {...register('description')}
            onInput={handleInput}
            placeholder="Please enter a valid description. String must contain at least 10 characters."
          />
          {
            <span className="error-note" data-testid="form__description-error">
              {state.isValidDescription === false ? 'Too short or wrong description' : ''}
            </span>
          }
        </label>

        <label className="middle-field">
          <h3>Tel:</h3>
          <input
            data-testid="form__tel"
            type="tel"
            {...register('phone')}
            onInput={handleInput}
            placeholder="Please enter a valid number. Number must contain at least 5 digits."
          />
          {
            <span className="error-note" data-testid="form__tel-error">
              {state.isValidTel === false ? 'Invalid phone number' : ''}
            </span>
          }
        </label>

        <label className="middle-field">
          <h3>E-mail:</h3>
          <input
            data-testid="form__email"
            type="email"
            {...register('email')}
            onInput={handleInput}
            placeholder="Please enter a valid email"
          />
          {
            <span className="error-note" data-testid="form__email-error">
              {state.isValidEmail === false ? 'Invalid email' : ''}
            </span>
          }
        </label>

        <label className="small-field">
          <h3>Area (&#13217;):</h3>
          <input
            data-testid="form__area"
            type="number"
            {...register('area')}
            onInput={handleInput}
            placeholder="Enter the area of the house"
          />
          {
            <span className="error-note" data-testid="form__error">
              {state.isValidArea === false ? 'Invalid number' : ''}
            </span>
          }
        </label>

        <label className="small-field">
          <h3>Price:</h3>
          <div className="price">
            <input
              data-testid="form__price"
              type="number"
              {...register('price')}
              onInput={handleInput}
              placeholder="Enter price"
            />
            <select {...register('currency')} defaultValue="$">
              <option value="$">&#36;</option>
              <option value="€">&#8364;</option>
              <option value="₽">&#8381;</option>
            </select>
          </div>
          {
            <span id="price-error" className="error-note" data-testid="form__price-error">
              {state.isValidPrice === false ? 'Invalid number' : ''}
            </span>
          }
        </label>
        <label className="small-field">
          <h3>Date of construction:</h3>
          <input type="date" {...register('date')} onInput={handleInput} data-testid="form__date" />
          {
            <span className="error-note" data-testid="form__date-error">
              {state.isValidDate === false ? 'Invalid date' : ''}
            </span>
          }
        </label>

        <div className="middle-field ad-type">
          <h3>Type of ad:</h3>

          <input type="radio" id="sale" value="sale" defaultChecked {...register('typeAdd')} />
          <label className="switcher" htmlFor="sale">
            <span>Sale</span>
          </label>

          <input type="radio" id="rent" value="rent" {...register('typeAdd')} />
          <label className="switcher" htmlFor="rent">
            <span>Rent</span>
          </label>
        </div>

        <label className="middle-field">
          <h3>Ready for use</h3>
          <input type="checkbox" {...register('isReady')} />
        </label>

        <label className="big-field">
          <h3>Add images:</h3>
          <input type="file" {...register('img')} onInput={handleInput} data-testid="form__file" />
          {
            <span className="error-note" data-testid="form__file-error">
              {state.isValidFile === false ? 'Please choose an img' : ''}
            </span>
          }
        </label>

        <input
          data-testid="form__submit"
          type="submit"
          className="submit-button"
          value="send"
          disabled={state.isSubmitBlock}
        />
      </form>
      <AdsList savedCards={state.savedCards} />
    </div>
  );
}
