import { ErrorBoundary } from '@presentation/components/common/ErrorBoundary';
import { AppRoutes } from '@presentation/routes';
import { AppProviders } from './providers/AppProviders';

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;

