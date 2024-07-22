import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from './Api';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [error, SetError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/Weblogin/`, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        toast.success("Registration successful");
        const access_token = response.data['access_token']
        const refresh_token = response.data['refresh_token']
        const userId = response.data["user_id"]
        localStorage.setItem('Access_Token', access_token);
        localStorage.setItem('Refresh_Token', refresh_token);
        localStorage.setItem('user_id', userId);
        setLoading(false);
        navigate('/dashboard');
      } else {
        setLoginError("Invalid email and Password");
        SetError(true);
        setLoading(false);
        console.error('Login failed');
      }
    } catch (error) {
      setLoginError("Invalid email or Password");
      SetError(true);
      setLoading(false);
      console.error('Error:', error.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-wrap-login">
          <Container>
            <Row className="login-row">
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <img src="/bitcoin.png" alt="Login Illustration" className="login-image" />
              </Col>
              <Col md={6}>
                <h5 className="mb-5">Login to your Account</h5>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword" className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      onClick={toggleShowPassword}
                      className="position-absolute eye-icon"
                      style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#999' }}
                    />
                  </Form.Group>
                  {error && <p className="text-danger">{loginError}</p>}
                  <Button className="App-link" type="submit" disabled={loading} onClick={handleLogin}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                      </Button>
                  <p className="mt-3">Don't have an account? <Link to="/register">Register</Link></p>
                  <Link to="/forgot"><p>Forgot password?</p></Link>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
      <ToastContainer />
    </div>
  );
};

export default Login;
