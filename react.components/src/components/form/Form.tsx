import { CardProps, GlobalTypes } from '../../interfaces';
import { FormEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import './form.css';

const Form = () => {
  const adsFormValues = useSelector((state: GlobalTypes) => state.adsFormValues, shallowEqual);
  const savedCards = useSelector((state: GlobalTypes) => state.savedCards, shallowEqual);
  const state = useSelector((state: GlobalTypes) => state, shallowEqual);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    formState: { errors, isDirty, isValid, isSubmitted, isSubmitSuccessful },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: adsFormValues,
  });

  useEffect(() => {
    return () => {
      const values = getValues();
      dispatch({
        type: 'handleAddsForm',
        payload: { ...state, adsFormValues: values },
      });
    };
  }, []);

  const defaultValues = {
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
  };

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
      isFavorite: false,
      adCreationDate: Date.now(),
    };

    if (data.img) {
      const file = data.img[0] as unknown as File;
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        object.img = fileReader.result as string;
        dispatch({
          type: 'handleSavedCards',
          payload: { ...state, savedCards: [...(savedCards as CardProps[]), object] },
        });
      };
      fileReader.readAsDataURL(file);
    }

    reset(defaultValues, {
      keepValues: false,
    });
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
      reset(
        {},
        {
          keepErrors: true,
          keepDirty: true,
          keepIsSubmitted: false,
          keepTouched: true,
          keepIsValid: true,
          keepSubmitCount: true,
          keepValues: true,
        }
      );
    }
  };

  return (
    <div data-testid="form__container" className="form__container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        data-testid="form-ad"
        className={
          !isValid && isSubmitted && !isSubmitSuccessful ? 'form form_invalid' : 'form form_valid'
        }
      >
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
            <select {...register('currency')} defaultValue="$" data-testid="form__currency">
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

          <input type="radio" id="sale" value="sale" {...register('typeAdd')} />
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
          <input type="checkbox" {...register('isReady')} data-testid="form__ready-chechbox" />
        </label>

        <label className="big-field">
          <h3>Add images:</h3>
          <input
            type="file"
            {...register('img', {
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
    </div>
  );
};

export default Form;
