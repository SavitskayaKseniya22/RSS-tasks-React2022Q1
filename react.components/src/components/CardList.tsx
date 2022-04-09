import React from 'react';
import { Card, CardProps } from './Card';

export class CardList extends React.Component<CardListProps> {
  constructor(props: CardListProps) {
    super(props);
  }
  render() {
    return (
      <div className="adds-list">
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
