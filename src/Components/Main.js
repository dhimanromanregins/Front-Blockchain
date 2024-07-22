import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from './Api';

const Main = () => {
    const location = useLocation();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const clientId = queryParams.get('clientId');

        if (clientId) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/encrypt-decrypt/?clientId=${clientId}`);
                    const data = response.data;     
                    localStorage.setItem('clientId', clientId);
                    setAuthorized(true);
                } catch (error) {
                    setAuthorized(false);
                    console.error('Error fetching data', error);
                }
            };

            fetchData();
        }
    }, [location]);

    

    return (
        <div className="App">
            {authorized ?
            <header className="App-header">
                <h2 className='mb-5 gradient-text '>Select your Payment wallet </h2>
                <div className='main-wrap-one'>
                    <Link to="/binance">
                        <div className="wallet-icon">
                            <img src="logo-change.png" className='icon' alt="Binance" />
                            <h6 className="gradient text mx-3">Binance</h6>
                        </div>
                    </Link>
                    <Link to="/payment">
                        <div className="wallet-icon">
                            <img src="metamask.png" className='icon' alt="Metamask" />
                            <h6 className="gradient text  mx-3">Metamask</h6>
                        </div>
                    </Link>
                    <Link to="/payment">
                        <div className="wallet-icon">
                            <img src="trust.png" className='icon' alt="Trust Wallet" />
                            <h6 className="gradient text  mx-3">Trust Wallet</h6>
                        </div>
                    </Link>
                    <Link to="/payment">
                        <div className="wallet-icon">
                            <img src="others.png" className='icon' alt="Others" />
                            <h6 className="gradient text  mx-3">Others</h6>
                        </div>
                    </Link>
                </div>
            </header>
            :
            <header className="App-header">
           <img src="uno.jpg" className='icon-acess' alt="Others" />
            <h1 className="unauthorized-title mt-3">403</h1>
      <p className="unauthorized-message">Unauthorized Access</p>
      <p className="unauthorized-description gradient-text">
        You do not have permission to view this page.
      </p>
   
            </header>
            }
        </div>
    );
};

export default Main;
