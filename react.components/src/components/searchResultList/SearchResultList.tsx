import { SearchItem } from '../../components/SearchItem/SearchItem';
import { MainPageType } from '../../interfaces';

export const SearchResultList = (props: { data: MainPageType }) => {
  let activeBlock;
  if (props.data.isDownloading) {
    activeBlock = (
      <div className="empty-search" data-testid="active-search">
        <div className="active-search"></div>
      </div>
    );
  } else if (props.data.isError) {
    activeBlock = (
      <p className="empty-search" data-testid="error-search">
        something went wrong
      </p>
    );
  } else if (props.data.response.length) {
    activeBlock = (
      <ul className="Card-list" data-testid="card-list">
        {props.data.response.map((elem, index) => (
          <SearchItem key={index} item={elem} />
        ))}
      </ul>
    );
  } else if (!props.data.response.length && props.data.isSearchOver) {
    activeBlock = <p className="empty-search">no images found</p>;
  } else if (!props.data.response.length && !props.data.isSearchOver) {
    activeBlock = <p className="empty-search">search for something</p>;
  }

  return activeBlock as JSX.Element;
};
