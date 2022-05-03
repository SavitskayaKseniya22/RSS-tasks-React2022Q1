import { ChangeEvent } from 'react';
import { MouseEvent } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { GlobalTypes } from '../../interfaces';
import { handlePageNumber } from '../../store';
import '../SearchForm/searchForm.css';

const Pagination = () => {
  const pageNumber = useSelector((state: GlobalTypes) => state.pageNumber, shallowEqual);
  const maxPageNumber = useSelector((state: GlobalTypes) => state.maxPageNumber, shallowEqual);
  const state = useSelector((state: GlobalTypes) => state, shallowEqual);

  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changePageNumber(e.target.value);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    changePageNumber(e.currentTarget.textContent as string);
  };

  const changePageNumber = (value: string) => {
    dispatch(handlePageNumber(value));
  };

  return (
    <div className="pagination">
      <button type="button" onClick={handleClick} data-testid="search-page-number-start">
        1
      </button>

      {pageNumber && +pageNumber >= 3 ? (
        <button type="button" onClick={handleClick}>
          {+pageNumber - 2}
        </button>
      ) : (
        <button type="button" disabled></button>
      )}

      {pageNumber && +pageNumber >= 2 ? (
        <button type="button" onClick={handleClick}>
          {+pageNumber - 1}
        </button>
      ) : (
        <button type="button" disabled></button>
      )}

      <input
        type="number"
        min="1"
        className="active-page-number"
        value={pageNumber}
        onChange={handleChange}
        placeholder="go to"
        data-testid="search-page-number"
      />

      {pageNumber && maxPageNumber && +pageNumber + 1 <= maxPageNumber ? (
        <button type="button" onClick={handleClick}>
          {+pageNumber + 1}
        </button>
      ) : (
        <button type="button" disabled></button>
      )}

      {pageNumber && maxPageNumber && +pageNumber + 2 <= maxPageNumber ? (
        <button type="button" onClick={handleClick}>
          {+pageNumber + 2}
        </button>
      ) : (
        <button type="button" disabled></button>
      )}

      <button type="button" onClick={handleClick} data-testid="search-page-number-end">
        {maxPageNumber}
      </button>
    </div>
  );
};

export default Pagination;
