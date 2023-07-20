import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./AddDealer.css";
import "../../Repeated/font.css";
import Loader from "../../Repeated/Loader";
import axios from "../../Repeated/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");

const AddDealer = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);
  // console.log(token);
  const history = useNavigate();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [demail, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [dpassword, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [waddress, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });

  const [submitting, setSubmitting] = useState(false);

  const { provider, account, stockcontract } = useContext(EthereumContext);
  const [loading, setLoading] = useState(false);

  const handleAddDealer = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setLoading(true);

    try {
      const companyaddress = waddress;
      const amount = 10;

      // Execute the first function
      const response = await executeTransaction(
        stockcontract,
        provider,
        "addDealer",
        [companyaddress, amount],
        0
      );
      log("addDealer", "hash", response.txHash);

      // Execute the second function after the first one completes
      const manufacturerEmail = token.email;
      axios
        .post(
          "/AddDealer",
          {
            name,
            demail,
            branch,
            dpassword,
            phone,
            location,
            waddress,
            manufacturerEmail,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.message === "success") {
            setLoading(false);
            Swal.fire({
              title: "Dealer Saved Successfully",
              icon: "success",
              confirmButtonText: "OK",
              cancelButtonText: "Close",
              showCancelButton: true,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                history("/ManufactureLand/dealers");
              }
            });
          }
          setName("");
          setEmail("");
          setBranch("");
          setPassword("");
          setPhone("");
          setLocation("");
          setAddress("");
          setSubmitting(false);
        })
        .catch((e) => {
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
          console.log(e);
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

  return (
    <div className="add-prod-img">
      <br />
      <div className="AD">
        <button
          className="backButon"
          onClick={() => navigate("/ManufactureLand/dealers")}>
          <svg
            height="36"
            width="36"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024">
            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
          </svg>
        </button>
        <h1
          className="backhead"
          style={{
            fontFamily: "Axiforma",
            cursor: "pointer",
            marginLeft: "-30px",
          }}>
          Asset Warranty
        </h1>
      </div>

      <div>
        <br />
        <div>
          <div className="contbox">
            <form
              className="customerform"
              action="POST"
              onSubmit={handleAddDealer}>
              <div className="deal-banner">
                <h1
                  className="dealer-header"
                  style={{ fontfamily: "Axiforma" }}>
                  Add a Dealer
                </h1>
              </div>
              <div className="colums">
                <div className="item">
                  <label className="labeldeal" htmlfor="text">
                    Dealer Name
                  </label>
                  <input
                    required
                    className="dealer-input"
                    type="text"
                    placeholder=" Dealer Name"
                    id="name"
                    name="name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />
                </div>
                <div className="item">
                  <label className="labeldeal" htmlfor="email">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    className="dealer-input"
                    placeholder="Dealer email"
                    id="email"
                    name="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={demail}
                  />
                </div>
                <div className="item">
                  <label className="labeldeal" htmlfor="password">
                    Password
                  </label>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    className="dealer-input"
                    placeholder="*********"
                    id="password"
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={dpassword}
                  />
                  <span
                    className="eye-icon-deal"
                    onClick={() => setShowPassword(!showPassword)}>
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="eye-deal"
                    />
                  </span>
                </div>
                <div className="item">
                  <label className="labeldeal" htmlfor="text">
                    Branch Name
                  </label>
                  <input
                    required
                    type="text"
                    className="dealer-input"
                    placeholder="Branch Name"
                    id="text"
                    name="text"
                    onChange={(e) => {
                      setBranch(e.target.value);
                    }}
                    value={branch}
                  />
                </div>
                <div className="item">
                  <label className="labeldeal" htmlfor="text">
                    Phone Number
                  </label>
                  <input
                    required
                    type="string"
                    className="dealer-input"
                    placeholder="Phone Number"
                    id="text"
                    name="text"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    value={phone}
                  />
                </div>
                <div className="item">
                  <label className="labeldeal" htmlfor="text">
                    Location
                  </label>
                  <input
                    required
                    type="text"
                    className="dealer-input"
                    placeholder="Location"
                    id="text"
                    name="text"
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    value={location}
                  />
                </div>
                <div className="item">
                  <label className="labeldeal" htmlfor="text">
                    Wallet Address
                  </label>
                  <input
                    required
                    type="text"
                    className="dealer-input"
                    placeholder="Waller Address"
                    id="text"
                    name="text"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    value={waddress}
                  />
                </div>
              </div>
              <br />
              <button
                className="btD"
                type="submit"
                // onClick={handleAddDealer}
              >
                Add Dealer
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
        </div>
      </div>
      <div
        className="headlogin"
        style={{
          fontFamily: "Axiforma",
          backgroundColor: "transparent",
          paddingTop: "20px",
          marginBottom: "-100px",
        }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
    </div>
  );
};

export default AddDealer;
