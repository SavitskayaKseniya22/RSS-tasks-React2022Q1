import { useContext } from 'react';
import { ContextApp } from '../../App';
import { AdCard } from '../AdCard/AdCard';

export function AdList() {
  const { state } = useContext(ContextApp);

  return (
    <ul className="ads-list" data-testid="ads-list">
      {state.savedCards?.map((elem, index) => (
        <AdCard key={index} item={elem} />
      ))}
    </ul>
  );
}
