import { useContext } from 'react';
import { SearchItem } from '../../components/searchItem/SearchItem';
import { ContextApp } from './../../app/App';

export function SearchResultList() {
  const { state } = useContext(ContextApp);
  let activeBlock;
  if (state.isDownloading) {
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
        {state.response.map((elem, index) => (
          <SearchItem key={index} item={elem} />
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
