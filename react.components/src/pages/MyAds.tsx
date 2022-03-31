import React from 'react';
import { AddAdv } from '../components/AddMyAdvForm';

export class MyAds extends React.Component {
  constructor(props: string) {
    super(props);
  }
  render() {
    return (
      <div data-testid="about-us">
        <h1>my advertisements</h1>
        <AddAdv />
      </div>
    );
  }
}
