import { ChangeEvent } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { handleSort } from '../../store';
import { GlobalTypes } from '../../interfaces';
import '../SearchForm/searchForm.css';

const Sort = () => {
  const sort = useSelector((state: GlobalTypes) => state.sort, shallowEqual);
  const isSearchOver = useSelector((state: GlobalTypes) => state.isSearchOver, shallowEqual);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(handleSort(e.target.value));
  };

  return (
    <select
      name="sort"
      className="search-sort"
      onChange={handleChange}
      value={sort}
      disabled={isSearchOver ? false : true}
      data-testid="search-sort"
    >
      <option value="oldest">oldest</option>
      <option value="latest">latest</option>
      <option value="popular">popular</option>
    </select>
  );
};

export default Sort;
