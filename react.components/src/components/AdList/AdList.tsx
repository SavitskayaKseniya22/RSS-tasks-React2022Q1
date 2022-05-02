import AdCard from '../AdCard/AdCard';
import { shallowEqual, useSelector } from 'react-redux';
import { GlobalTypes } from '../../interfaces';

const AdList = () => {
  const savedCards = useSelector((state: GlobalTypes) => state.savedCards, shallowEqual);

  return (
    <ul className="ads-list" data-testid="ads-list">
      {savedCards?.map((elem) => (
        <AdCard key={elem.adCreationDate + elem.title} item={elem} />
      ))}
    </ul>
  );
};

export default AdList;
