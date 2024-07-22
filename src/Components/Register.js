import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import BASE_URL from './Api';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [passwordmatch, setPasswordmatch] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [verificationError, setVerificationError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);  // State to toggle password visibility
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (otpSent && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, resendTimer]);

  const handleResendOtp = async () => {
    const requestData = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/Webregister/`, requestData);
      setResendTimer(60);
    } catch (error) {
      console.error('Error resending OTP:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setRegistrationError("Passwords do not match")
      setPasswordmatch(true)
      return;
    }

    setLoading(true); // Start the spinner

    const requestData = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };

    try {
      const response = await axios.post(`${BASE_URL}/Webregister/`, requestData);

      if (response.status === 200) {
        setShowOtpVerification(true);
        setOtpSent(true);
      } else {
        setRegistrationError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setRegistrationError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();

    const requestData = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
      otp: otp,
    };

    try {
      const response = await axios.post(`${BASE_URL}/verify-otp/`, requestData);

      if (response.status === 201) {
        console.log('OTP verification successful');
        toast.success("Registration successful");
        navigate('/');
      } 
      if (response.status === 400) {
        setVerificationError('Invalid Otp. Please enter correct Otp');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setVerificationError('Invalid OTP');
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-wrap-login">
          <Container>
            <Row className="register-row">
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <img src="/bitcoin.png" alt="Registration Illustration" className="login-image" />
              </Col>
              <Col md={6}>
                {showOtpVerification ? (
                  <>
                    <h5 className="mb-5">OTP Verification</h5>
                    <p>We have sent an email to your email address</p>
                    <Form onSubmit={handleSubmitOtp}>
                      <Form.Group controlId="formBasicOtp">
                        <Form.Control
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="custom-input"
                          required
                        />
                      </Form.Group>
                      {verificationError && <p className="text-danger">{verificationError}</p>}
                      <Button className="App-link" type="submit">
                        Verify OTP
                      </Button>
                    </Form>
                    <p className="mt-3">
                      Resend OTP in {resendTimer} seconds
                      {resendTimer === 0 && (
                        <Button variant="link" onClick={handleResendOtp}>
                          Resend OTP
                        </Button>
                      )}
                    </p>
                  </>
                ) : (
                  <>
                    <h5 className="mb-5">Register an Account</h5>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="custom-input"
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword" className="custom-input">
                        <div style={{ position: 'relative' }}>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#999' }} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ?  <FaEye />:<FaEyeSlash /> }
                          </span>
                        </div>
                      </Form.Group>

                      <Form.Group controlId="formBasicConfirmPassword" className="custom-input">
                        <div style={{ position: 'relative' }}>
                          <Form.Control
                            type={showconfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#999' }} onClick={() => setShowconfirmPassword(!showconfirmPassword)}>
                            {showconfirmPassword ? <FaEye />:<FaEyeSlash />}
                          </span>
                        </div>
                      </Form.Group>

                      {registrationError && <p className="text-danger">{registrationError}</p>}
                      {passwordmatch && <p className="text-danger">{passwordmatch}</p>}
                      <Button className="App-link" type="submit" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Register"}
                      </Button>
                    </Form>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </header>
      <ToastContainer />
    </div>
  );
};

export default Register;
