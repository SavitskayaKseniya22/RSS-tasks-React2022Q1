import React from 'react';
import { Card } from './Card';
import { SearchInput } from './SearchInput';
import './mainPage.css';

export class MainPage extends React.Component {
  constructor(props: string) {
    super(props);
  }
  render() {
    return (
      <main>
        <SearchInput />
        <ul className="Card-list">
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
