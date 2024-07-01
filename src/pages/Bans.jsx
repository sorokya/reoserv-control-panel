import { useContext, useEffect } from 'react';
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  Row,
  Table,
} from 'react-bootstrap';
import { AuthContext } from '../AuthContext';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { FaHammer, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Bans() {
  const navigate = useNavigate();
  const {
    isAdmin,
    isAuthenticated,
    pending: authPending,
  } = useContext(AuthContext);
  useEffect(() => {
    if (!authPending && (!isAdmin || !isAuthenticated)) {
      return navigate('/', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate, authPending]);

  return (
    <>
      <h3>
        <FaHammer />
        &nbsp;Bans
      </h3>
      <Row>
        <Col md={3}>
          <InputGroup>
            <InputGroupText>
              <FaSearch />
            </InputGroupText>
            <FormControl type="text" placeholder="Filter" />
          </InputGroup>
        </Col>
        <Col>
          <Button variant="success">Create New</Button>
        </Col>
      </Row>
      <br />
      <Table>
        <thead>
          <tr>
            <th>Account</th>
            <th>IP</th>
            <th>Expiration</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>HackerBob</td>
            <td>
              <pre>208.56.132.18</pre>
            </td>
            <td>in 1 hour and 15 minutes</td>
            <td>June 28th 2024 8:09 PM</td>
            <td>
              <Button>Edit</Button>
              &nbsp;
              <Button variant="danger">Delete</Button>
            </td>
          </tr>
          <tr>
            <td>SpeedyBoi</td>
            <td>
              <pre>n/a</pre>
            </td>
            <td>
              <em>Permanent</em>
            </td>
            <td>June 28th 2024 5:13 PM</td>
            <td>
              <Button>Edit</Button>
              &nbsp;
              <Button variant="danger">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Bans;
