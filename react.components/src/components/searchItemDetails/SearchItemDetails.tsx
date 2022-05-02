import { NavLink } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { GlobalTypes } from '../../interfaces';
import '../SearchItem/searchItem.css';

const SearchItemDetails = () => {
  const activeCard = useSelector((state: GlobalTypes) => state.activeCard, shallowEqual);

  return (
    <div className="item__popup">
      <img src={activeCard?.src as string} alt="main pic" />
      <ul>
        <li className="item__description" data-testid="item__description">
          <h2>{activeCard?.description || 'Nice picture'}</h2>
        </li>

        <li className="item__likes" data-testid="item__likes">
          <h2>&#9825; {activeCard?.likes || '0'}</h2>
        </li>
        <li className="item__author" data-testid="item__author">
          <h3>Author:</h3> <hr />
          {activeCard?.portfolio ? (
            <a
              data-testid="item__portfolio"
              href={activeCard?.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activeCard?.author} &#8690;
            </a>
          ) : (
            activeCard?.author
          )}
        </li>

        <li className="item__location" data-testid="item__location">
          <h3>Location:</h3> <hr />
          {activeCard?.location || 'Unknown'}
        </li>

        <li className="item__size" data-testid="item__size">
          <h3>Size:</h3> <hr />
          {activeCard?.width || 'Unknown'} * {activeCard?.height || 'Unknown'}
        </li>

        <li className="item__links">
          <a href={activeCard?.link as string} target="_blank" rel="noopener noreferrer">
            Fullsize &#8690;
          </a>
          <a href={activeCard?.unsplashLink as string} target="_blank" rel="noopener noreferrer">
            Unsplash &#8690;
          </a>
        </li>
      </ul>

      <NavLink to="/" className="item__close" data-testid="item__close">
        Back
      </NavLink>
    </div>
  );
};

export default SearchItemDetails;
