import { useState } from 'react';
import {
  Link,
  useSearchParams,
} from 'react-router-dom';
import {
  Form,
  Button,
  Alert,
  Row,
  Col,
} from 'react-bootstrap';

import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
  const [searchParams] = useSearchParams();

  const redirect =
    searchParams.get('redirect') || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');
  const [message, setMessage] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setMessage(
        'Please complete all required fields.'
      );

      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');

      return;
    }

    setMessage('');

    console.log({
      name,
      email,
      password,
      redirect,
    });
  };

  return (
    <FormContainer>
      <h1>Create Account</h1>

      {message && (
        <Alert variant="danger">
          {message}
        </Alert>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group
          controlId="name"
          className="my-3"
        >
          <Form.Label>Name</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
          />
        </Form.Group>

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
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
        </Form.Group>

        <Form.Group
          controlId="confirmPassword"
          className="my-3"
        >
          <Form.Label>
            Confirm Password
          </Form.Label>

          <Form.Control
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value
              )
            }
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
        >
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account?{' '}

          <Link
            to={
              redirect !== '/'
                ? `/login?redirect=${redirect}`
                : '/login'
            }
          >
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;