import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEasyToast } from 'easy-toast-react-bootstrap';
import { Button, Col, FormControl, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ErrorToast from '../ErrorToast';

function Account() {
  const navigate = useNavigate();
  const [showToast] = useEasyToast();
  const { isPending, error, data } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const response = await axios.get('/api/account', {
        withCredentials: true,
      });

      return response.data;
    },
  });

  if (isPending) return 'Loading...';

  if (error) {
    showToast(
      <ErrorToast message="There was a problem loading your account" />,
    );
    return navigate('/');
  }

  return (
    <>
      <Col md={3}>
        <h3>Account Settings</h3>
        <form>
          <FormGroup>
            <label>Email</label>
            <FormControl type="text" value={data.email} readOnly={true} />
          </FormGroup>
          <FormGroup>
            <label>Real name</label>
            <FormControl type="text" value={data.real_name} readOnly={true} />
          </FormGroup>
          <FormGroup>
            <label>Location</label>
            <FormControl type="text" value={data.location} readOnly={true} />
          </FormGroup>
          <br />
          <FormGroup>
            <h4>Confirm password</h4>
            <FormControl type="password" placeholder="********" />
          </FormGroup>
          <br />
          <Button variant="primary">Save changes</Button>
        </form>
      </Col>
    </>
  );
}

export default Account;
