import React from 'react';
import { CardListProps } from '../../interfaces';
import { Card } from '../adCard/AdCard';

export class AdsList extends React.Component<CardListProps> {
  constructor(props: CardListProps) {
    super(props);
  }
  render() {
    return (
      <div className="ads-list" data-testid="ads-list">
        {this.props.savedCards.map((elem, index) => (
          <Card key={index} houseItem={elem} img={this.props.savedImages[index]} />
        ))}
      </div>
    );
  }
}
