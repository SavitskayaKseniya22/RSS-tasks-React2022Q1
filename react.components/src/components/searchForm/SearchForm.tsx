import { SearchInput } from '../../components/searchInput/SearchInput';
import { ContextApp } from './../../app/App';
import { Sort } from '../../components/sort/Sort';
import { useEffect, FormEvent, useContext } from 'react';
import { SearchItemDetailType, ResponseItemType, ResponseType } from '../../interfaces';
import { ResultsPerPage } from '../resultsPerPage/ResultsPerPage';
import { Pagination } from '../pagination/Pagination';

export function SearchForm() {
  const { state, dispatch } = useContext(ContextApp);

  useEffect(() => {
    if (state.isMounted) {
      getApiResponse();
    }
  }, [state.isMounted]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'handleSearchForm', payload: { ...state, isMounted: true } });
  };

  const getApiResponse = async () => {
    dispatch({ type: 'handleDownload', payload: { ...state, isDownloading: true } });
    try {
      const url = `https://api.unsplash.com/search/photos?client_id=ofM-1kx5RC6ZUCCfZy12f78_KZl3oW5gpojrMlT4n4A&page=${state.pageNumber}&per_page=${state.itemsPerPage}&query=${state.value}&order_by=${state.sort}`;
      const res = await fetch(url);
      const response = (await res.json()) as ResponseType;
      const data = getShortData(response);

      dispatch({
        type: 'handleDownload',
        payload: {
          ...state,
          response: data,
          isDownloading: false,
        },
      });
      dispatch({
        type: 'handleSearchForm',
        payload: {
          ...state,
          maxPageNumber: response.total_pages,
          isMounted: false,
        },
      });
    } catch (error) {
      dispatch({
        type: 'handleDownload',
        payload: { ...state, isDownloading: false, isError: true },
      });
      dispatch({ type: 'handleSearchForm', payload: { ...state, isMounted: false } });
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
      <input type="submit" value="Update" className="hidden-button" />
    </form>
  );
}
