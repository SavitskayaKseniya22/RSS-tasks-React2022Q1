import React from 'react';
import './mainPage.css';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { MainPageType, SearchItemDetailType } from '../../interfaces';
import { SearchResultList } from '../../components/searchResultList/SearchResultList';

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
    return (
      <main data-testid="main-page">
        <SearchInput
          value={this.state.value}
          handleChange={this.handleChange}
          handleResponse={this.handleResponse}
          handleDownload={this.handleDownload}
        />
        <SearchResultList data={this.state} />
      </main>
    );
  }
}
