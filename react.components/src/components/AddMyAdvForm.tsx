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
    this.state = { isValidTitle: null };
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.validation();
  }

  handleInput(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();
    this.submit!.current!.removeAttribute('disabled');
    const name = (event.target as HTMLInputElement).getAttribute('name') as string;
    this.resetValidation(name);
  }

  validation() {
    if (/[A-Za-z0-9\s]{6,}/.test(this.title.current?.value as string)) {
      this.setState({ isValidTitle: true });
    } else {
      this.setState({ isValidTitle: false });
    }
  }

  resetValidation(input: string) {
    switch (input) {
      case 'title':
        this.setState((state) => ({
          isValidTitle: state.isValidTitle || !state.isValidTitle,
        }));
        break;

      case 'value2':
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div data-testid="add-adv">
        <form className="add-adv" onSubmit={this.handleSubmit}>
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
              pattern="[A-Za-z0-9\s]{10,}"
            />
          </label>

          <label className="middle-field">
            <h3>Tel:</h3>
            <input type="tel" name="tel" ref={this.tel} pattern="[0-9\s-]{5,}" />
          </label>

          <label className="middle-field">
            <h3>E-mail:</h3>
            <input type="email" name="email" id="" ref={this.email} />
          </label>

          <label className="small-field">
            <h3>Area (&#13217;):</h3>
            <input type="number" name="area" ref={this.area} pattern="^[0-9]*[.,]?[0-9]+$" />
          </label>

          <label className="small-field">
            <h3>Price:</h3>
            <div className="price">
              <input type="number" name="" ref={this.price} pattern="^[0-9]*[.,]?[0-9]+$" />
              <select name="currency" ref={this.currency}>
                <option value="$">$</option>
                <option value="€">€</option>
                <option value="€">₽</option>
              </select>
            </div>
          </label>
          <label className="small-field">
            <h3>Date:</h3>
            <input type="date" name="date" ref={this.date} />
          </label>

          <label className="small-field">
            <h3>Sale:</h3>
            <input type="radio" id="sale" name="typeAdd" value="sale" />
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
}
