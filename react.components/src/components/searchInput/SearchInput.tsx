import { ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import { ResponseItemType, SearchItemDetailType, ResponseType } from '../../interfaces';
import './searchInput.css';
import { ContextApp } from './../../app/App';

export function SearchInput() {
  const { state, dispatch } = useContext(ContextApp);

  const handleDownload = (response: SearchItemDetailType[], load: boolean, error?: boolean) => {
    dispatch({ type: 'handleDownload', payload: { response, load, error } });
  };

  useEffect(() => {
    if (state.value) {
      getApiResponse(state.value);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (state.value) {
        window.localStorage.setItem('searchValue', state.value);
      }
    };
  });

  let data: SearchItemDetailType[] = [];

  const getApiResponse = async (value: string) => {
    handleDownload([], true);
    try {
      const url = `https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&per_page=30&query=${value}`;
      const res = await fetch(url);
      const response = await res.json();
      data = getShortData(response);
      handleDownload(data, false);
    } catch (error) {
      handleDownload([], false, true);
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.value) {
      getApiResponse(state.value);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: 'handleChange', payload: { value } });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} data-testid="search-form">
      <input
        data-testid="search-input"
        className="search-input"
        value={state.value}
        onChange={handleChange}
        placeholder="search"
      />
    </form>
  );
}
