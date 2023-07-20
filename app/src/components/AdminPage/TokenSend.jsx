import React, { useState, useRef, useContext } from "react";
import axios from "../Repeated/axios";
import "./TokenSend.css";
import Loading from "react-loading";
import Swal from "sweetalert2";
import Loader from "../Repeated/Loader";
const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");

function TokenSend({ manufacturer, onClose }) {
  const [loading, setLoading] = useState(false);

  const showLoadingIndicator = () => {
    setLoading(true);
  };

  const hideLoadingIndicator = () => {
    setLoading(false);
  };

  const [add, setAdd] = useState(manufacturer.address);
  const waddressRef = useRef(null);
  const amount = useRef(null);

  const [submitting, setSubmitting] = useState(false);

  const { provider, account, stockcontract } = useContext(EthereumContext);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });
  // const mint = async (event) => {
  //   event.preventDefault();
  //   setSubmitting(true);

  //   const companyaddress = waddressRef.current.value;
  //   const amountt = amount.current.value;
  //   const response = await executeTransaction(
  //     stockcontract,
  //     provider,
  //     "transfer",
  //     [companyaddress, amountt],
  //     0
  //   );
  //   log("mint", "hash", response.txHash);

  //   setSubmitting(false);
  // };
  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.get(`/admin/${manufacturer._id}`, {
  //       add,
  //     });
  //     Toast.fire({
  //       title: "Token Sent Successfully",
  //       icon: "success",
  //     }).then(() => {
  //       window.location.reload(); // reload the current page
  //     });
  //     onClose();
  //   } catch (e) {
  //     Toast.fire({
  //       text: "Update the details correctly",
  //       icon: "error",
  //       cancelButtonText: "Close",
  //       showCancelButton: true,
  //       showConfirmButton: false,
  //     });
  //     console.log(e);
  //   }
  // };

  // const mint = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const companyaddress = waddressRef.current.value;
  //     const amountt = amount.current.value;
  //     const response = await executeTransaction(
  //       stockcontract,
  //       provider,
  //       "transfer",
  //       [companyaddress, amountt],
  //       0
  //     );

  //     log("mint", "hash", response.txHash);

  //     Toast.fire({
  //       title: "Token Sent Successfully",
  //       icon: "success",
  //     }).then(() => {
  //       window.location.reload(); // reload the current page
  //     });
  //     onClose();
  //   } catch (e) {
  //     Toast.fire({
  //       text: "Transaction Failed",
  //       icon: "error",
  //       cancelButtonText: "Close",
  //       showCancelButton: true,
  //       showConfirmButton: false,
  //     });
  //     console.log(e);
  //   }
  // };

  const mint = async (e) => {
    e.preventDefault();
    try {
      const companyaddress = waddressRef.current.value;
      const amountt = amount.current.value;

      // Show loading indicator
      showLoadingIndicator();

      const response = await executeTransaction(
        stockcontract,
        provider,
        "transfer",
        [companyaddress, amountt],
        0
      );

      // Hide loading indicator
      hideLoadingIndicator();

      // Show success message and reload page
      Toast.fire({
        title: "Token Sent Successfully",
        icon: "success",
      }).then(() => {
        showLoadingIndicator();
        window.location.reload();
      });

      onClose();
    } catch (e) {
      // Hide loading indicator
      hideLoadingIndicator();

      // Show error message
      Toast.fire({
        text: "Transaction Failed",
        icon: "error",
        cancelButtonText: "Close",
        showCancelButton: true,
        showConfirmButton: false,
      });

      console.log(e);
    }
  };

  return (
    <div>
      <div className="centre-form">
        <div class="send-tok-form-container">
          <p class="send-tok-title">SEND TOKEN</p>
          <form class="send-tok-form">
            <div class="send-tok-input-group">
              <label>Wallet Address</label>
              <input
                className="send-tok-input"
                type="text"
                placeholder="Wallet Address"
                value={add}
                ref={waddressRef}
                onChange={(e) => setAdd(e.target.value)}
                disabled
              />
            </div>
            <div class="send-tok-input-group">
              <label>Token Amount</label>
              <input
                required
                className="send-tok-input"
                type="text"
                ref={amount}
                placeholder="Tokens"
              />
            </div>
            <br />
            <button class="sign" onClick={mint}>
              <img src="https://i.ibb.co/b3FvnPg/tokenlogo-removebg-preview.png" />
              SEND TOKEN
            </button>
          </form>
        </div>
      </div>
      {loading && (
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
          }}
        >
          {/* <Loading type="spin" color="#333" height={50} width={50} /> */}
          <Loader type="spin" />
        </div>
      )}
    </div>
  );
}

export default TokenSend;
