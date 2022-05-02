import { ChangeEvent, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { GlobalTypes } from '../../interfaces';
import '../SearchForm/searchForm.css';

const SearchInput = () => {
  const value = useSelector((state: GlobalTypes) => state.value, shallowEqual);
  const state = useSelector((state: GlobalTypes) => state, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (value) {
        window.localStorage.setItem('searchValue', value);
      }
    };
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'handleSearchForm',
      payload: { ...state, value: e.target.value },
    });
  };

  return (
    <input
      data-testid="search-input"
      className="search-input"
      value={value}
      onChange={handleChange}
      placeholder="search"
    />
  );
};

export default SearchInput;
