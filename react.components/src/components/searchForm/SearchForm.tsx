import Sort from '../Sort/Sort';
import SearchInput from '../SearchInput/SearchInput';
import ResultsPerPage from '../ResultsPerPage/ResultsPerPage';
import Pagination from '../Pagination/Pagination';
import { useEffect, FormEvent } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchImages, handleShouldUpdateStatus, store } from '../../store';
import {
  SearchItemDetailType,
  ResponseItemType,
  ResponseType,
  GlobalTypes,
} from '../../interfaces';

export const getShortData = (response: ResponseType): SearchItemDetailType[] => {
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

const SearchForm = () => {
  const shouldUpdate = useSelector((state: GlobalTypes) => state.shouldUpdate, shallowEqual);
  const pageNumber = useSelector((state: GlobalTypes) => state.pageNumber, shallowEqual);
  const itemsPerPage = useSelector((state: GlobalTypes) => state.itemsPerPage, shallowEqual);
  const value = useSelector((state: GlobalTypes) => state.value, shallowEqual);
  const sort = useSelector((state: GlobalTypes) => state.sort, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldUpdate) {
      store.dispatch(
        fetchImages({
          pageNumber,
          itemsPerPage,
          value,
          sort,
        })
      );
    }
  }, [shouldUpdate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(handleShouldUpdateStatus(true));
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
};

export default SearchForm;
