import { useState } from 'react';
import { AdsList } from '../../components/adsList/AdsList';
import { Form } from '../../components/form/Form';
import { CardProps, FormStateTypes } from '../../interfaces';
import './myAds.css';

export function MyAds() {
  const [state, setState] = useState<FormStateTypes>({ savedCards: [] });

  const changeState = (object: CardProps) => {
    setState({
      ...state,
      savedCards: [...state.savedCards, object],
    });
  };

  return (
    <div data-testid="my-ads" className="my-ads">
      <h1>my advertisements</h1>
      <Form changeState={changeState} />
      {state.savedCards.length > 0 && <AdsList savedCards={state.savedCards} />}
    </div>
  );
}
