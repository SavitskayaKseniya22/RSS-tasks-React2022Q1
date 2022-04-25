import { ChangeEvent, useContext } from 'react';

import { MouseEvent } from 'react';
import '../searchForm/searchForm.css';
import { ContextApp } from '../../app/App';

export function Pagination() {
  const { state, dispatch } = useContext(ContextApp);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch({
      type: 'handleSearchForm',
      payload: {
        ...state,
        pageNumber: e.target.value,
      },
    });
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({
      type: 'handleSearchForm',
      payload: {
        ...state,
        pageNumber: e.currentTarget.textContent as string,
      },
    });
  };

  return (
    <div className="pagination">
      <button type="button" onClick={handleClick}>
        1
      </button>

      {state.pageNumber && +state.pageNumber >= 3 ? (
        <button type="button" onClick={handleClick}>
          {+state.pageNumber - 2}
        </button>
      ) : (
        <button type="button" disabled></button>
      )}

      {state.pageNumber && +state.pageNumber >= 2 ? (
        <button type="button" onClick={handleClick}>
          {+state.pageNumber - 1}
        </button>
      ) : (
        <button type="button" disabled></button>
      )}

      <input
        type="number"
        min="1"
        className="active-page-number"
        value={state.pageNumber}
        onChange={handleChange}
        placeholder="go to"
      />

      {state.pageNumber && state.maxPageNumber && +state.pageNumber + 1 <= state.maxPageNumber ? (
        <button type="button" onClick={handleClick}>
          {+state.pageNumber + 1}
        </button>
      ) : (
        <button type="button" disabled></button>
      )}

      {state.pageNumber && state.maxPageNumber && +state.pageNumber + 2 <= state.maxPageNumber ? (
        <button type="button" onClick={handleClick}>
          {+state.pageNumber + 2}
        </button>
      ) : (
        <button type="button" disabled></button>
      )}

      <button type="button" onClick={handleClick}>
        {state.maxPageNumber}
      </button>
    </div>
  );
}
