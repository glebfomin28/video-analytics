import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import ErrorBoundary from '@/app/error-boundary';
import { MainPage } from '@/pages/main-page';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <MainPage />
  </ErrorBoundary>,
);
