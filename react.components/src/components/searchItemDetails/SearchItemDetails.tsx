import { NavLink } from 'react-router-dom';
import { ContextApp } from '../../App';
import { useContext } from 'react';
import '../SearchItem/searchItem.css';

export function SearchItemDetails() {
  const { state } = useContext(ContextApp);

  return (
    <div className="item__popup">
      <img src={state.activeCard?.src as string} alt="main pic" />
      <ul>
        <li className="item__description" data-testid="item__description">
          <h2>{state.activeCard?.description || 'Nice picture'}</h2>
        </li>

        <li className="item__likes" data-testid="item__likes">
          <h2>&#9825; {state.activeCard?.likes || '0'}</h2>
        </li>
        <li className="item__author" data-testid="item__author">
          <h3>Author:</h3> <hr />
          {state.activeCard?.portfolio ? (
            <a
              data-testid="item__portfolio"
              href={state.activeCard?.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              {state.activeCard?.author} &#8690;
            </a>
          ) : (
            state.activeCard?.author
          )}
        </li>

        <li className="item__location" data-testid="item__location">
          <h3>Location:</h3> <hr />
          {state.activeCard?.location || 'Unknown'}
        </li>

        <li className="item__size" data-testid="item__size">
          <h3>Size:</h3> <hr />
          {state.activeCard?.width || 'Unknown'} * {state.activeCard?.height || 'Unknown'}
        </li>

        <li className="item__links">
          <a href={state.activeCard?.link as string} target="_blank" rel="noopener noreferrer">
            Fullsize &#8690;
          </a>
          <a
            href={state.activeCard?.unsplashLink as string}
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash &#8690;
          </a>
        </li>
      </ul>

      <NavLink to="/" className="item__close" data-testid="item__close">
        Back
      </NavLink>
    </div>
  );
}
