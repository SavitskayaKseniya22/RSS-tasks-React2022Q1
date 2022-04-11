import React from 'react';
import { Card } from '../../components/card/Card';
import './mainPage.css';
import { data } from '../../mockedData';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { ResponseItem } from '../../components/responseItem/ResponseItem';

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
    console.log(value);
  }

  handleResponse(value: string[][]) {
    this.setState({
      response: value,
    });
    console.log(value, 1);
  }

  render() {
    return (
      <main data-testid="main-page">
        <SearchInput
          value={this.state.value}
          handleChange={this.handleChange}
          handleResponse={this.handleResponse}
        />
        <ul className="Card-list" data-testid="card-list">
          {this.state.response.map((elem, index) => (
            <ResponseItem
              key={index}
              src={elem[0]}
              description={elem[1]}
              author={elem[2]}
              link={elem[3]}
              height={elem[4]}
              width={elem[5]}
            />
          ))}
        </ul>
      </main>
    );
  }
}

interface MainPageType {
  value: string;
  response: string[][];
}
