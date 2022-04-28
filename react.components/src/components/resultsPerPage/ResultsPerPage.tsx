import { ChangeEvent, useContext } from 'react';

import '../searchForm/searchForm.css';
import { ContextApp } from '../../app/App';

export function ResultsPerPage() {
  const { state, dispatch } = useContext(ContextApp);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'handleSearchForm',
      payload: {
        ...state,
        pageNumber: '1',
        itemsPerPage: e.target.value,
        isMounted: true,
      },
    });
  };

  return (
    <input
      type="number"
      className="number-per-page"
      value={state.itemsPerPage}
      onInput={handleChange}
      placeholder="1-30"
      data-testid="search-per-page"
    />
  );
}
