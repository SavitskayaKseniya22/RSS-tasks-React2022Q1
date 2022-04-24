import { SearchInput } from '../../components/searchInput/SearchInput';
import { ContextApp } from './../../app/App';
import { Sort } from '../../components/sort/Sort';
import { useEffect, FormEvent, useContext } from 'react';
import { SearchItemDetailType, ResponseItemType, ResponseType } from '../../interfaces';
import { ResultsPerPage } from '../resultsPerPage/ResultsPerPage';
import { Pagination } from '../pagination/Pagination';

export function SearchForm() {
  const { state, dispatch } = useContext(ContextApp);

  /*

  useEffect(() => {
    if (!state.response?.length) {
      getApiResponse();
    }
  }, []);*/

  useEffect(() => {
    getApiResponse();
  }, [state.sort, state.pageNumber, state.perPage]);

  const handleDownload = (response: SearchItemDetailType[], load: boolean, error?: boolean) => {
    dispatch({ type: 'handleDownload', payload: { response, load, error } });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getApiResponse();
  };

  const getApiResponse = async () => {
    if (state.value) {
      handleDownload([], true);
      try {
        const url = `https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&page=${state.pageNumber}&per_page=${state.perPage}&query=${state.value}&order_by=${state.sort}`;
        const res = await fetch(url);
        const response = (await res.json()) as ResponseType;

        dispatch({ type: 'handlePageRange', payload: { pageRange: response.total_pages } });

        const data = getShortData(response);
        handleDownload(data, false);
      } catch (error) {
        handleDownload([], false, true);
      }
    }
  };

  const getShortData = (response: ResponseType): SearchItemDetailType[] => {
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

  return (
    <form className="search-form" onSubmit={handleSubmit} data-testid="search-form">
      <SearchInput />
      <Sort />
      <ResultsPerPage />
      <Pagination />
      <input type="submit" value="Update" className="ui positive icon button" />
    </form>
  );
}
