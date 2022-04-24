import React, { FormEvent } from 'react';
import { ChangeEvent, useContext } from 'react';
import { ContextApp } from './../../app/App';
import '../searchForm/searchForm.css';

export function Sort() {
  const { state, dispatch } = useContext(ContextApp);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'handleSort', payload: { sort: e.target.value } });
  };

  return (
    <select name="sort" className="search-sort" onChange={handleChange} value={state.sort}>
      <option value="oldest">oldest</option>
      <option value="latest">latest</option>
      <option value="popular">popular</option>
    </select>
  );
}
