import { ChangeEvent, useContext, useEffect } from 'react';
import { ContextApp } from '../../App';
import '../SearchForm/searchForm.css';

export function SearchInput() {
  const { state, dispatch } = useContext(ContextApp);

  useEffect(() => {
    return () => {
      if (state.value) {
        window.localStorage.setItem('searchValue', state.value);
      }
    };
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({
      type: 'handleSearchForm',
      payload: {
        ...state,
        value,
      },
    });
  };

  return (
    <input
      data-testid="search-input"
      className="search-input"
      value={state.value}
      onChange={handleChange}
      placeholder="search"
    />
  );
}
