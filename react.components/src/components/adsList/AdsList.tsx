import { useContext } from 'react';
import { ContextApp } from '../../app/App';
import { AdCard } from '../adCard/AdCard';

export function AdsList() {
  const { state } = useContext(ContextApp);

  return (
    <ul className="ads-list" data-testid="ads-list">
      {state.savedCards?.map((elem, index) => (
        <AdCard key={index} item={elem} />
      ))}
    </ul>
  );
}
