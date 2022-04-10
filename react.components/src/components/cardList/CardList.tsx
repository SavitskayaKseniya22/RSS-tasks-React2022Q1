import React from 'react';
import { Card, CardProps } from '../card/Card';

export class CardList extends React.Component<CardListProps> {
  constructor(props: CardListProps) {
    super(props);
  }
  render() {
    return (
      <div className="ads-list" data-testid="Cardlist">
        {this.props.savedCards.map((elem, index) => (
          <Card key={index} houseItem={elem} img={this.props.savedImages[index]} />
        ))}
      </div>
    );
  }
}

interface CardListProps {
  savedCards: CardProps[];
  savedImages: string[];
}
