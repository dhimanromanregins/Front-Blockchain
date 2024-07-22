import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Table, OverlayTrigger, Tooltip } from 'react-bootstrap'; // Import OverlayTrigger and Tooltip
import Navbar from './Navbar';
import Footer from './Footer';
import moment from 'moment';
import BASE_URL from './Api';

const truncateAddress = (address) => {
  if (address.length <= 10) return address;
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
  }).catch((error) => {
    console.error('Error copying text: ', error);
  });
};

const Dashboard = () => {
  const [data, setData] = useState({
    total_count: 0,
    total_amount: '0.000',
    pending_count: 0,
    settled_count: 0,
    total_amount_pending: '0.000',
    payment_details: []
  });
  
  const [apiKey, setApiKey] = useState('');
  
  const fetchApiKey = async () => {
    const userId = localStorage.getItem('user_id');
    try {
      const response = await axios.get(`${BASE_URL}/user-api-key/?user_id=${userId}`);
      if (response.status === 200 && response.data["Api_key"]) {
        console.log('************', response.data["Api_key"]);
        setApiKey(response.data["Api_key"]); // Directly set the apiKey here
        fetchPaymentDetails(response.data["Api_key"]); // Call the function to fetch payment details
      }
    } catch (error) {
      console.error('Error fetching API key:', error);
    }
  };
  
  const fetchPaymentDetails = async (apiKey) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/paymentdetails/${apiKey}/`);
      setData(response.data);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };
  
  useEffect(() => {
    fetchApiKey();
  }, []);

  const renderTooltip = (text) => (
    <Tooltip id="button-tooltip">
      {text}
    </Tooltip>
  );

  return (
    <>
      <Navbar />
      <div className="app-header-one">
        <div className="home-container">
          <Container>
            <Row>
              <Col md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Total Transactions</Card.Title>
                    <Card.Text>{data.total_count}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Pending Transactions</Card.Title>
                    <Card.Text>{data.pending_count}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Settled Transactions</Card.Title>
                    <Card.Text>{data.settled_count}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Total Amount Transferred</Card.Title>
                    <Card.Text>{data.total_amount} USD</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Pending Amount</Card.Title>
                    <Card.Text>{data.total_amount_pending} USD</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Transaction Data</Card.Title>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Date & Time</th>
                          <th>Hash</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.payment_details.map((transaction, index) => (
                          <tr key={index}>
                            <td>{moment(transaction.created_at).format('YYYY-MM-DD hh:mm A')}</td>
                            <td>
                              <OverlayTrigger
                                placement="top"
                                overlay={renderTooltip(transaction.transaction_hash)}
                              >
                                <span
                                  onClick={() => copyToClipboard(transaction.transaction_hash)}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                  title="Click to copy"
                                >
                                  {truncateAddress(transaction.transaction_hash)}
                                </span>
                              </OverlayTrigger>
                            </td>
                            <td>
                              <OverlayTrigger
                                placement="top"
                                overlay={renderTooltip(transaction.sender_address)}
                              >
                                <span
                                  onClick={() => copyToClipboard(transaction.sender_address)}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                  title="Click to copy"
                                >
                                  {truncateAddress(transaction.sender_address)}
                                </span>
                              </OverlayTrigger>
                            </td>
                            <td>
                              <OverlayTrigger
                                placement="top"
                                overlay={renderTooltip(transaction.receiver_address)}
                              >
                                <span
                                  onClick={() => copyToClipboard(transaction.receiver_address)}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                  title="Click to copy"
                                >
                                  {truncateAddress(transaction.receiver_address)}
                                </span>
                              </OverlayTrigger>
                            </td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
