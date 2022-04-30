import { AdCard } from '../AdCard/AdCard';
import { CardListProps } from '../../interfaces';

export const AdsList = (props: CardListProps) => {
  return (
    <div className="ads-list" data-testid="ads-list">
      {props.savedCards.map((elem, index) => (
        <AdCard key={index} item={elem} />
      ))}
    </div>
  );
};
