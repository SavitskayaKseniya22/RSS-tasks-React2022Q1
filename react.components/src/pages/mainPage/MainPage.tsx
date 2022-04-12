import React from 'react';
import './mainPage.css';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { SearchItem, SearchItemDetailType } from '../../components/searchItem/SearchItem';

export class MainPage extends React.Component<Record<string, never>, MainPageType> {
  constructor(props: Record<string, never>) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.state = {
      value: window.localStorage.getItem('searchValue') || '',
      response: [],
      isDownloading: null,
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

  handleDownload(value: boolean) {
    this.setState({
      isDownloading: value,
    });
  }

  render() {
    return (
      <main data-testid="main-page">
        <SearchInput
          value={this.state.value}
          handleChange={this.handleChange}
          handleResponse={this.handleResponse}
          handleDownload={this.handleDownload}
        />
        {this.state.isDownloading ? (
          <div>
            <strong>looking for pictures</strong>
          </div>
        ) : (
          ''
        )}
        {this.state.response.length && !this.state.isDownloading ? (
          <ul className="Card-list" data-testid="card-list">
            {this.state.response.map((elem, index) => (
              <SearchItem key={index} item={elem} />
            ))}
          </ul>
        ) : (
          <span className="empty-search">search for something</span>
        )}
      </main>
    );
  }
}

interface MainPageType {
  value: string;
  response: SearchItemDetailType[];
  isDownloading: null | boolean;
}
