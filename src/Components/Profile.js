import React, { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';
const CryptoProfile = () => {
  const [walletAddress, setWalletAddress] = useState('0x1234...5678'); // Initial value

  const handleWalletAddressChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to update the wallet address in the database or state
    console.log('Updated wallet address:', walletAddress);
  };

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
      <Container className="d-flex align-items-center justify-content-center">
        <Card style={{ width: '25rem' }}>
          <Card.Body>
     <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formWalletAddress">
             
                <Form.Control
                  type="text"
                  placeholder="Enter wallet address"
                  value={walletAddress}
                  onChange={handleWalletAddressChange}
                />
              </Form.Group>
              <Button className="App-link" type="submit">
                Update Wallet Address
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      </header>
      <Footer/>
    </div>
  );
};

export default CryptoProfile;
