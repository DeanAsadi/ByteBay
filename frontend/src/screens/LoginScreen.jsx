import { useSearchParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const LoginScreen = () => {
  const [searchParams] = useSearchParams();

  const redirect =
    searchParams.get('redirect') || '/';

  return (
    <>
      <h1>Sign In</h1>

      <Alert variant="info">
        Login form coming soon.
      </Alert>

      <p>
        After signing in, you will be redirected
        to:
      </p>

      <strong>{redirect}</strong>
    </>
  );
};

export default LoginScreen;