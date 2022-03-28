import React from 'react';
import { Card } from '../components/Card';
import { SearchInput } from '../components/SearchInput';
import './mainPage.css';
import { data } from '../data';

export class MainPage extends React.Component {
  constructor(props: string) {
    super(props);
  }
  render() {
    return (
      <main data-testid="main-page">
        <SearchInput />
        <ul className="Card-list" data-testid="card-list">
          {data.map((elem, index) => (
            <Card key={index} houseItem={elem} />
          ))}
        </ul>
      </main>
    );
  }
}
