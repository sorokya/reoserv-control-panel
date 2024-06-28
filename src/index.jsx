import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import TopGuilds from './pages/TopGuilds';
import TopPlayers from './pages/TopPlayers';
import OnlinePlayers from './pages/OnlinePlayers';
import './scss/custom.scss';
import { AuthProvider } from './AuthContext';
import { EasyToastContainer } from 'easy-toast-react-bootstrap';

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

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EasyToastContainer
      position="top-end"
      className="p-3"
      style={{ marginTop: '52px' }}
    >
      <AuthProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </AuthProvider>
    </EasyToastContainer>
  </React.StrictMode>,
);
