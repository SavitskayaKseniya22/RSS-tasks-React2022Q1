import { ContextApp } from '../../App';
import AdList from '../../components/AdList/AdList';
import Form from '../../components/Form/Form';
import { useContext } from 'react';
import './Ads.css';

const Ads = () => {
  const { state } = useContext(ContextApp);

  return (
    <div data-testid="ads" className="ads">
      <h1>advertisements</h1>
      <Form />
      {state.savedCards && state.savedCards.length > 0 && <AdList />}
    </div>
  );
};

export default Ads;
