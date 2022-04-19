import { CardListProps } from '../../interfaces';
import { Card } from '../adCard/AdCard';

export function AdsList(props: CardListProps) {
  return (
    <div className="ads-list" data-testid="ads-list">
      {props.savedCards.map((elem, index) => (
        <Card key={index} item={elem} />
      ))}
    </div>
  );
}
