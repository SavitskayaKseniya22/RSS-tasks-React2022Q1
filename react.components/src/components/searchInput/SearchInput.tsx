import React, { ChangeEvent, FormEvent } from 'react';
import {
  SearchInputProps,
  SearchInputState,
  ResponseItemType,
  SearchItemDetailType,
  ResponseType,
} from '../../interfaces';
import './searchInput.css';

export class SearchInput extends React.Component<SearchInputProps, SearchInputState> {
  data: SearchItemDetailType[];

  constructor(props: SearchInputProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.data = [];
  }

  async handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.getApiResponse(this.props.value);
  }

  async getApiResponse(value: string) {
    this.props.handleResponse([]);
    this.props.handleDownload(true);
    try {
      const url = `https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&per_page=20&query=${value}`;
      const res = await fetch(url);
      const response = await res.json();
      this.data = this.getShortData(response);
      this.props.handleResponse(this.data);
      this.props.handleDownload(false);
    } catch (error) {
      this.props.handleDownload(false, true);
    }
  }

  getShortData(response: ResponseType): SearchItemDetailType[] {
    const result = response.results.map((item: ResponseItemType): SearchItemDetailType => {
      const obj = {
        src: item.urls.regular,
        description: item.alt_description,
        link: item.urls.full,
        author: item.user.username,
        portfolio: item.user.portfolio_url,
        location: item.user.location,
        width: item.width,
        height: item.height,
        likes: item.likes,
        unsplashLink: item.links.html,
      };

      return obj;
    });

    return result;
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.props.handleChange(e.target.value);
  }

  componentWillUnmount() {
    window.localStorage.setItem('searchValue', this.props.value);
  }

  componentDidMount() {
    if (this.props.value) {
      this.getApiResponse(this.props.value);
    }
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit} data-testid="search-form">
        <input
          data-testid="search-input"
          className="Search-input"
          value={this.props.value}
          onChange={this.handleChange}
          placeholder="search new home"
        />
      </form>
    );
  }
}
