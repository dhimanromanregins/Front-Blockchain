import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import BASE_URL from './Api';

const DeveloperAPI = () => {
  const [apiInfoVisible, setApiInfoVisible] = useState(false);
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    const fetchApiKey = async () => {
      const userId = localStorage.getItem('user_id');
      try {
        const response = await axios.get(`${BASE_URL}/user-api-key/?user_id=${userId}`);
        if (response.status == 200 && response.data["Api_key"]) {
          setApiKey(response.data["Api_key"]);
          setApiInfoVisible(true);
        }
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    };

    fetchApiKey();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleGenerateApiClick = () => {
    const userId = localStorage.getItem('user_id');
    axios.post(`${BASE_URL}/api-keys/`, { user: Number(userId) })
      .then(response => {
        if (response.status === 201) {
          setApiKey(response.data["Api_key"]);
          setApiInfoVisible(true);
        } else {
          console.error('Error: Unexpected response status:', response.status);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div>
          <h1 className='animated-text'>Developer API</h1>
          <p>This is where you can find information about our developer API.</p>
          {apiInfoVisible && (
            <div className='api-key'>
              <h2 className='gradient-text'>Your API Key</h2>
              <p>API Key: {apiKey}</p>
              <p>Documentation: <Link to="/developer-api/docs">View API Documentation</Link></p>
            </div>
          )}
          {!apiInfoVisible && (
            <button className="App-link" onClick={handleGenerateApiClick}>Generate API</button>
          )}
        </div>
      </header>
      <Footer />
    </div>
  );
};

export default DeveloperAPI;
