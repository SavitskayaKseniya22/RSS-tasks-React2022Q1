import React, { FormEvent } from 'react';
import './form.css';
import { FormTypes } from '../../interfaces';
import { AdsList } from '../adsList/AdsList';

export class Form extends React.Component<Record<string, never>, FormTypes> {
  title: React.RefObject<HTMLInputElement>;
  description: React.RefObject<HTMLInputElement>;
  tel: React.RefObject<HTMLInputElement>;
  email: React.RefObject<HTMLInputElement>;
  area: React.RefObject<HTMLInputElement>;
  price: React.RefObject<HTMLInputElement>;
  date: React.RefObject<HTMLInputElement>;
  ready: React.RefObject<HTMLInputElement>;
  currency: React.RefObject<HTMLSelectElement>;
  submit: React.RefObject<HTMLInputElement>;
  fileInput: React.RefObject<HTMLInputElement>;
  form: React.RefObject<HTMLFormElement>;
  typeSale: React.RefObject<HTMLInputElement>;
  typeRent: React.RefObject<HTMLInputElement>;

  constructor(props: Record<string, never>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.validation = this.validation.bind(this);
    this.resetError = this.resetError.bind(this);
    this.title = React.createRef();
    this.description = React.createRef();
    this.tel = React.createRef();
    this.email = React.createRef();
    this.area = React.createRef();
    this.price = React.createRef();
    this.date = React.createRef();
    this.ready = React.createRef();
    this.currency = React.createRef();
    this.submit = React.createRef();
    this.fileInput = React.createRef();
    this.typeSale = React.createRef();
    this.typeRent = React.createRef();
    this.form = React.createRef();
    this.state = {
      isValidTitle: null,
      isValidDescription: null,
      isValidTel: null,
      isValidEmail: null,
      isValidArea: null,
      isValidPrice: null,
      isValidDate: null,
      isValidFile: null,
      savedCards: [],
      savedImages: [],
    };
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.validation()) {
      const object = {
        name: this.title.current?.value,
        description: this.description.current?.value,
        email: this.email.current?.value,
        phone: this.tel.current?.value,
        price: this.price.current?.value,
        date: this.date.current?.value,
        area: this.area.current?.value,
        type: this.typeSale.current?.checked ? 'sale' : 'rent',
        isReady: this.ready.current?.checked,
        currency: this.currency.current?.value,
      };

      if (this.fileInput.current?.files?.length) {
        const file = this.fileInput.current?.files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = () => {
          this.setState({
            savedImages: [...this.state.savedImages, fileReader.result as string],
          });
        };
        fileReader.readAsDataURL(file);
      }

      this.setState({
        savedCards: [...this.state.savedCards, object],
      });

      this.form.current?.reset();
    }
    this.submit?.current?.setAttribute('disabled', 'true');
  }

  handleInput(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();
    this.submit?.current?.removeAttribute('disabled');
    const name = (event.target as HTMLInputElement).getAttribute('name') as string;
    this.resetError(name);
  }

  validation() {
    let isCorrect = true;
    if (/^[A-Za-z0-9\s\.,]{6,}$/.test(this.title.current?.value as string)) {
      this.setState({ isValidTitle: true });
    } else {
      this.setState({ isValidTitle: false });
      isCorrect = false;
    }

    if (/^[A-Za-z0-9\s\.,]{10,}$/.test(this.description.current?.value as string)) {
      this.setState({ isValidDescription: true });
    } else {
      this.setState({ isValidDescription: false });
      isCorrect = false;
    }

    if (/^[0-9\s-]{5,}$/.test(this.tel.current?.value as string)) {
      this.setState({ isValidTel: true });
    } else {
      this.setState({ isValidTel: false });
      isCorrect = false;
    }

    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.email.current?.value as string)) {
      this.setState({ isValidEmail: true });
    } else {
      this.setState({ isValidEmail: false });
      isCorrect = false;
    }

    if (/^[0-9]*[.,]?[0-9]+$/.test(this.area.current?.value as string)) {
      this.setState({ isValidArea: true });
    } else {
      this.setState({ isValidArea: false });
      isCorrect = false;
    }

    if (/^[0-9]*[.,]?[0-9]+$/.test(this.price.current?.value as string)) {
      this.setState({ isValidPrice: true });
    } else {
      this.setState({ isValidPrice: false });
      isCorrect = false;
    }

    if (new Date(this.date.current?.value as string) < new Date()) {
      this.setState({ isValidDate: true });
    } else {
      this.setState({ isValidDate: false });
      isCorrect = false;
    }

    if (this.fileInput.current?.files?.length) {
      this.setState({ isValidFile: true });
    } else {
      this.setState({ isValidFile: false });
      isCorrect = false;
    }

    return isCorrect;
  }

  resetError(input: string) {
    switch (input) {
      case 'title':
        this.setState({ isValidTitle: null });
        break;
      case 'description':
        this.setState({ isValidDescription: null });
        break;
      case 'tel':
        this.setState({ isValidTel: null });
        break;
      case 'email':
        this.setState({ isValidEmail: null });
        break;
      case 'area':
        this.setState({ isValidArea: null });
        break;
      case 'price':
        this.setState({ isValidPrice: null });
        break;
      case 'date':
        this.setState({ isValidDate: null });
        break;
      case 'img':
        this.setState({ isValidFile: null });
        break;
    }
  }

  render() {
    return (
      <div data-testid="advertisements" className="advertisements">
        <form
          className="add-adv"
          onSubmit={this.handleSubmit}
          noValidate
          ref={this.form}
          data-testid="form-ad"
        >
          <label className="big-field">
            <h3>Title:</h3>
            <input
              data-testid="form__title"
              type="text"
              name="title"
              ref={this.title}
              onInput={this.handleInput}
              placeholder="Please enter a valid title. String must contain at least 6 characters."
            />
            {
              <span className="error-note" data-testid="form__title-error">
                {this.state.isValidTitle === false ? 'Too short or wrong title' : ''}
              </span>
            }
          </label>

          <label className="big-field">
            <h3>Description:</h3>
            <input
              data-testid="form__description"
              type="text"
              name="description"
              ref={this.description}
              onInput={this.handleInput}
              placeholder="Please enter a valid description. String must contain at least 10 characters."
            />
            {
              <span className="error-note" data-testid="form__description-error">
                {this.state.isValidDescription === false ? 'Too short or wrong description' : ''}
              </span>
            }
          </label>

          <label className="middle-field">
            <h3>Tel:</h3>
            <input
              data-testid="form__tel"
              type="tel"
              name="tel"
              ref={this.tel}
              onInput={this.handleInput}
              placeholder="Please enter a valid number. Number must contain at least 5 digits."
            />
            {
              <span className="error-note" data-testid="form__tel-error">
                {this.state.isValidTel === false ? 'Invalid phone number' : ''}
              </span>
            }
          </label>

          <label className="middle-field">
            <h3>E-mail:</h3>
            <input
              data-testid="form__email"
              type="email"
              name="email"
              ref={this.email}
              onInput={this.handleInput}
              placeholder="Please enter a valid email"
            />
            {
              <span className="error-note" data-testid="form__email-error">
                {this.state.isValidEmail === false ? 'Invalid email' : ''}
              </span>
            }
          </label>

          <label className="small-field">
            <h3>Area (&#13217;):</h3>
            <input
              data-testid="form__area"
              type="number"
              name="area"
              ref={this.area}
              onInput={this.handleInput}
              placeholder="Enter the area of the house"
            />
            {
              <span className="error-note" data-testid="form__error">
                {this.state.isValidArea === false ? 'Invalid number' : ''}
              </span>
            }
          </label>

          <label className="small-field">
            <h3>Price:</h3>
            <div className="price">
              <input
                data-testid="form__price"
                type="number"
                name="price"
                ref={this.price}
                onInput={this.handleInput}
                placeholder="Enter price"
              />
              <select name="currency" ref={this.currency} defaultValue="$">
                <option value="$">&#36;</option>
                <option value="€">&#8364;</option>
                <option value="₽">&#8381;</option>
              </select>
            </div>
            {
              <span id="price-error" className="error-note" data-testid="form__price-error">
                {this.state.isValidPrice === false ? 'Invalid number' : ''}
              </span>
            }
          </label>
          <label className="small-field">
            <h3>Date of construction:</h3>
            <input
              type="date"
              name="date"
              ref={this.date}
              onInput={this.handleInput}
              data-testid="form__date"
            />
            {
              <span className="error-note" data-testid="form__date-error">
                {this.state.isValidDate === false ? 'Invalid date' : ''}
              </span>
            }
          </label>

          <div className="middle-field ad-type">
            <h3>Type of ad:</h3>

            <input
              type="radio"
              id="sale"
              name="typeAdd"
              value="sale"
              defaultChecked
              ref={this.typeSale}
            />
            <label className="switcher" htmlFor="sale">
              <span>Sale</span>
            </label>

            <input type="radio" id="rent" name="typeAdd" value="rent" ref={this.typeRent} />
            <label className="switcher" htmlFor="rent">
              <span>Rent</span>
            </label>
          </div>

          <label className="middle-field">
            <h3>Ready for use</h3>
            <input type="checkbox" name="ready" ref={this.ready} />
          </label>

          <label className="big-field">
            <h3>Add images:</h3>
            <input
              type="file"
              name="img"
              ref={this.fileInput}
              onInput={this.handleInput}
              data-testid="form__file"
            />
            {
              <span className="error-note" data-testid="form__file-error">
                {this.state.isValidFile === false ? 'Please choose an img' : ''}
              </span>
            }
          </label>

          <input
            data-testid="form__submit"
            type="submit"
            className="submit-button"
            value="send"
            ref={this.submit}
            disabled
          />
        </form>
        <AdsList savedCards={this.state.savedCards} savedImages={this.state.savedImages} />
      </div>
    );
  }
}
