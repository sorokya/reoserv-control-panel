import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <p>
      Page not found. Click <Link to="/">here</Link> to go home.
    </p>
  );
}

export default NotFound;
