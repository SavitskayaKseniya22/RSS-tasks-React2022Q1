import { useState } from 'react';
import './mainPage.css';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { MainPageType, SearchItemDetailType } from '../../interfaces';
import { SearchResultList } from '../../components/SearchResultList/SearchResultList';

export const MainPage = () => {
  const initialValues: MainPageType = {
    value: window.localStorage.getItem('searchValue') || '',
    response: [],
    isDownloading: false,
    isSearchOver: false,
    isError: false,
  };
  const [mainState, setMainState] = useState(initialValues);

  const handleChange = (value: string) => {
    setMainState({ ...mainState, value: value });
  };

  const handleDownload = (response: SearchItemDetailType[], load: boolean, error?: boolean) => {
    setMainState({
      ...mainState,
      response: response,
      isDownloading: load,
      isSearchOver: !load,
      isError: error || false,
    });
  };

  return (
    <main data-testid="main-page">
      <SearchInput
        value={mainState.value}
        handleChange={handleChange}
        handleDownload={handleDownload}
      />
      <SearchResultList data={mainState} />
    </main>
  );
};
