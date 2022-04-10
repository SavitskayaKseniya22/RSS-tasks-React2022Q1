import React, { FormEvent } from 'react';
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
            <li id="item__name"></li>
            <li id="item__description"></li>
            <li id="item__author"></li>
            <li id="item__fullsize"></li>
          </ul>
        )}
      </div>
    );
  }
}

interface ResponseItemType {
  src: string;
  name: string;
  description: string;
  author: string;
  link: string;
}
