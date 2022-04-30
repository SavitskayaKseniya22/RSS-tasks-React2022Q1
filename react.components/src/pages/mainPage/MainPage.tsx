import { SearchForm } from '../../components/SearchForm/SearchForm';
import { SearchResultList } from '../../components/SearchResultList/SearchResultList';
import './mainPage.css';

export function MainPage() {
  return (
    <main data-testid="main-page">
      <SearchForm />
      <SearchResultList />
    </main>
  );
}
