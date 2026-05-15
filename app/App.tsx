import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { WorkspaceScreen } from './screens/WorkspaceScreen';
import { DocumentsScreen } from './screens/DocumentsScreen';
import { ProcessingScreen } from './screens/ProcessingScreen';
import { ReviewScreen } from './screens/ReviewScreen';
import { AccountantQAScreen } from './screens/AccountantQAScreen';
import { VendorsScreen } from './screens/VendorsScreen';
import { ExportScreen } from './screens/ExportScreen';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { state } = useApp();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'workspace':
        return <WorkspaceScreen />;
      case 'documents':
        return <DocumentsScreen />;
      case 'processing':
        return <ProcessingScreen />;
      case 'review':
        return <ReviewScreen />;
      case 'accountant-qa':
        return <AccountantQAScreen />;
      case 'vendors':
        return <VendorsScreen />;
      case 'export':
        return <ExportScreen />;
      default:
        return <WorkspaceScreen />;
    }
  };

  return (
    <Layout>
      {renderScreen()}
    </Layout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider initialMode="demo">
        <ErrorBoundary>
          <AppContent />
          <Toaster richColors position="top-right" />
        </ErrorBoundary>
      </AppProvider>
    </ErrorBoundary>
  );
}
