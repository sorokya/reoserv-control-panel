import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <Navbar />
      <br />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
