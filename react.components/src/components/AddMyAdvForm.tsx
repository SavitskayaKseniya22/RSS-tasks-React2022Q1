import React, { FormEvent } from 'react';
import './AddMyAdvForm.css';

export class AddAdv extends React.Component<Record<string, never>, FormTypes> {
  title: React.RefObject<HTMLInputElement>;
  description: React.RefObject<HTMLInputElement>;
  tel: React.RefObject<HTMLInputElement>;
  email: React.RefObject<HTMLInputElement>;
  area: React.RefObject<HTMLInputElement>;
  price: React.RefObject<HTMLInputElement>;
  date: React.RefObject<HTMLInputElement>;
  type: React.RefObject<HTMLInputElement>;
  ready: React.RefObject<HTMLInputElement>;
  currency: React.RefObject<HTMLSelectElement>;
  submit: React.RefObject<HTMLInputElement>;

  constructor(props: Record<string, never>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.validation = this.validation.bind(this);
    this.resetValidation = this.resetValidation.bind(this);
    this.title = React.createRef();
    this.description = React.createRef();
    this.tel = React.createRef();
    this.email = React.createRef();
    this.area = React.createRef();
    this.price = React.createRef();
    this.date = React.createRef();
    this.type = React.createRef();
    this.ready = React.createRef();
    this.currency = React.createRef();
    this.submit = React.createRef();
    this.state = {
      isValidTitle: null,
      isValidDescription: null,
      isValidTel: null,
      isValidEmail: null,
      isValidArea: null,
      isValidPrice: null,
      isValidDate: null,
    };
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!this.validation()) {
      this.submit!.current!.setAttribute('disabled', 'true');
    }
  }

  handleInput(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();
    this.submit!.current!.removeAttribute('disabled');
    const name = (event.target as HTMLInputElement).getAttribute('name') as string;
    this.resetValidation(name);
  }

  validation() {
    let isCorrect = false;
    if (/^[A-Za-z0-9\s]{6,}$/.test(this.title.current?.value as string)) {
      this.setState({ isValidTitle: true });
      isCorrect = true;
    } else {
      this.setState({ isValidTitle: false });
      isCorrect = false;
    }

    if (/^[A-Za-z0-9\s]{10,}$/.test(this.description.current?.value as string)) {
      this.setState({ isValidDescription: true });
      isCorrect = true;
    } else {
      this.setState({ isValidDescription: false });
      isCorrect = false;
    }

    if (/^[0-9\s-]{5,}$/.test(this.tel.current?.value as string)) {
      this.setState({ isValidTel: true });
      isCorrect = true;
    } else {
      this.setState({ isValidTel: false });
      isCorrect = false;
    }

    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.email.current?.value as string)) {
      this.setState({ isValidEmail: true });
      isCorrect = true;
    } else {
      this.setState({ isValidEmail: false });
      isCorrect = false;
    }

    if (/^[0-9]*[.,]?[0-9]+$/.test(this.area.current?.value as string)) {
      this.setState({ isValidArea: true });
      isCorrect = true;
    } else {
      this.setState({ isValidArea: false });
      isCorrect = false;
    }

    if (/^[0-9]*[.,]?[0-9]+$/.test(this.price.current?.value as string)) {
      this.setState({ isValidPrice: true });
      isCorrect = true;
    } else {
      this.setState({ isValidPrice: false });
      isCorrect = false;
    }

    if (new Date(this.date.current?.value as string) > new Date()) {
      this.setState({ isValidDate: true });
      isCorrect = true;
    } else {
      this.setState({ isValidDate: false });
      isCorrect = false;
    }

    return isCorrect;
  }

  resetValidation(input: string) {
    switch (input) {
      case 'title':
        this.setState((state) => ({
          isValidTitle: state.isValidTitle || !state.isValidTitle,
        }));
        break;

      case 'description':
        this.setState((state) => ({
          isValidDescription: state.isValidDescription || !state.isValidDescription,
        }));
        break;

      case 'tel':
        this.setState((state) => ({
          isValidTel: state.isValidTel || !state.isValidTel,
        }));
        break;

      case 'email':
        this.setState((state) => ({
          isValidEmail: state.isValidEmail || !state.isValidEmail,
        }));
        break;
      case 'area':
        this.setState((state) => ({
          isValidArea: state.isValidArea || !state.isValidArea,
        }));
        break;
      case 'price':
        this.setState((state) => ({
          isValidPrice: state.isValidPrice || !state.isValidPrice,
        }));
        break;
      case 'date':
        this.setState((state) => ({
          isValidDate: state.isValidDate || !state.isValidDate,
        }));
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div data-testid="add-adv">
        <form className="add-adv" onSubmit={this.handleSubmit} noValidate>
          <label className="big-field">
            <h3>Title:</h3>
            <input type="text" name="title" ref={this.title} onInput={this.handleInput} />
            {
              <span id="title-error">
                {this.state.isValidTitle === false
                  ? 'Please enter a valid title. String must contain at least 6 characters.'
                  : ''}
              </span>
            }
          </label>

          <label className="big-field">
            <h3>Description:</h3>
            <input
              type="text"
              name="description"
              ref={this.description}
              onInput={this.handleInput}
            />
            {
              <span id="description-error">
                {this.state.isValidDescription === false
                  ? 'Please enter a valid description. String must contain at least 10 characters.'
                  : ''}
              </span>
            }
          </label>

          <label className="middle-field">
            <h3>Tel:</h3>
            <input type="tel" name="tel" ref={this.tel} onInput={this.handleInput} />
            {
              <span id="tel-error">
                {this.state.isValidTel === false
                  ? 'Please enter a valid number. Number must contain at least 5 digits.'
                  : ''}
              </span>
            }
          </label>

          <label className="middle-field">
            <h3>E-mail:</h3>
            <input type="email" name="email" ref={this.email} onInput={this.handleInput} />
            {
              <span id="email-error">
                {this.state.isValidEmail === false ? 'Please enter a valid email' : ''}
              </span>
            }
          </label>

          <label className="small-field">
            <h3>Area (&#13217;):</h3>
            <input type="number" name="area" ref={this.area} onInput={this.handleInput} />
            {
              <span id="area-error">
                {this.state.isValidArea === false ? 'Please enter a valid number' : ''}
              </span>
            }
          </label>

          <label className="small-field">
            <h3>Price:</h3>
            <div className="price">
              <input type="number" name="price" ref={this.price} onInput={this.handleInput} />
              {
                <span id="price-error">
                  {this.state.isValidPrice === false ? 'Please enter a valid number' : ''}
                </span>
              }
              <select name="currency" ref={this.currency} defaultValue="₽">
                <option value="$">$</option>
                <option value="€">€</option>
                <option value="€">₽</option>
              </select>
            </div>
          </label>
          <label className="small-field">
            <h3>Date:</h3>
            <input type="date" name="date" ref={this.date} onInput={this.handleInput} />
            {
              <span id="date-error">
                {this.state.isValidDate === false ? 'Please enter a valid date' : ''}
              </span>
            }
          </label>

          <label className="small-field">
            <h3>Sale:</h3>
            <input type="radio" id="sale" name="typeAdd" value="sale" defaultChecked />
          </label>
          <label className="small-field">
            <h3>Rent:</h3>
            <input type="radio" id="rent" name="typeAdd" value="rent" />
          </label>
          <label className="small-field">
            <h3>Ready for use</h3>
            <input type="checkbox" name="ready" ref={this.ready} />
          </label>

          <label className="big-field">
            <h3>Add images:</h3>
            <input type="file" name="img" />
          </label>

          <input
            type="submit"
            className="submit-button"
            value="Отправить"
            ref={this.submit}
            disabled
          />
        </form>
      </div>
    );
  }
}

interface FormTypes {
  isValidTitle: boolean | null;
  isValidDescription: boolean | null;
  isValidTel: boolean | null;
  isValidEmail: boolean | null;
  isValidArea: boolean | null;
  isValidPrice: boolean | null;
  isValidDate: boolean | null;
}
