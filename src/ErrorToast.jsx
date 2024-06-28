import { Toast } from 'react-bootstrap';

function ErrorToast({ title, message }) {
  return (
    <Toast bg="danger" autohide>
      <Toast.Header>
        <strong className="me-auto">{title || 'Error'}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default ErrorToast;
