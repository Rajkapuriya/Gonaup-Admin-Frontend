import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query'
import './index.css';
import App from './App';
import { Provider as ActivePageProvider } from './context/pageContext/pageContext'
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ActivePageProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ActivePageProvider>
  </React.StrictMode>
);
