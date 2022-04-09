import React from 'react';
import { AddAdv } from '../components/AddMyAdvForm';
import './myAdds.css';

export class MyAds extends React.Component {
  constructor(props: string) {
    super(props);
  }
  render() {
    return (
      <div data-testid="my-adds" className="my-adds">
        <h1>my advertisements</h1>
        <AddAdv />
      </div>
    );
  }
}
