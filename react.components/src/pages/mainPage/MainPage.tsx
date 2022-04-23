import './mainPage.css';
import { SearchInput } from '../../components/searchInput/SearchInput';
import { SearchResultList } from '../../components/searchResultList/SearchResultList';

export function MainPage() {
  return (
    <main data-testid="main-page">
      <SearchInput />
      <SearchResultList />
    </main>
  );
}
