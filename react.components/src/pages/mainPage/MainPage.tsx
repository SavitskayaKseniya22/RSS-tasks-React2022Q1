import { SearchForm } from '../../components/mainPage/SearchForm/SearchForm';
import { SearchResultList } from '../../components/mainPage/SearchResultList/SearchResultList';
import './mainPage.css';

export function MainPage() {
  return (
    <main data-testid="main-page">
      <SearchForm />
      <SearchResultList />
    </main>
  );
}
