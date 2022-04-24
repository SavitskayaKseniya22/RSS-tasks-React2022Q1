import { ChangeEvent, useContext } from 'react';

import '../searchForm/searchForm.css';
import { ContextApp } from '../../app/App';

export function ResultsPerPage() {
  const { state, dispatch } = useContext(ContextApp);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'handlePerPage', payload: { perPage: e.target.value } });
  };

  return (
    <input
      type="number"
      className="number-per-page"
      value={state.perPage}
      onInput={handleChange}
      placeholder="1-30"
    />
  );
}
