import React from 'react';
import './responseItem.css';

export class ResponseItem extends React.Component<ResponseItemType, { isOpen: boolean }> {
  constructor(props: ResponseItemType) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  handleClick() {
    this.setState((state) => ({
      isOpen: !state.isOpen,
    }));
  }

  render() {
    return (
      <li className="item">
        <img
          className="item__img_preview"
          src={this.props.src}
          alt="main pic"
          onClick={this.handleClick}
        />
        {this.state.isOpen ? (
          <div className="item__popup">
            <ul>
              <li className="item__img_container">
                <img src={this.props.src} alt="main pic" />
              </li>
              <li className="item__description">{this.props.description}</li>
              <li className="item__author">{this.props.author}</li>
              <li className="item__fullsize">{this.props.link}</li>
              <li className="item__size">
                {this.props.width}*{this.props.height}
              </li>
            </ul>
            <button onClick={this.handleClick}></button>
          </div>
        ) : (
          ''
        )}
      </li>
    );
  }
}

export interface ResponseItemType {
  src: string;
  description: string;
  author: string;
  link: string;
  height: string;
  width: string;
}
