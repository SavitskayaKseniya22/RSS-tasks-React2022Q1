import React, { FormEvent } from 'react';
import './AddMyAdvForm.css';
import { Card, CardProps } from './Card';

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
  fileInput: React.RefObject<HTMLInputElement>;
  object: CardProps | undefined;
  form: React.RefObject<HTMLFormElement>;

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
    this.fileInput = React.createRef();
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
    if (!this.validation()) {
      this.submit!.current!.setAttribute('disabled', 'true');
    } else {
      this.object = {
        name: this.title.current?.value,
        description: this.description.current?.value,
        email: this.email.current?.value,
        phone: this.tel.current?.value,
        price: this.price.current?.value,
        date: this.date.current?.value,
        area: this.area.current?.value,
        type: this.type.current?.value,
        isReady: this.ready.current?.value,
        currency: this.currency.current?.value,
      };
      if (this.fileInput.current?.files?.length) {
        const imgUrl = URL.createObjectURL(this.fileInput.current?.files[0]);
        this.setState({
          savedImages: [...this.state.savedImages, imgUrl],
        });
      }

      this.setState({
        savedCards: [...this.state.savedCards, this.object],
      });

      this.form.current?.reset();
    }
  }

  handleInput(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();
    this.submit!.current!.removeAttribute('disabled');
    const name = (event.target as HTMLInputElement).getAttribute('name') as string;
    this.resetValidation(name);
  }

  validation() {
    let isCorrect = true;
    if (/^[A-Za-z0-9\s]{6,}$/.test(this.title.current?.value as string)) {
      this.setState({ isValidTitle: true });
    } else {
      this.setState({ isValidTitle: false });
      isCorrect = false;
    }

    if (/^[A-Za-z0-9\s]{10,}$/.test(this.description.current?.value as string)) {
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

    if (new Date(this.date.current?.value as string) > new Date()) {
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
      case 'img':
        this.setState((state) => ({
          isValidFile: state.isValidFile || !state.isValidFile,
        }));
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div data-testid="advertisements" className="advertisements">
        <form className="add-adv" onSubmit={this.handleSubmit} noValidate ref={this.form}>
          <label className="big-field">
            <h3>Title:</h3>
            <input
              type="text"
              name="title"
              ref={this.title}
              onInput={this.handleInput}
              placeholder="Please enter a valid title. String must contain at least 6 characters."
            />
            {
              <span id="title-error" className="error-note">
                <strong>{this.state.isValidTitle === false ? 'Title too short' : ''}</strong>
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
              placeholder="Please enter a valid description. String must contain at least 10 characters."
            />
            {
              <span id="description-error" className="error-note">
                <strong>
                  {this.state.isValidDescription === false ? 'Description too short' : ''}
                </strong>
              </span>
            }
          </label>

          <label className="middle-field">
            <h3>Tel:</h3>
            <input
              type="tel"
              name="tel"
              ref={this.tel}
              onInput={this.handleInput}
              placeholder="Please enter a valid number. Number must contain at least 5 digits."
            />
            {
              <span id="tel-error" className="error-note">
                <strong>{this.state.isValidTel === false ? 'Invalid phone number' : ''}</strong>
              </span>
            }
          </label>

          <label className="middle-field">
            <h3>E-mail:</h3>
            <input
              type="email"
              name="email"
              ref={this.email}
              onInput={this.handleInput}
              placeholder="Please enter a valid email"
            />
            {
              <span id="email-error" className="error-note">
                <strong>{this.state.isValidEmail === false ? 'Invalid email' : ''}</strong>
              </span>
            }
          </label>

          <label className="small-field">
            <h3>Area (&#13217;):</h3>
            <input
              type="number"
              name="area"
              ref={this.area}
              onInput={this.handleInput}
              placeholder="Enter the area of the house"
            />
            {
              <span id="area-error" className="error-note">
                <strong>{this.state.isValidArea === false ? 'Invalid number' : ''}</strong>
              </span>
            }
          </label>

          <label className="small-field">
            <h3>Price:</h3>
            <div className="price">
              <input
                type="number"
                name="price"
                ref={this.price}
                onInput={this.handleInput}
                placeholder="Enter price"
              />
              <select name="currency" ref={this.currency} defaultValue="₽">
                <option value="$">&#36;</option>
                <option value="€">&#8364;</option>
                <option value="₽">&#8381;</option>
              </select>
            </div>
            {
              <span id="price-error" className="error-note">
                <strong>
                  {this.state.isValidPrice === false ? 'Please enter a valid number' : ''}
                </strong>
              </span>
            }
          </label>
          <label className="small-field">
            <h3>Date of construction:</h3>
            <input type="date" name="date" ref={this.date} onInput={this.handleInput} />
            {
              <span id="date-error" className="error-note">
                <strong>
                  {this.state.isValidDate === false ? 'Please enter a valid date' : ''}
                </strong>
              </span>
            }
          </label>

          <div className="middle-field ad-type">
            <h3>Type of ad:</h3>

            <input type="radio" id="sale" name="typeAdd" value="sale" defaultChecked />
            <label className="switcher" htmlFor="sale">
              <span>Sale</span>
            </label>

            <input type="radio" id="rent" name="typeAdd" value="rent" />
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
            <input type="file" name="img" ref={this.fileInput} onInput={this.handleInput} />
            {
              <span id="img-error" className="error-note">
                <strong>{this.state.isValidFile === false ? 'Please choose an img' : ''}</strong>
              </span>
            }
          </label>

          <input type="submit" className="submit-button" value="send" ref={this.submit} disabled />
        </form>
        <div className="adds-list">
          {this.state.savedCards.map((elem, index) => (
            <Card key={index} houseItem={elem} img={this.state.savedImages[index]} />
          ))}
        </div>
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
  isValidFile: boolean | null;
  savedCards: CardProps[];
  savedImages: string[];
}
