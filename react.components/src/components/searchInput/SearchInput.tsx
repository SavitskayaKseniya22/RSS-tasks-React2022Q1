import { ChangeEvent, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { handleValueInSearchInput } from '../../store';
import { GlobalTypes } from '../../interfaces';
import '../SearchForm/searchForm.css';

const SearchInput = () => {
  const value = useSelector((state: GlobalTypes) => state.value, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      window.localStorage.setItem('searchValue', value);
    };
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(handleValueInSearchInput(e.target.value));
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
