import React, { useState } from 'react';
import './mainPage.css';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { MainPageType, SearchItemDetailType } from '../../interfaces';
import { SearchResultList } from '../../components/searchResultList/SearchResultList';
import { error } from 'node:console';
import { render } from 'react-dom';

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
    state.value = value;
    setState(state);
  };

  const handleResponse = (value: SearchItemDetailType[]) => {
    state.response = value;
    setState(state);
  };

  const handleDownload = (value: boolean, error?: boolean) => {
    state.isDownloading = value;
    state.isSearchOver = !value;

    if (error) {
      state.isError = true;
    }
    setState(state);
  };

  return (
    <main data-testid="main-page">
      <SearchInput
        value={state.value}
        handleChange={handleChange}
        handleResponse={handleResponse}
        handleDownload={handleDownload}
      />
      <SearchResultList data={state} />
    </main>
  );
}
