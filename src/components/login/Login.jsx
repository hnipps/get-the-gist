import { h } from 'preact';
import Heading from '../heading/Heading';
import Button from '../button/Button';

import './login.css';

const Login = ({ onLogin, loading }) => {
  return (
    <div className="login__wrapper">
      <Heading element="h1" className="h1 login__heading">
        Get the Gist
      </Heading>
      <Button className="login__button" loading={loading} onClick={onLogin}>
        Sign in with GitHub
      </Button>
    </div>
  );
};

export default Login;
