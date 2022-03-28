import React from 'react';
import { Card } from '../components/Card';
import { SearchInput } from '../components/SearchInput';
import './mainPage.css';

export class MainPage extends React.Component {
  constructor(props: string) {
    super(props);
  }
  render() {
    return (
      <main data-testid="main-page">
        <SearchInput />
        <ul className="Card-list" data-testid="card-list">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ul>
      </main>
    );
  }
}
