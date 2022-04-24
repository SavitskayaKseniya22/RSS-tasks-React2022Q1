import './mainPage.css';
import { SearchResultList } from '../../components/searchResultList/SearchResultList';
import { SearchForm } from '../../components/searchForm/SearchForm';

export function MainPage() {
  return (
    <main data-testid="main-page">
      <SearchForm />
      <SearchResultList />
    </main>
  );
}
