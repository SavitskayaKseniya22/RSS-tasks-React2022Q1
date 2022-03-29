import React from 'react';

export class MyAds extends React.Component {
  constructor(props: string) {
    super(props);
  }
  render() {
    return (
      <div data-testid="about-us">
        <h1>my advertisements</h1>
      </div>
    );
  }
}
