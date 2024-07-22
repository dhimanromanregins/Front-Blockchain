import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
const About = () => {
    return (
        <div className="App">
        <header className="App-header">
          <Navbar/>
          <div className="home-container">
            <div className="text-section">
                <h1 className='animated-text mb-5'>About Us</h1>
                <p>CryptoWallet is a secure and user-friendly platform for managing your cryptocurrency assets. Our mission is to provide you with the tools and resources you need to confidently navigate the world of cryptocurrency.</p>
                <p>With CryptoWallet, you can securely store your cryptocurrencies, track your portfolio, and stay informed with real-time market data. Whether you're new to cryptocurrency or a seasoned investor, CryptoWallet is here to help you succeed.</p>
            </div>
            <div className="image-section">
                <img src="trading.png" alt="About CryptoWallet" />
            </div>
        </div>
        </header>
        <Footer/>
        </div>
    );
}

export default About;
