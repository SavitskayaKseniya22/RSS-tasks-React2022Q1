import { CardListProps } from '../../interfaces';
import { AdCard } from '../adCard/AdCard';

export function AdsList(props: CardListProps) {
  return (
    <div className="ads-list" data-testid="ads-list">
      {props.savedCards.map((elem, index) => (
        <AdCard key={index} item={elem} />
      ))}
    </div>
  );
}
