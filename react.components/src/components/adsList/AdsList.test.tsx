import { AdsList } from './AdsList';
import { render, screen } from '@testing-library/react';

test('check form appearance', () => {
  render(
    <AdsList
      savedCards={[
        {
          adress: '3014 Tree Frog Lane, Lenexa, Missouri',
          title: 'Realy big house',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          link: 'https://www.stackexchange.com/',
          email: 'lamoidoitrese-9866@yopmail.com',
          phone: '(573) 642-8896',
          price: '1 000 000',
          date: '2000-01-01',
          area: '100',
          typeAdd: 'sale',
          isReady: true,
          currency: '$',
          img: 'blob:http://localhost:3000/a5dd0b3d-6b18-4059-bd25-bc24760ef807',
        },
        {
          adress: '3014 Tree Frog Lane, Lenexa, Missouri',
          title: 'Realy big house',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          link: 'https://www.stackexchange.com/',
          email: 'lamoidoitrese-9866@yopmail.com',
          phone: '(573) 642-8896',
          price: '1 000 000',
          date: '2000-01-01',
          area: '100',
          typeAdd: 'sale',
          isReady: true,
          currency: '$',
          img: 'blob:http://localhost:3000/a5dd0b3d-6b18-4059-bd25-bc24760ef807',
        },
      ]}
    />
  );
  const cards = screen.getAllByTestId('card-item');
  expect(cards.length).toEqual(2);
});
