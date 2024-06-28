import { Col, Row } from 'react-bootstrap';
import News from './News';
import Stats from './Stats';

function Home() {
  return (
    <Row>
      <Col>
        <News />
      </Col>
      <Col md={4}>
        <Stats />
      </Col>
    </Row>
  );
}

export default Home;
