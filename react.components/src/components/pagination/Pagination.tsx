import { ContextApp } from '../../App';
import { ChangeEvent, useContext } from 'react';
import { MouseEvent } from 'react';
import '../SearchForm/searchForm.css';

const Pagination = () => {
  const { state, dispatch } = useContext(ContextApp);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changePageNumber(e.target.value);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    changePageNumber(e.currentTarget.textContent as string);
  };

  const changePageNumber = (value: string) => {
    dispatch({
      type: 'handleSearchForm',
      payload: {
        ...state,
        pageNumber: value,
        shouldUpdate: true,
      },
    });
  };

  return (
    <div className="pagination">
      <button type="button" onClick={handleClick} data-testid="search-page-number-start">
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
        data-testid="search-page-number"
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

      <button type="button" onClick={handleClick} data-testid="search-page-number-end">
        {state.maxPageNumber}
      </button>
    </div>
  );
};

export default Pagination;
