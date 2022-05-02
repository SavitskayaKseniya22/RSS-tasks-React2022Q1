import AdList from '../../components/AdList/AdList';
import Form from '../../components/Form/Form';
import { shallowEqual, useSelector } from 'react-redux';
import { GlobalTypes } from '../../interfaces';
import './Ads.css';

const Ads = () => {
  const savedCards = useSelector((state: GlobalTypes) => state.savedCards, shallowEqual);

  return (
    <div data-testid="ads" className="ads">
      <h1>advertisements</h1>
      <Form />
      {savedCards && savedCards.length > 0 && <AdList />}
    </div>
  );
};

export default Ads;
