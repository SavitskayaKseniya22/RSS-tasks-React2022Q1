import React from 'react';
import { SearchItem } from '../../components/searchItem/SearchItem';
import { MainPageType } from '../../interfaces';

export class SearchResultList extends React.Component<
  { data: MainPageType },
  Record<string, never>
> {
  constructor(props: { data: MainPageType }) {
    super(props);
  }

  render() {
    let activeBlock;
    if (this.props.data.isDownloading) {
      activeBlock = (
        <div className="empty-search" data-testid="active-search">
          <div className="active-search"></div>
        </div>
      );
    } else if (this.props.data.isError) {
      activeBlock = <p className="empty-search">something went wrong</p>;
    } else if (this.props.data.response.length) {
      activeBlock = (
        <ul className="Card-list" data-testid="card-list">
          {this.props.data.response.map((elem, index) => (
            <SearchItem key={index} item={elem} />
          ))}
        </ul>
      );
    } else if (!this.props.data.response.length && this.props.data.isSearchOver) {
      activeBlock = <p className="empty-search">no images found</p>;
    } else if (!this.props.data.response.length && !this.props.data.isSearchOver) {
      activeBlock = <p className="empty-search">search for something</p>;
    }

    return activeBlock;
  }
}
