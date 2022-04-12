import React from 'react';
import './mainPage.css';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { ResponseItem, ResponseItemTypeFull } from '../../components/responseItem/ResponseItem';

export class MainPage extends React.Component<Record<string, never>, MainPageType> {
  constructor(props: Record<string, never>) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.state = {
      value: window.localStorage.getItem('searchValue') || '',
      response: [],
    };
  }

  handleChange(value: string) {
    this.setState({
      value: value,
    });
  }

  handleResponse(value: ResponseItemTypeFull[]) {
    this.setState({
      response: value,
    });
  }

  render() {
    return (
      <main data-testid="main-page">
        <SearchInput
          value={this.state.value}
          handleChange={this.handleChange}
          handleResponse={this.handleResponse}
        />
        {this.state.response.length ? (
          <ul className="Card-list" data-testid="card-list">
            {this.state.response.map((elem, index) => (
              <ResponseItem key={index} item={elem} />
            ))}
          </ul>
        ) : (
          <span className="empty-search">search for something</span>
        )}
      </main>
    );
  }
}

interface MainPageType {
  value: string;
  response: ResponseItemTypeFull[];
}
