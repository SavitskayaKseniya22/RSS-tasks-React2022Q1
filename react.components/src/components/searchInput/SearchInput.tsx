import React, { ChangeEvent, FormEvent } from 'react';
import { SearchItemDetailType } from '../searchItem/SearchItem';
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
    const url = `https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&per_page=20&query=${value}`;
    const res = await fetch(url);
    const response = await res.json();
    this.data = this.getShortData(response);
    console.log(this.data);
    this.props.handleResponse(this.data);
    this.props.handleDownload(false);
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

interface SearchInputState {
  value: string;
}

interface SearchInputProps {
  value: string;
  handleChange: (value: string) => void;
  handleResponse: (value: SearchItemDetailType[]) => void;
  handleDownload: (value: boolean) => void;
}

interface ResponseType {
  total: number;
  total_pages: number;
  results: ResponseItemType[];
}

interface ResponseItemType {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string | null;
  blur_hash: string | null;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string | null;
    full: string | null;
    regular: string | null;
    small: string | null;
    thumb: string | null;
    small_s3: string | null;
  };
  links: {
    self: string | null;
    html: string | null;
    download: string | null;
    download_location: string | null;
  };
  categories: string[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: string[];
  sponsorship: string | null;
  topic_submissions: `Record<string, never>`;
  user: {
    id: string | null;
    updated_at: string | null;
    username: string | null;
    name: string | null;
    first_name: string | null;
    last_name: string | null;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: {
      self: string | null;
      html: string | null;
      photos: string | null;
      likes: string | null;
      portfolio: string | null;
      following: string | null;
      followers: string | null;
    };
    profile_image: {
      small: string | null;
      medium: string | null;
      large: string | null;
    };
    instagram_username: string | null;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: string | null;
      portfolio_url: string | null;
      twitter_username: string | null;
      paypal_email: string | null;
    };
  };
  tags: string[];
}
