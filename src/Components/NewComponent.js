import React from 'react';
import { Link } from 'react-router-dom';
function NewComponent() {
  return (
    <div className="App">
    <header className="App-header">
      <img src={`${process.env.PUBLIC_URL}/binance.png`} className="App-logo" alt="logo" />
      <h1 className="">Welcome to Crypto Wallet app</h1>
      
      <Link to="/main" className="App-link mt-5">Get Started</Link>
    </header>
  

    </div>
  );
}

export default NewComponent;