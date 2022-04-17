import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  SearchInputProps,
  ResponseItemType,
  SearchItemDetailType,
  ResponseType,
} from '../../interfaces';
import './searchInput.css';

export function SearchInput(props: SearchInputProps) {
  const [inputState, setState] = useState(props);

  useEffect(() => {
    if (inputState.value) {
      getApiResponse(inputState.value);
    }
  }, []);

  useEffect(() => {
    return () => {
      console.log(inputState);
      window.localStorage.setItem('searchValue', inputState.value);
    };
  });

  let data: SearchItemDetailType[] = [];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getApiResponse(inputState.value);
  };

  const getApiResponse = async (value: string) => {
    props.handleResponse([]);
    props.handleDownload(true);
    try {
      const url = `https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&per_page=30&query=${value}`;
      const res = await fetch(url);
      const response = await res.json();
      data = getShortData(response);
      props.handleResponse(data);
      props.handleDownload(false);
    } catch (error) {
      props.handleDownload(false, true);
    }
  };

  const getShortData = (response: ResponseType) => {
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
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.handleChange(e.target.value);
    setState({ ...inputState, value: e.target.value });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} data-testid="search-form">
      <input
        data-testid="search-input"
        className="search-input"
        value={inputState.value}
        onChange={handleChange}
        placeholder="search"
      />
    </form>
  );
}
