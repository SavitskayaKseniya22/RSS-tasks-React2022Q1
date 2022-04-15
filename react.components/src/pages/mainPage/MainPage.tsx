import React from 'react';
import './mainPage.css';
import { data } from '../../mockedData';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { Card } from '../../components/adCard/AdCard';

export class MainPage extends React.Component {
  constructor(props: string) {
    super(props);
  }
  render() {
    return (
      <main data-testid="main-page">
        <SearchInput />
        <ul className="Card-list" data-testid="card-list">
          {data.map((elem, index) => (
            <Card
              key={index}
              houseItem={elem}
              img={require(`./../../assets/svg/houses/${elem.name}.jpg`)}
            />
          ))}
        </ul>
      </main>
    );
  }
}
