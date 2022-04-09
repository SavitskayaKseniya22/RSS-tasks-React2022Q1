import React from 'react';
import { Form } from '../../components/form/Form';
import './myAds.css';

export class MyAds extends React.Component {
  constructor(props: string) {
    super(props);
  }
  render() {
    return (
      <div data-testid="my-ads" className="my-ads">
        <h1>my advertisements</h1>
        <Form />
      </div>
    );
  }
}
