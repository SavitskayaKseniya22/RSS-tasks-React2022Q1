import { ContextApp } from '../../App';
import { ChangeEvent, useContext } from 'react';
import '../SearchForm/searchForm.css';

const ResultsPerPage = () => {
  const { state, dispatch } = useContext(ContextApp);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'handleSearchForm',
      payload: {
        ...state,
        pageNumber: '1',
        itemsPerPage: e.target.value,
        shouldUpdate: true,
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
      min="0"
      max="30"
    />
  );
};

export default ResultsPerPage;
