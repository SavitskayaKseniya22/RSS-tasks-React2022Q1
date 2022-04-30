import { SearchItem } from '../SearchItem/SearchItem';
import { ContextApp } from '../../App';
import { useContext } from 'react';

export function SearchResultList() {
  const { state } = useContext(ContextApp);
  let activeBlock;
  if (state.isLoading) {
    activeBlock = (
      <div className="empty-search" data-testid="active-search">
        <div className="active-search">
          <span className="non-visible">Loading data</span>
        </div>
      </div>
    );
  } else if (state.isError) {
    activeBlock = (
      <p className="empty-search" data-testid="error-search">
        something went wrong
      </p>
    );
  } else if (state.response?.length) {
    activeBlock = (
      <ul className="Card-list" data-testid="card-list">
        {state.response.map((elem) => (
          <SearchItem key={elem.src} item={elem} />
        ))}
      </ul>
    );
  } else if (!state.response?.length && state.isSearchOver) {
    activeBlock = <p className="empty-search">no images found</p>;
  } else if (!state.response?.length && !state.isSearchOver) {
    activeBlock = <p className="empty-search">search for something</p>;
  }

  return activeBlock as JSX.Element;
}
