// Home.js
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Home = () => {
    return (
        <div className="App">
            <header className="App-header">
                <Navbar/>
                <div className="home-container">
                    <div className="text-section">
                        <h1 className="animated-text mb-5">Welcome to CryptoWallet</h1>
                        <p className='mb-5'>Manage your cryptocurrencies with ease and security. Keep track of your transactions, view real-time prices, and securely store your assets.</p>
                        <button className="App-link mb-5">Get Started</button>
                    </div>
                    <div className="image-section">
                        <img src="/trading.png" alt="Cryptocurrency" />
                    </div>
                </div>
                {/* Additional sections */}
                <div className="additional-section">
                    <h2>Additional Section</h2>
                    <p>This is an additional section you can add to your landing page.</p>
                </div>
                <div className="more-section">
                    <h2>More Section</h2>
                    <p>This is another section you can add.</p>
                </div>
            </header>
            <Footer/>
        </div>
    );
}

export default Home;
