import React, { useState } from 'react';
import './mainPage.css';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { MainPageType, SearchItemDetailType } from '../../interfaces';
import { SearchResultList } from '../../components/searchResultList/SearchResultList';

export function MainPage() {
  const initialValues: MainPageType = {
    value: window.localStorage.getItem('searchValue') || '',
    response: [],
    isDownloading: false,
    isSearchOver: false,
    isError: false,
  };
  const [state, setState] = useState(initialValues);

  const handleChange = (value: string) => {
    setState({ ...state, value: value });
  };

  const handleDownload = (response: SearchItemDetailType[], load: boolean, error?: boolean) => {
    setState({
      ...state,
      response: response,
      isDownloading: load,
      isSearchOver: !load,
      isError: error || false,
    });
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
