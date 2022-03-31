import React, { FormEvent } from 'react';
import './AddMyAdvForm.css';

export class AddAdv extends React.Component {
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
  constructor(props: string) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    alert(
      'Отправленное имя: ' +
        this.title.current?.value +
        ' ' +
        this.tel.current?.value +
        ' ' +
        this.email.current?.value +
        ' ' +
        this.area.current?.value +
        ' ' +
        this.description.current?.value +
        ' '
    );

    event.preventDefault();
  }

  render() {
    return (
      <div data-testid="add-adv">
        <form className="add-adv" onSubmit={this.handleSubmit}>
          <label className="big-field">
            <h3>Title:</h3>
            <input type="text" name="name" ref={this.title} />
          </label>

          <label className="big-field">
            <h3>Description:</h3>
            <input type="text" name="description" ref={this.description} />
          </label>

          <label className="middle-field">
            <h3>Tel:</h3>
            <input type="tel" name="tel" ref={this.tel} />
          </label>

          <label className="middle-field">
            <h3>E-mail:</h3>
            <input type="email" name="email" id="" ref={this.email} />
          </label>

          <label className="small-field">
            <h3>Area (&#13217;):</h3>
            <input type="number" name="area" ref={this.area} />
          </label>

          <label className="small-field">
            <h3>Price:</h3>
            <div className="price">
              <input type="number" name="" ref={this.price} />
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

          <input type="submit" value="Отправить" />
        </form>
      </div>
    );
  }
}
