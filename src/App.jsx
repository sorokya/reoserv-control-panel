import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Container } from 'react-bootstrap';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useEasyToast } from 'easy-toast-react-bootstrap';
import ErrorToast from './ErrorToast';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function App() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showToast] = useEasyToast();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error?.response?.status === 401) {
          showToast(
            <ErrorToast message="Your session has expired. Please login again" />,
          );
          logout().then(() => {
            navigate('/', { replace: true });
          });
        } else if (error?.response?.status === 403) {
          navigate('/', { replace: true });
        } else {
          console.error(error);
          showToast(
            <ErrorToast message="There was an error processing your request" />,
          );
        }
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <br />
      <Container>
        <Outlet />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
