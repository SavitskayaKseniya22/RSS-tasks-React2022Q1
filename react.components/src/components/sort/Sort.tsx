import { ChangeEvent } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { GlobalTypes } from '../../interfaces';
import '../SearchForm/searchForm.css';

const Sort = () => {
  const state = useSelector((state: GlobalTypes) => state, shallowEqual);
  const sort = useSelector((state: GlobalTypes) => state.sort, shallowEqual);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'handleSearchForm',
      payload: { ...state, sort: e.target.value, shouldUpdate: true },
    });
  };

  return (
    <select
      name="sort"
      className="search-sort"
      onChange={handleChange}
      value={sort}
      data-testid="search-sort"
    >
      <option value="oldest">oldest</option>
      <option value="latest">latest</option>
      <option value="popular">popular</option>
    </select>
  );
};

export default Sort;
