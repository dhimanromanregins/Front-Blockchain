import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import binanceLogo from "../binance-1.png";
import TrustImage from "../qr.png";

const Payment = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const walletAdd = "0x05EB007739071440158fc9e1CDb43e2626701cdD";
  const [isCopied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(walletAdd)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-wrap">
        <div className="copy">
            <div className="payment">
              <div className="datta" contentEditable="false">
                {walletAdd.slice(0, 7)}...
                {walletAdd.slice(walletAdd.length - 7, walletAdd.length)}
              </div>
            
            </div>
         <div>
         <FontAwesomeIcon
                icon={faCopy}
                onClick={handleCopy}
                style={{
                  cursor: "pointer",
                   fontSize:"16px",
                marginLeft:"10px",
                }}
              />
              {isCopied && <span  className="copied-text" id="copied ">Copied</span>}
         </div>
          </div>
          <div className="pt-4">
            <img
              src={isFlipped ? TrustImage : binanceLogo}
              className="logo-biance"
              alt="logo"
              onClick={() => setIsFlipped(!isFlipped)}
              style={{
                cursor: "pointer",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.5s",
              }}
            />
          </div>
          <div className="payment">
            <div className="datta" contentEditable="false">Pay:$40</div>
          </div>
          <br />
          <div className="payment">
            <input id="paymentAmount" type="text" placeholder="Transaction ID" />
          </div>
          <div>
            <button className="App-link">Submit Payment</button>
          </div>
          <form id="multistepsform">
            <ul className="p-0" id="progressbar">
              <li className="active">Payment Initiated</li>
              <li>In Progress</li>
              <li>Payment Completed</li>
            </ul>
          </form>
        </div>
      </header>
    </div>
  );
};

export default Payment;
