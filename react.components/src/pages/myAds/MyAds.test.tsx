import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App, { ContextApp } from '../../app/App';
import { SearchResultListMockFull } from '../../mockedResponseItem';
import { MyAds } from './MyAds';

describe('myAds test', () => {
  test('check MyAds page appearance with link', () => {
    render(
      <MemoryRouter initialEntries={['/my-ads']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('my-ads')).toBeInTheDocument();
  });

  test('check MyAds page appearance without state', () => {
    render(<MyAds />);

    expect(screen.getByTestId('my-ads')).toBeInTheDocument();
    expect(screen.getByText('my advertisements')).toBeInTheDocument();
    expect(screen.getByTestId('form-ad')).toBeInTheDocument();
    expect(screen.getByTestId('my-ads').childNodes.length).toBe(2);
  });

  test('check MyAds page appearance with state', () => {
    render(
      <ContextApp.Provider
        value={{
          state: SearchResultListMockFull,
          dispatch: () => null,
        }}
      >
        <MyAds />
      </ContextApp.Provider>
    );

    expect(screen.getByTestId('my-ads')).toBeInTheDocument();
    expect(screen.getByText('my advertisements')).toBeInTheDocument();
    expect(screen.getByTestId('form-ad')).toBeInTheDocument();
    expect(screen.getByTestId('ads-list')).toBeInTheDocument();
    expect(screen.getByTestId('my-ads').childNodes.length).toBe(3);
  });
});
