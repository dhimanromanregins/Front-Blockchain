import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import binanceLogo from "../binance.png";
import TrustImage from "../qr.png";
import BASE_URL from "./Api";

const Binance = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [hashError, sethashError] = useState(false);
  const [Failedmessage, setFailedmessage] = useState(false);
  const [trxIdexistmessage, SettrxIdexistmessage] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [underpaidButton, SetunderpaidButton] = useState(null);
  const [underpainMessage, SetunderpaidMessage] = useState(false);
  const [underpaidDifference, SetunderpaidDifference] = useState(false);
  const [paymentstatus, setPaymentstatus] = useState("Payment Completed");
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
  const clientId = localStorage.getItem("clientId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/encrypt-decrypt/?clientId=${clientId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);



  const repayment = () => {

    
  }

  const payAmount = () => {
    try {
      if (transactionHash.trim() === "") {
        sethashError(true);
        return;
      }
      sethashError(false);
      setLoading(true);
      setShowProgressBar(true);
      setTimeout(() => {
        document
          .getElementById("progressbar")
          .children[1].classList.add("active");
      }, 2000);
      setTimeout(async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/api/paymentbinance/?userId=${userData["userId"]}&transactionID=${transactionHash}&original_amount=${userData["Amount"]}&success_url=https%3A%2F%2Fwww.google.com%2F&failure_url=https%3A%2F%2Fwww.facebook.com%2F&api_key=${userData["Api_key"]}&fundpip_wallet_address=0x05EB007739071440158fc9e1CDb43e2626701cdD&order_id=${userData["order_id"]}`
          );
          const data = response.data;
          const data1 = response.data["payment"];
          document
            .getElementById("progressbar")
            .children[2].classList.add("active");
          document
            .getElementById("js-spinner")
            .classList.add("--spinner-complete");
          document
            .getElementById("js-success-tick")
            .classList.add("--tick-complete");
          document
            .getElementById("js-success-ring")
            .classList.add("--ring-complete");
          if (data1 === "UnderPaid") {
            const difference = response.data["difference"];
            // localStorage.setItem('total_amount', data.response.response_data["amount"]);
            // localStorage.setItem('outstanding_amount', difference);
            setPaymentstatus("Complete Amount was not paid");
            SetunderpaidButton(true)
            setLoading(false)
            SetunderpaidDifference(difference);
            SetunderpaidMessage(true);
            setTransactionHash("")
          } else {
            setTimeout(() => {
              const url =
                userData["redirect_url"] + "?clientId=" + data["clientId"];
              window.location.href = url;
            }, 1500);
          }
          
        } catch (error) {
          setLoading(false);
          if (error?.response?.status === 500) {
            payAmount();
          }
          if (error?.response?.status === 404) {
            setPaymentstatus("Payment Failed");
            setFailedmessage(true);
          }
          if (error?.response?.status === 400) {
            setPaymentstatus("Payment Failed");
            setFailedmessage(true);
          }
          if (error?.response?.status === 406) {
            setPaymentstatus("Payment Failed");
            SettrxIdexistmessage(true);
          }
          setTimeout(() => {
            let id = error.response.data["clientId"];
            if (id) {
              const url =
                userData["redirect_url"] +
                "?clientId=" +
                error.response.data["clientId"];
              window.location.href = url;
            }
          }, 3000);
        }
      }, 2000);
    } catch (error) {
      setLoading(false);
    }
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
                  fontSize: "16px",
                  marginLeft: "10px",
                }}
              />
              {isCopied && (
                <span className="copied-text" id="copied ">
                  Copied
                </span>
              )}
            </div>
          </div>
          <div className="pt-4">
            <img
              src={isFlipped ? TrustImage : binanceLogo}
              className="logo-biance app-logo"
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
            <div className="datta" contentEditable="false">
              {!underpaidButton ? (
                <span>Pay: ${userData ? userData["Amount"] : 0}</span>
              ) : (
                <span>Pay: ${underpaidDifference}</span>
              )}
            </div>
          </div>
          <br />
          <div className="payment">
            <input
              id="transactionHash"
              type="text"
              placeholder="Enter Transaction Hash"
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
            />
          </div>
          {hashError && (
            <div
              className="error-message"
              style={{ color: "red", fontSize: "15px" }}
            >
              Transaction Hash is required.
            </div>
          )}
          <div>
            {!underpaidButton && (
              <button
                className="App-link"
                onClick={loading ? null : payAmount}
                disabled={loading ? true : false}
                style={{ pointerEvents: loading ? "none" : "auto" }}
              >
                {loading ? (
                  <div className="spinner-animate-to-result">
                    <svg viewBox="0, 0, 100, 100">
                      <g transform="">
                        <circle
                          className="spinner"
                          id="js-spinner"
                          stroke-miterlimit="10"
                          cx="50"
                          cy="50"
                          r="44"
                        />
                        <polyline
                          className="tick"
                          id="js-success-tick"
                          stroke-miterlimit="10"
                          points="93,15 49,65 28,42"
                        />
                        <svg viewBox="0 0 50 50">
                          <path
                            className="success-ring"
                            id="js-success-ring"
                            d="M37.06,4.74A23.6,23.6,0,0,0,6.63,8.93a23.32,23.32,0,0,0-.91,29.25,23.34,23.34,0,0,0,29.86,6.06A23.46,23.46,0,0,0,46.1,16.36"
                          />
                        </svg>
                      </g>
                    </svg>
                  </div>
                ) : (
                  "Submit Payment"
                )}
              </button>
            )}
            {underpaidButton && (
              <button
                className="App-link"
                onClick={loading ? null : payAmount}
                disabled={loading ? true : false}
                style={{ pointerEvents: loading ? "none" : "auto" }}
              >
                {loading ? (
                  <div className="spinner-animate-to-result">
                    <svg viewBox="0, 0, 100, 100">
                      <g transform="">
                        <circle
                          className="spinner"
                          id="js-spinner"
                          stroke-miterlimit="10"
                          cx="50"
                          cy="50"
                          r="44"
                        />
                        <polyline
                          className="tick"
                          id="js-success-tick"
                          stroke-miterlimit="10"
                          points="93,15 49,65 28,42"
                        />
                        <svg viewBox="0 0 50 50">
                          <path
                            className="success-ring"
                            id="js-success-ring"
                            d="M37.06,4.74A23.6,23.6,0,0,0,6.63,8.93a23.32,23.32,0,0,0-.91,29.25,23.34,23.34,0,0,0,29.86,6.06A23.46,23.46,0,0,0,46.1,16.36"
                          />
                        </svg>
                      </g>
                    </svg>
                  </div>
                ) : (
                  "Re Pay"
                )}
              </button>
            )}
          </div>
          {showProgressBar && (
            <form id="multistepsform">
              <ul className="p-0 m-0" id="progressbar">
                <li className="active">Payment Initiated</li>
                <li>In Progress</li>
                <li>{paymentstatus}</li>
              </ul>
            </form>
          )}
          {Failedmessage && (
            <div
              className="error-message"
              style={{ color: "red", fontSize: "15px" }}
            >
              We are not able to verify your Payment. Please check your
              transction hash and try again
            </div>
          )}
          {trxIdexistmessage && (
            <div
              className="error-message"
              style={{ color: "red", fontSize: "15px" }}
            >
              The Transction Id you are useing is already used. Please enter a
              new Trasction id.
            </div>
          )}
          {underpainMessage && (
            <div
              className="error-message"
              style={{ color: "red", fontSize: "15px" }}
            >
              To complete your transaction, please pay the remaining balance of{" "}
              {underpaidDifference}. Thank you.
              <p onClick={repayment}>Click to complete payment</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Binance;
