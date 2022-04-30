import { AdCard } from '../AdCard/AdCard';
import { ContextApp } from '../../App';
import { useContext } from 'react';

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
