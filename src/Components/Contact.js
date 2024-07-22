import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from './Navbar';
import BASE_URL from './Api';
import Footer from './Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = 'Full name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!phone) newErrors.phone = 'Phone number is required';
    if (!message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/contact-us/`, {
        full_name: fullName,
        email,
        phone,
        message,
      });
      if (response.status === 201) {
        console.log('Form submitted successfully:', response.data);
        setFullName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setErrors({});
        toast.success("Message Sent Successfully");

      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div className="main-wrap">
          <Container>
            <h4>Contact Us</h4>
            <Row className="contact-row">
              <Col md={12} className="d-flex align-items-center justify-content-center mb-3">
                <img src="/contact.png" alt="Contact Illustration" className="contact-image" />
              </Col>
              <Col md={12}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicFullName">
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`custom-input ${errors.fullName ? 'is-invalid' : ''}`}
                    />
                    {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`custom-input ${errors.email ? 'is-invalid' : ''}`}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </Form.Group>
                  <Form.Group controlId="formBasicPhone">
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`custom-input ${errors.phone ? 'is-invalid' : ''}`}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </Form.Group>
                  <Form.Group controlId="formBasicMessage">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`custom-input ${errors.message ? 'is-invalid' : ''}`}
                    />
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  </Form.Group>
                  <Button className="App-link" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
      <ToastContainer />
      <Footer/>
    </div>
  );
};

export default ContactUs;
