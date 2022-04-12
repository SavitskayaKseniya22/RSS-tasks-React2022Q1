import React, { ChangeEvent, FormEvent } from 'react';
import { ResponseItemTypeFull } from '../responseItem/ResponseItem';
import './searchInput.css';

export class SearchInput extends React.Component<SearchInputProps, SearchInputState> {
  search: React.RefObject<HTMLInputElement>;
  data: ResponseItemTypeFull[];

  constructor(props: SearchInputProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = React.createRef();
    this.data = [];
  }
  async handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.getApiResponse(this.search.current?.value as string);
  }

  async getApiResponse(value: string) {
    const url = `https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&per_page=20&query=${value}`;
    const res = await fetch(url);
    const response = await res.json();
    console.log(response);
    this.data = this.getShortData(response);
    this.props.handleResponse(this.data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getShortData(response: { results: any[] }): ResponseItemTypeFull[] {
    const result: ResponseItemTypeFull[] = response.results.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any): ResponseItemTypeFull => {
        const obj: ResponseItemTypeFull = {
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
      }
    );

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
          ref={this.search}
          placeholder="search new home"
        />
      </form>
    );
  }
}

interface SearchInputState {
  value: string;
}

interface SearchInputProps {
  value: string;
  handleChange: (value: string) => void;
  handleResponse: (value: ResponseItemTypeFull[]) => void;
}
