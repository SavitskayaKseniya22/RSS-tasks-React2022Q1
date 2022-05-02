import { ChangeEvent } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { GlobalTypes } from '../../interfaces';
import '../SearchForm/searchForm.css';

const ResultsPerPage = () => {
  const itemsPerPage = useSelector((state: GlobalTypes) => state.itemsPerPage, shallowEqual);
  const state = useSelector((state: GlobalTypes) => state, shallowEqual);
  const dispatch = useDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'handleSearchForm',
      payload: { ...state, pageNumber: '1', itemsPerPage: e.target.value, shouldUpdate: true },
    });
  };

  return (
    <input
      type="number"
      className="number-per-page"
      value={itemsPerPage}
      onInput={handleChange}
      placeholder="1-30"
      data-testid="search-per-page"
      min="0"
      max="30"
    />
  );
};

export default ResultsPerPage;
