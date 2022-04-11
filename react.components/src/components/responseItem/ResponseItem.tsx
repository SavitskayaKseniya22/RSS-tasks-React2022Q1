import React from 'react';
import './searchInput.css';

export class ResponseItem extends React.Component<ResponseItemType, { isOpen: null | boolean }> {
  constructor(props: ResponseItemType) {
    super(props);

    this.state = {
      isOpen: null,
    };
  }

  render() {
    return (
      <div>
        <div>
          <img id="item__img" src={this.props.src} alt="main pic" />
        </div>
        {this.state.isOpen ?? (
          <ul>
            <li id="item__description">{this.props.description}</li>
            <li id="item__author">{this.props.author}</li>
            <li id="item__fullsize">{this.props.link}</li>
            <li id="item__size">
              {this.props.width}*{this.props.height}
            </li>
          </ul>
        )}
      </div>
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
