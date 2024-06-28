import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../AuthContext';

import { Button, FormControl } from 'react-bootstrap';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!username || !password) {
        return;
      }
      await login({ username, password });
    },
    [username, password, login],
  );

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <FormControl
        type="text"
        placeholder="Username"
        aria-label="Username"
        className="me-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormControl
        type="password"
        placeholder="********"
        aria-label="Password"
        className="me-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="outline-success" type="submit">
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
