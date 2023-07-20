import React, { useEffect, useRef, useState, useContext } from "react";
import "./Createmanu.css";
import Swal from "sweetalert2";
import axios from "../Repeated/axios";
import Loader from "../Repeated/Loader";
import { useNavigate } from "react-router-dom";
const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");

function Createmanu() {
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { provider, account, stockcontract } = useContext(EthereumContext);
  // const addManufacturer = async (event) => {
  //   event.preventDefault();
  //   setSubmitting(true);

  //   const manufacture = address;

  //   const response = await executeTransaction(
  //     stockcontract,
  //     provider,
  //     "addManufacturer",
  //     [manufacture],
  //     0
  //   );
  //   log("addManufacturer", "hash", response.txHash);

  //   setSubmitting(false);
  // };

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setLoading(true);
    try {
      const manufacture = address;

      // Execute the first function
      const response = await executeTransaction(
        stockcontract,
        provider,
        "addManufacturer",
        [manufacture],
        0
      );
      log("addManufacturer", "hash", response.txHash);

      // Execute the second function after the first one completes
      axios.post("/admin", { name, email, password, address }).then((res) => {
        if (res.data.message === "success") setLoading(false);
        {
          Swal.fire({
            title: "Manufacturer Saved Successfully",
            icon: "success",
            confirmButtonText: "OK",
            cancelButtonText: "Close",
            showCancelButton: true,
            showCloseButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              // navigate("/admin");
              window.location.href = "/admin";
            }
          });
        }
        setName("");
        setEmail("");
        setPassword("");
        setAddress("");
        setSubmitting(false);
      });
    } catch (error) {
      setLoading(false);
      // Show an error message if either function fails
      Toast.fire({
        text: "Please add the details correctly",
        icon: "error",
        cancelButtonText: "Close",
        showCancelButton: true,
        showConfirmButton: false,
      });
      setSubmitting(false);
      console.log(error);
    }
  };

  // const manuAdd = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("/admin", { name, email, password, address })
  //     .then((res) => {
  //       if (res.data.message === "success") {
  //         Swal.fire({
  //           title: "Manufacturer Saved Successfully",
  //           icon: "success",
  //           confirmButtonText: "OK",
  //           cancelButtonText: "Close",
  //           showCancelButton: true,
  //           showCloseButton: true,
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             navigate("/admin");
  //           }
  //         });
  //       }
  //       setName("");
  //       setEmail("");
  //       setPassword("");
  //       setAddress("");
  //     })

  //     .catch((e) => {
  //       Toast.fire({
  //         text: "Please add the details correctly",
  //         icon: "error",
  //         cancelButtonText: "Close",
  //         showCancelButton: true,
  //         showConfirmButton: false,
  //       });
  //       console.log(e);
  //     });
  // };

  // const handleAddManufacturer = (event) => {
  //   if (event) {
  //     event.preventDefault();
  //   }
  //   manuAdd(event);
  //   addManufacturer(event);
  // };

  return (
    <div>
      <form className="Cmform" onSubmit={handleFormSubmit}>
        <h3>Register Here</h3>
        <br />
        <label className="Cmlabel" htmlFor="text">
          Username
        </label>
        <input
          required
          className="Cminput"
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />

        <label className="Cmlabel" htmlFor="email">
          Email Id
        </label>
        <input
          required
          className="Cminput"
          type="email"
          placeholder="Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />

        <label className="Cmlabel" htmlFor="password">
          Password
        </label>
        <input
          required
          className="Cminput"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />

        <label className="Cmlabel" htmlFor="Address">
          Wallet Address
        </label>
        <input
          required
          className="Cminput"
          type="Address"
          placeholder="Wallet Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
        />
        <br />
        <button
          className="Cmbut"
          type="submit"
          // onClick={
          //   // handleAddManufacturer
          //   handleFormSubmit
          // }
        >
          Register
        </button>
      </form>

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
          }}>
          <Loader type="spin" />
        </div>
      )}
    </div>
  );
}

export default Createmanu;
