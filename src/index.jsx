import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import TopGuilds from './pages/TopGuilds';
import TopPlayers from './pages/TopPlayers';
import OnlinePlayers from './pages/OnlinePlayers';
import Account from './pages/Account';
import './scss/custom.scss';
import { AuthProvider } from './AuthContext';
import { EasyToastContainer } from 'easy-toast-react-bootstrap';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/account',
        element: <Account />,
      },
      {
        path: '/top-guilds',
        element: <TopGuilds />,
      },
      {
        path: '/top-players',
        element: <TopPlayers />,
      },
      {
        path: '/online-players',
        element: <OnlinePlayers />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EasyToastContainer
      position="top-end"
      className="p-3"
      style={{ marginTop: '52px' }}
    >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </QueryClientProvider>
      </AuthProvider>
    </EasyToastContainer>
  </React.StrictMode>,
);
