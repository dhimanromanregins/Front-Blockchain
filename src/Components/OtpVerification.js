import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import BASE_URL from './Api';

const OtpVerification = ({ show, handleClose, email, password, confirmPassword }) => {
  const [otp, setOtp] = useState('');
  const [verificationError, setVerificationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, confirm_password: confirmPassword, otp })
    };
  
    try {
      const response = await fetch(`${BASE_URL}/verify-otp/`, requestOptions);
      const data = await response.json();
  
      if (response.ok) {
        console.log('OTP verification successful');
        handleClose(); // Close the modal upon successful OTP verification
      } else {
        console.log('Error response:', data);
        setVerificationError(data.message || 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setVerificationError('An error occurred. Please try again.');
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#c7b528' }}>OTP Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: 'green' }}>We are sending OTP to your email</p>
        {verificationError && <p className="text-danger">{verificationError}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicOtp">
            <Form.Label>Enter OTP:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <Button className='App-link' type="submit" onClick={handleSubmit}>
            Verify OTP
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OtpVerification;