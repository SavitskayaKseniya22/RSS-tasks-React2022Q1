import React from 'react';
import './mainPage.css';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { SearchItem } from '../../components/searchItem/SearchItem';
import { MainPageType, SearchItemDetailType } from '../../interfaces';

export class MainPage extends React.Component<Record<string, never>, MainPageType> {
  constructor(props: Record<string, never>) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.state = {
      value: window.localStorage.getItem('searchValue') || '',
      response: [],
      isDownloading: false,
      isSearchOver: false,
      isError: false,
    };
  }

  handleChange(value: string) {
    this.setState({
      value: value,
    });
  }

  handleResponse(value: SearchItemDetailType[]) {
    this.setState({
      response: value,
    });
  }

  handleDownload(value: boolean, error?: boolean) {
    this.setState({
      isDownloading: value,
      isSearchOver: !value,
    });

    if (error) {
      this.setState({
        isError: true,
      });
    }
  }

  render() {
    let activeBlock;
    if (this.state.isDownloading) {
      activeBlock = <p className="empty-search active-search"></p>;
    } else if (this.state.isError) {
      activeBlock = <p className="empty-search">something went wrong</p>;
    } else if (this.state.response.length) {
      activeBlock = (
        <ul className="Card-list" data-testid="card-list">
          {this.state.response.map((elem, index) => (
            <SearchItem key={index} item={elem} />
          ))}
        </ul>
      );
    } else if (!this.state.response.length && this.state.isSearchOver) {
      activeBlock = <p className="empty-search">no images found</p>;
    } else if (!this.state.response.length && !this.state.isSearchOver) {
      activeBlock = <p className="empty-search">search for something</p>;
    }
    return (
      <main data-testid="main-page">
        <SearchInput
          value={this.state.value}
          handleChange={this.handleChange}
          handleResponse={this.handleResponse}
          handleDownload={this.handleDownload}
        />

        {activeBlock}
      </main>
    );
  }
}
