import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "../Repeated/axios";
import { Dropdown } from "react-bootstrap";
import "./SendToken.css";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import "../AdminPage/TokenSend.css";
import Loader from "../Repeated/Loader";
import Swal from "sweetalert2";

const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");

function SendToken() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });

  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);

  const waddressRef = useRef(null);
  const [iswAddressDisabled, setIswAddressDisabled] = useState(true);

  const [selectedDealer, setSelectedDealer] = useState(null);
  const [dealerId, setDealerId] = useState("");
  const handleSelectDealer = (dealer) => {
    const selectedDealerId = dealer.name;
    setSelectedDealer(dealer);
    setDealerId(selectedDealerId);
  };

  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/dealers", {
          withCredentials: true,
        });
        // console.log("response data", response.data);
        setDealers(response.data);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const [submitting, setSubmitting] = useState(false);

  const { provider, account, stockcontract } = useContext(EthereumContext);

  const [companyaddress, setCompanyAddress] = useState(
    selectedDealer ? selectedDealer.waddress : ""
  );
  const [amount, setAmount] = useState("");
  const handleAddressChange = (event) => {
    setCompanyAddress(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const address = useRef("");
  // const mint = async (event) => {
  //   event.preventDefault();
  //   setSubmitting(true);

  //   const companyaddress = address.current.value;

  //   const response = await executeTransaction(
  //     stockcontract,
  //     provider,
  //     "transfer",
  //     [companyaddress, amount],
  //     0
  //   );
  //   log("mint", "hash", response.txHash);

  //   setSubmitting(false);
  // };

  const mint = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const companyaddress = address.current.value;

    try {
      const response = await executeTransaction(
        stockcontract,
        provider,
        "transfer",
        [companyaddress, amount],
        0
      );
      log("mint", "hash", response.txHash);

      // Show success alert and reload page
      Swal.fire({
        title: "Token Sent Successfully",
        icon: "success",
        confirmButtonText: "OK",
        cancelButtonText: "Close",
        showCancelButton: true,
        showCloseButton: true,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      // Show error alert
      Toast.fire({
        text: "Transaction Failed.",
        icon: "error",
        cancelButtonText: "Close",
        showCancelButton: true,
        showConfirmButton: false,
      });
    }

    setSubmitting(false);
  };

  return (
    <div className="add-prod-img" style={{ marginTop: "-70px" }}>
      <div className="send-t">
        <div className="centre-form" style={{ marginTop: "70px" }}>
          <div class="send-tok-form-container">
            <p class="send-tok-title" style={{ fontFamily: "Axiforma" }}>
              SEND TOKEN
            </p>
            <form class="send-tok-form">
              <div class="send-tok-input-group">
                <label style={{ fontFamily: "Axiforma" }}>Dealer</label>

                <Dropdown
                  required
                  className="drop-token"
                  style={{ fontFamily: "Helvetica Now" }}>
                  <Dropdown.Toggle variant="secondary">
                    {selectedDealer ? selectedDealer.name : "Select Dealer"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    {dealers &&
                      dealers.map((dealer) => (
                        <Dropdown.Item
                          key={dealer._id}
                          active={selectedDealer === dealer}
                          onClick={() => handleSelectDealer(dealer)}>
                          {dealer.name}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>

                <label style={{ fontFamily: "Axiforma" }}>Wallet Address</label>
                <input
                  className="send-tok-input"
                  type="text"
                  style={{ fontFamily: "Helvetica Now" }}
                  placeholder="Wallet Address"
                  onChange={handleAddressChange}
                  ref={address}
                  value={selectedDealer ? selectedDealer.waddress : ""}
                  disabled={!selectedDealer || iswAddressDisabled}
                />
              </div>
              <div class="send-tok-input-group">
                <label style={{ fontFamily: "Axiforma" }}>Token Amount</label>
                <input
                  required
                  className="send-tok-input"
                  type="number"
                  style={{ fontFamily: "Helvetica Now" }}
                  placeholder="Tokens"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
              <br />
              <button
                class="sign"
                style={{ fontFamily: "Axiforma" }}
                onClick={mint}>
                <img src="https://i.ibb.co/b3FvnPg/tokenlogo-removebg-preview.png" />
                SEND TOKEN
              </button>
            </form>
            {submitting && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(255, 255, 255, 0.8)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}>
                {/* <Loading type="spin" color="#333" height={50} width={50} /> */}
                <Loader type="spin" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendToken;
