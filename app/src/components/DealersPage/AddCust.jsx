import React, { useState, useRef, useEffect, useContext } from "react";
import "./AddCust.css";
import "../Repeated/font.css";
// import axios from "../Repeated/axios";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../Verification/Verification.css";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth, signInWithPhoneNumber } from "../Verification/firebase.config";
import { RecaptchaVerifier } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../Repeated/Loader";

const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");

function AddCust(props) {
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["deal_sessionId"]);
  const token = jwtDecode(cookies.deal_sessionId);
  const dealerName = token.name;
  const { serialNumber } = useParams();
  const { warranty } = useParams();

  // console.log(props);

  const [submitting, setSubmitting] = useState(false);

  const { provider, account, stockcontract } = useContext(EthereumContext);
  const firstNameRef = useRef("");
  const email = useRef("");
  const saledateRef = useRef("");
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || ""
  );
  useEffect(() => {
    localStorage.setItem("firstName", firstName);
  }, [firstName]);
  const [saledate, setsaledate] = useState(
    localStorage.getItem("saledate") || ""
  );
  useEffect(() => {
    localStorage.setItem("saledate", saledate);
  }, [saledate]);

  const AddCustomer = async (event) => {
    event.preventDefault();
    setIsLoading(true); // set the loading state to true before sending the transaction
    const serailNumber = serialNumber;
    const customerName = firstNameRef.current.value;
    const saleDate = saledateRef.current.value;
    const amount = 3;

    try {
      const response = await executeTransaction(
        stockcontract,
        provider,
        "markProductAsSold",
        [serailNumber, customerName, ph, saleDate, warranty, amount],
        0
      );
      log("addProduct", "hash", response.txHash);
      setIsLoading(false); // set the loading state to false after receiving the response

      // show success alert
      Swal.fire({
        title: "Customer Added Successfully",
        icon: "success",
        confirmButtonText: "OK",
        cancelButtonText: "Close",
        showCancelButton: false,
        showCloseButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/DealerLand/Stock");
        } else {
          window.location.reload();
        }
      });
    } catch (error) {
      setIsLoading(false); // set the loading state to false if an error occurs

      // show error alert
      Swal.fire({
        title: "Error",
        text: "Error in Transaction. Please make sure you connected with wallet or have sufficient amount for making transaction",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
      });
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "500px",
      height: "300px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "10px",
    },
  };
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        // console.log(res);
        setUser(res.user);
        setShowModal(false); // close the modal

        setOtpVerified(true); // update state variable
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  const handleSignupAndOpenModal = () => {
    onSignup();
    setShowModal(true);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="first-section">
        <br />
        <div className="AD">
          <Toaster toastOptions={{ duration: 4000 }} />

          <button
            className="backButon"
            onClick={() => navigate("/DealerLand/Stock")}>
            <svg
              height="36"
              width="36"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1024 1024">
              <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
            </svg>
            {/* <span>Back</span> */}
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
        <div className="contbox">
          <div className="testbox">
            <form className="customerform">
              <div className="banner">
                <h1 className="titleheader" style={{ fontfamily: "Axiforma" }}>
                  Customer Details
                </h1>
              </div>

              <br />
              <div id="serial-number">
                <label htmlFor="fname" className="labelcust">
                  SERIAL NUMBER :
                </label>
                <br />
                <strong>
                  <h3 style={{ fontFamily: "Helvetica Now" }}>
                    {serialNumber}
                  </h3>
                </strong>
              </div>
              <br />
              <div className="colums">
                <div className="item">
                  <label htmlFor="fname" className="labelcust">
                    NAME<span>*</span>
                  </label>
                  <input
                    required
                    id="firstName"
                    label="Customer Name"
                    className="inputcust"
                    ref={firstNameRef} // <-- set the ref to `firstName`
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="item">
                  <label htmlFor="fname" className="labelcust">
                    PHONE<span>*</span>
                  </label>
                  {/* <PhoneInput
                    country={"in"}
                    value={ph}
                    onChange={setPh}
                    inputStyle={{
                      backgroundColor: "#d6e5f1",
                    }}
                  /> */}
                  <PhoneInput
                    country={"in"}
                    value={ph}
                    onChange={setPh}
                    inputStyle={{
                      marginLeft: "25px",
                      marginBottom: "10px",
                      backgroundColor: "#d6e5f1",
                    }}
                    placeholder={"Enter phone number"}
                    placeholderTextColor={"#669999"}
                  />
                </div>
                <div className="item">
                  <label htmlFor="fname" className="labelcust">
                    SALE DATE<span>*</span>
                  </label>
                  <input
                    required
                    id="saledate"
                    type="date"
                    name="date"
                    className="inputcust"
                    ref={saledateRef} // <-- set the ref to `firstName`
                    value={saledate}
                    onChange={(e) => setsaledate(e.target.value)}
                  />
                </div>

                <div className="item">
                  <label htmlFor="fname" className="labelcust">
                    WARRANTY<span>*</span>
                  </label>
                  <input
                    disabled
                    id="serial-number"
                    className="inputcust"
                    // style={{ backgroundColor: "rgb(196, 206, 206)" }}
                    // ref={email} // <-- set the ref to `firstName`
                    value={warranty}
                  />
                </div>
              </div>

              <div>
                {otpVerified ? (
                  <>
                    <p className="otp-part">OTP Verified &#x2714;</p>
                    <button
                      className="btC"
                      type="submit"
                      style={{
                        display: "flex",
                        justifyItems: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={AddCustomer}>
                      Submit
                    </button>
                  </>
                ) : null}
              </div>
              {isLoading && (
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
              <div>
                {!otpVerified && (
                  <button
                    className="btC"
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={handleSignupAndOpenModal}
                    type="button"
                    // className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && (
                      <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    <span>Verify</span>
                  </button>
                )}

                {otpVerified && (
                  <p style={{ display: "none" }}>OTP Verified!</p>
                )}

                <Modal
                  isOpen={showModal}
                  onRequestClose={() => setShowModal(false)}
                  style={customStyles}>
                  <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsFillShieldLockFill size={30} />
                  </div>
                  <h5>Enter your OTP</h5>

                  <OtpInput
                    color={"black"}
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="opt-container "></OtpInput>
                  {/* <input
                    color={"black"}
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="opt-container "
                  ></input> */}

                  <button
                    className="verify-otp"
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={onOTPVerify}
                    // className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && (
                      <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    <span>Verify OTP</span>
                  </button>
                </Modal>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      {/* <section className="bg-emerald-500 flex items-center justify-center h-screen"> */}
      <section className="second-section">
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>
          {user ? (
            <h2 className="text-center text-white font-medium text-2xl">
              👍Login Success
            </h2>
          ) : (
            //OTP
            <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
              {showOTP ? (
                <>
                  <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsFillShieldLockFill size={30} />
                  </div>
                  <h5>Enter your OTP</h5>

                  <OtpInput
                    color={"black"}
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="opt-container "></OtpInput>

                  <br />
                  <button
                    style={{ width: "150px" }}
                    onClick={onOTPVerify}
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded">
                    {loading && (
                      <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    <span style={{ color: "black" }}>Verify OTP</span>
                  </button>
                </>
              ) : (
                //verify your phone number
                <div className="VerifyPH">
                  <br />
                  <>
                    <h1 style={{ fontSize: "20px", marginLeft: "22px" }}>
                      Enter Your Phone Number To Verify
                    </h1>
                    <div className="" style={{ marginLeft: "24px" }}>
                      <BsTelephoneFill size={25} />
                    </div>

                    <PhoneInput
                      style={{ marginLeft: "25px" }}
                      country={"in"}
                      value={ph}
                      onChange={setPh}
                    />
                    <br />
                    <button
                      style={{
                        width: "200px",
                        height: "30px",
                        marginLeft: "25px",
                      }}
                      onClick={onSignup}
                      className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded">
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span style={{ color: "green" }}>Send code via sms</span>
                    </button>
                  </>
                  <br />
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AddCust;
