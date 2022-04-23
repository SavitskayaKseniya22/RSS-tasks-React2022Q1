import { useContext, useState } from 'react';
import './mainPage.css';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { MainPageType, ReducerTypes, SearchItemDetailType } from '../../interfaces';
import { SearchResultList } from '../../components/searchResultList/SearchResultList';
import { ContextApp } from './../../app/App';

export function MainPage() {
  const { state, dispatch } = useContext(ContextApp);
  const handleChange = (value: string) => {
    dispatch({ type: 'handleChange', payload: { value } });
  };

  const handleDownload = (response: SearchItemDetailType[], load: boolean, error?: boolean) => {
    dispatch({ type: 'handleDownload', payload: { response, load, error } });
  };

  return (
    <main data-testid="main-page">
      <SearchInput
        value={state.value}
        handleChange={handleChange}
        handleDownload={handleDownload}
      />
      <SearchResultList data={state} />
    </main>
  );
}
