import { ChangeEvent, useContext } from 'react';

import { MouseEvent } from 'react';
import '../searchForm/searchForm.css';
import { ContextApp } from '../../app/App';

export function Pagination() {
  const { state, dispatch } = useContext(ContextApp);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch({ type: 'handlePageNumber', payload: { pageNumber: e.target.value } });
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({
      type: 'handlePageNumber',
      payload: { pageNumber: e.currentTarget.textContent as string },
    });
  };

  return (
    <div className="pagination">
      <button type="button" onClick={handleClick}>
        1
      </button>
      <button type="button" onClick={handleClick}>
        {state.pageNumber && +state.pageNumber > 2 ? +state.pageNumber - 2 : '.'}
      </button>
      <button type="button" onClick={handleClick}>
        {state.pageNumber && +state.pageNumber > 1 ? +state.pageNumber - 1 : '.'}
      </button>
      <input
        type="number"
        className="active-page-number"
        value={state.pageNumber}
        onChange={handleChange}
        placeholder="go to"
      />

      <button type="button" onClick={handleClick}>
        {state.pageNumber && state.pageRange && +state.pageNumber + 1 <= state.pageRange
          ? +state.pageNumber + 1
          : '.'}
      </button>

      <button type="button" onClick={handleClick}>
        {state.pageNumber && state.pageRange && +state.pageNumber + 2 <= state.pageRange
          ? +state.pageNumber + 2
          : '.'}
      </button>
      <button type="button" onClick={handleClick}>
        {state.pageRange}
      </button>
    </div>
  );
}
