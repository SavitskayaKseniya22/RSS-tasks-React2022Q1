import { AdsList } from '../../components/AdsList/AdsList';
import { Form } from '../../components/Form/Form';
import { CardProps } from '../../interfaces';
import { useState } from 'react';
import './ads.css';

export const Ads = () => {
  const [savedCards, setSavedCards] = useState<CardProps[]>([]);

  const changeState = (object: CardProps) => {
    setSavedCards((savedCards) => [...savedCards, object]);
  };

  return (
    <div data-testid="ads" className="ads">
      <h1>my advertisements</h1>
      <Form changeState={changeState} />
      {savedCards.length > 0 && <AdsList savedCards={savedCards} />}
    </div>
  );
};
