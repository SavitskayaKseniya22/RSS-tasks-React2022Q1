import { AdCard } from '../AdCard/AdCard';
import { CardListProps } from '../../interfaces';

export const AdsList = (props: CardListProps) => {
  return (
    <ul className="ads-list" data-testid="ads-list">
      {props.savedCards.map((elem, index) => (
        <AdCard key={index + elem.title} item={elem} />
      ))}
    </ul>
  );
};
