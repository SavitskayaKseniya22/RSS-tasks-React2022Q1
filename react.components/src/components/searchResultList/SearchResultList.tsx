import SearchItem from '../SearchItem/SearchItem';
import { shallowEqual, useSelector } from 'react-redux';
import { GlobalTypes } from '../../interfaces';

const SearchResultList = () => {
  const isLoading = useSelector((state: GlobalTypes) => state.isLoading, shallowEqual);
  const isError = useSelector((state: GlobalTypes) => state.isError, shallowEqual);
  const response = useSelector((state: GlobalTypes) => state.response, shallowEqual);
  const isSearchOver = useSelector((state: GlobalTypes) => state.isSearchOver, shallowEqual);

  let activeBlock;
  if (isLoading) {
    activeBlock = (
      <div className="empty-search" data-testid="active-search">
        <div className="active-search">
          <span className="non-visible">Loading data</span>
        </div>
      </div>
    );
  } else if (isError) {
    activeBlock = (
      <p className="empty-search" data-testid="error-search">
        something went wrong
      </p>
    );
  } else if (response?.length) {
    activeBlock = (
      <ul className="Card-list" data-testid="card-list">
        {response.map((elem) => (
          <SearchItem key={elem.src} item={elem} />
        ))}
      </ul>
    );
  } else if (!response?.length && isSearchOver) {
    activeBlock = <p className="empty-search">no images found</p>;
  } else if (!response?.length && !isSearchOver) {
    activeBlock = <p className="empty-search">search for something</p>;
  }

  return activeBlock as JSX.Element;
};

export default SearchResultList;
