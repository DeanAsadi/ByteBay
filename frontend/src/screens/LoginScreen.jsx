import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Form,
  Button,
  Alert,
} from 'react-bootstrap';

import FormContainer from '../components/FormContainer';

const LoginScreen = () => {
  const [searchParams] = useSearchParams();

  const redirect =
    searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage(
        'Please enter both your email and password.'
      );

      return;
    }

    setMessage('');

    console.log({
      email,
      password,
      redirect,
    });
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {message && (
        <Alert variant="danger">
          {message}
        </Alert>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group
          controlId="email"
          className="my-3"
        >
          <Form.Label>
            Email Address
          </Form.Label>

          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />
        </Form.Group>

        <Form.Group
          controlId="password"
          className="my-3"
        >
          <Form.Label>
            Password
          </Form.Label>

          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
        >
          Sign In
        </Button>
      </Form>

      <p className="mt-3">
        After signing in, you will be redirected to:
      </p>

      <strong>{redirect}</strong>
    </FormContainer>
  );
};

export default LoginScreen;