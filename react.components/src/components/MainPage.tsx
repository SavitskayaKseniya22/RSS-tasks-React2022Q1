import React from 'react';
import { Card } from './Card';
import { SearchInput } from './SearchInput';

export class MainPage extends React.Component {
  constructor(props: string) {
    super(props);
  }
  render() {
    return (
      <div>
        <Card />
        <SearchInput />
      </div>
    );
  }
}
