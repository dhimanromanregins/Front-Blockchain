import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from "axios"; 
import BASE_URL from "./Api";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleResendOtp = () => {
    setResendTimer(60);
    setOtpSent(true);
    setResetPasswordError(""); 
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setResetPasswordError(""); 

    try {
      const response = await axios.post(`${BASE_URL}/forgot-password/`, {
        email: email,
      });

      if (response.status === 200) {
        toast.success("Otp send to email");
        setShowOtpVerification(true);
        setOtpSent(true);
        setLoading(false);
      } else {
        setResetPasswordError(response.data.message || "Password reset failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setResetPasswordError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    setLoading(true);
    e.preventDefault();
    setResetPasswordError(""); // Clear any previous error messages

    try {
      const response = await axios.post(`${BASE_URL}/reset-password/`, {
        email: email,
        otp: otp,
        new_password: newPassword,
      });

      if (response.status === 200) {
        toast.success("Password Reset successfully");
        const timer = setTimeout(() => {
          navigate('/');
        }, 2000);
        setLoading(false);
      } else {
        setResetPasswordError(response.data.message || "Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResetPasswordError("An error occurred. Please try again.");
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
            <Row className="forgot-row">
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <img src="/bitcoin.png" alt="Forgot Password Illustration" className="login-image" />
              </Col>
              <Col md={6}>
                {showOtpVerification ? (
                  <>
                    <h5 className="mb-5">OTP Verification</h5>
                    <p>We have sent an email to your email address</p>
                    <Form onSubmit={handleResetPassword}>
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
                      <Form.Group controlId="formBasicNewPassword" className="position-relative">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="custom-input"
                          required
                        />
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                          onClick={toggleShowPassword}
                          className="position-absolute eye-icon"
                          style={{ right: 10,  top: '50%', cursor: 'pointer' }}
                        />
                      </Form.Group>

                      {resetPasswordError && (
                        <p className="text-danger">{resetPasswordError}</p>
                      )}
                      <Button className="App-link" type="submit" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Reset Password"}
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
                    <h5 className="mb-5">Forgot Password</h5>
                    <p className="forgot-text">
                      Please enter your email address to{" "}
                      <span className="highlight">recover your password.</span>
                    </p>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="custom-input"
                        />
                      </Form.Group>
                      <Button className="App-link" type="submit" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Next"}
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

export default Forgot;
