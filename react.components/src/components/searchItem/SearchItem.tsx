import React from 'react';
import './searchItem.css';

export class SearchItem extends React.Component<SearchItemType, { isOpen: boolean }> {
  constructor(props: SearchItemType) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  handleClick(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLImageElement>
      | React.MouseEvent<HTMLDivElement>
  ) {
    if (e.target !== e.currentTarget) return;
    this.setState((state) => ({
      isOpen: !state.isOpen,
    }));
  }

  render() {
    return (
      <li className="item">
        <img
          className="item__img_preview"
          src={this.props.item.src as string}
          alt="main pic"
          onClick={this.handleClick}
        />
        {this.state.isOpen ? (
          <div className="item__popup_container" onClick={this.handleClick}>
            <div className="item__popup">
              <img src={this.props.item.src as string} alt="main pic" />
              <ul>
                <li className="item__description">
                  <h2>{this.props.item.description}</h2>
                </li>
                <li className="item__likes">
                  <h2>&#9825; {this.props.item.likes}</h2>
                </li>
                <li className="item__author">
                  <h3>Author:</h3> <hr />
                  {this.props.item.portfolio ? (
                    <a href={this.props.item.portfolio} target="_blank" rel="noopener noreferrer">
                      {this.props.item.author} &#8690;
                    </a>
                  ) : (
                    this.props.item.author
                  )}
                </li>

                {this.props.item.location ? (
                  <li className="item__location">
                    <h3>Location:</h3> <hr />
                    {this.props.item.location}
                  </li>
                ) : (
                  ''
                )}

                <li className="item__size">
                  <h3>Size:</h3> <hr />
                  {this.props.item.width}*{this.props.item.height}
                </li>
                <li className="item__links">
                  <a
                    href={this.props.item.link as string}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fullsize &#8690;
                  </a>
                  <a
                    href={this.props.item.unsplashLink as string}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Unsplash &#8690;
                  </a>
                </li>
              </ul>
              <button onClick={this.handleClick} className="item__close">
                Close
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </li>
    );
  }
}

export interface SearchItemType {
  item: SearchItemDetailType;
}

export interface SearchItemDetailType {
  src: string | null;
  description: string | null;
  author: string | null;
  link: string | null;
  height: number | null;
  width: number | null;
  portfolio: string | null;
  location: string | null;
  likes: number | null;
  unsplashLink: string | null;
}
