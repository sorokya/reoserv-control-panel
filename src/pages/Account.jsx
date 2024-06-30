import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Col, FormControl, FormGroup } from 'react-bootstrap';

function Account() {
  const { isPending, isError, data } = useQuery({
    queryKey: ['account'],
    retry: false,
    queryFn: async () => {
      const response = await axios.get('/api/account', {
        withCredentials: true,
      });

      return response.data;
    },
  });

  if (isPending) return 'Loading...';

  if (isError) return 'Error...';

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
