import { useContext } from 'react';
import { ContextApp } from '../../app/App';
import { AdsList } from '../../components/adsList/AdsList';
import { Form } from '../../components/form/Form';
import './myAds.css';

export function MyAds() {
  const { state } = useContext(ContextApp);

  return (
    <div data-testid="my-ads" className="my-ads">
      <h1>my advertisements</h1>
      <Form />
      {state.savedCards && state.savedCards.length > 0 && <AdsList savedCards={state.savedCards} />}
    </div>
  );
}
