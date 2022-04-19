import { FormEvent, useState } from 'react';
import './form.css';
import { AdsList } from '../adsList/AdsList';
import { useForm } from 'react-hook-form';
import { CardProps, FormStateTypes } from '../../interfaces';

export function Form() {
  const initialValues: FormStateTypes = {
    savedCards: [],
  };

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isDirty, isValid, isSubmitted },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
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
  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const name = (event.target as HTMLInputElement).getAttribute('name') as
      | 'description'
      | 'title'
      | 'phone'
      | 'email'
      | 'img'
      | 'date'
      | 'price'
      | 'typeAdd'
      | 'isReady'
      | 'area'
      | 'currency';

    clearErrors([name]);
    if (isSubmitted) {
      console.log(11);
      reset(
        {},
        {
          keepErrors: true,
          keepDirty: true,
          keepIsSubmitted: false,
          keepTouched: true,
          keepIsValid: true,
          keepSubmitCount: true,
        }
      );
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
            {...register('title', {
              required: true,
              pattern: /^[A-Za-z0-9\s\.,]{6,}$/i,
            })}
            onInput={handleInput}
            placeholder="Please enter a valid title. String must contain at least 6 characters."
          />
          {errors.title && (
            <span className="error-note" data-testid="form__title-error">
              Too short or wrong title
            </span>
          )}
        </label>

        <label className="big-field">
          <h3>Description:</h3>
          <input
            data-testid="form__description"
            type="text"
            {...register('description', {
              required: true,
              pattern: /^[A-Za-z0-9\s\.,]{10,}$/i,
            })}
            onInput={handleInput}
            placeholder="Please enter a valid description. String must contain at least 10 characters."
          />
          {errors.description && (
            <span className="error-note" data-testid="form__description-error">
              Too short or wrong description
            </span>
          )}
        </label>

        <label className="middle-field">
          <h3>Tel:</h3>
          <input
            data-testid="form__tel"
            type="tel"
            {...register('phone', {
              required: true,
              pattern: /^[0-9\s-]{5,}$/i,
            })}
            onInput={handleInput}
            placeholder="Please enter a valid number. Number must contain at least 5 digits."
          />
          {errors.phone && (
            <span className="error-note" data-testid="form__tel-error">
              Invalid phone number
            </span>
          )}
        </label>

        <label className="middle-field">
          <h3>E-mail:</h3>
          <input
            data-testid="form__email"
            type="email"
            {...register('email', {
              required: true,
              pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i,
            })}
            onInput={handleInput}
            placeholder="Please enter a valid email"
          />
          {errors.email && (
            <span className="error-note" data-testid="form__email-error">
              Invalid email
            </span>
          )}
        </label>

        <label className="small-field">
          <h3>Area (&#13217;):</h3>
          <input
            data-testid="form__area"
            type="number"
            {...register('area', {
              required: true,
              pattern: /^[0-9]*[.,]?[0-9]+$/i,
            })}
            onInput={handleInput}
            placeholder="Enter the area of the house"
          />
          {errors.area && (
            <span className="error-note" data-testid="form__error">
              Invalid number
            </span>
          )}
        </label>

        <label className="small-field">
          <h3>Price:</h3>
          <div className="price">
            <input
              data-testid="form__price"
              type="number"
              {...register('price', {
                required: true,
                pattern: /^[0-9]*[.,]?[0-9]+$/i,
              })}
              onInput={handleInput}
              placeholder="Enter price"
            />
            <select {...register('currency')} defaultValue="$">
              <option value="$">&#36;</option>
              <option value="€">&#8364;</option>
              <option value="₽">&#8381;</option>
            </select>
          </div>
          {errors.price && (
            <span id="price-error" className="error-note" data-testid="form__price-error">
              Invalid number
            </span>
          )}
        </label>
        <label className="small-field">
          <h3>Date of construction:</h3>
          <input
            type="date"
            {...register('date', {
              required: true,
              validate: (input) => new Date(input) < new Date(),
            })}
            onInput={handleInput}
            data-testid="form__date"
          />
          {errors.date && (
            <span className="error-note" data-testid="form__date-error">
              Invalid date
            </span>
          )}
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
          <input
            type="file"
            {...register('img', {
              required: true,
              validate: (input) => input.length > 0,
            })}
            onInput={handleInput}
            data-testid="form__file"
          />
          {errors.img && (
            <span className="error-note" data-testid="form__file-error">
              Please choose an img
            </span>
          )}
        </label>

        <input
          data-testid="form__submit"
          type="submit"
          className="submit-button"
          value="send"
          disabled={!isDirty || (isSubmitted && !isValid)}
        />
      </form>
      <AdsList savedCards={state.savedCards} />
    </div>
  );
}
