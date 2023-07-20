import React, { useEffect, useState } from "react";
// import Dealertop from "../Repeated/Dealertop";
import "./Dealerprofile.css";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Dealerprofile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["deal_sessionId"]);
  const token = jwtDecode(cookies.deal_sessionId);
  const dealerName = token.name;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    // Get JWT from cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("deal_sessionId="))
      .split("=")[1];
    // Decode JWT to get email
    const decoded = jwtDecode(token);
    const userEmail = decoded.demail;
    const userName = decoded.name;
    const userBranch = decoded.branch;
    const userLocation = decoded.location;
    const userPhone = decoded.phone;
    // Set email state
    setEmail(userEmail);
    setName(userName);
    setBranch(userBranch);
    setLocation(userLocation);
    setPhone(userPhone);
  }, []);

  const logout = () => {
    removeCookie("deal_sessionId");

    navigate("/", { replace: true });
  };

  return (
    <div className="bcbody">
      {/* <Dealertop/> */}
      <div className="zea">
        <div className="zea1">
          <img
            className="goback"
            onClick={() => navigate("/DealerLand")}
            src="https://www.linkpicture.com/q/go-back_2.png"
            alt=""
          />
          <h3
            className="dstyle"
            style={{
              fontFamily: "Axiforma",
              marginLeft: "30px",
              marginTop: "52px",
              wordSpacing: "6px",
            }}>
            DEALER PROFILE
          </h3>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>

        <img
          class="zea2"
          src="https://www.linkpicture.com/q/profile_picture-transformed-removebg-preview.png"
          alt=""
        />
      </div>
      <br />
      <br />
      <br />
      <div className="zea5">
        <br />
        <div className="zea3">
          <br />
          <li>
            <strong className="ze" style={{ fontFamily: "Axiforma" }}>
              Name:
            </strong>
            <h7
              className="ze1"
              style={{ marginLeft: "30px", fontFamily: "Helvetica Now" }}>
              {name}
            </h7>
          </li>
          <br />
          <br />

          <li>
            <strong className="ze" style={{ fontFamily: "Axiforma" }}>
              Position:
            </strong>
            <h7
              className="ze1"
              style={{ paddingLeft: "12px", fontFamily: "Helvetica Now" }}>
              Dealer
            </h7>
          </li>
          <br />
          <br />

          <li>
            <strong className="ze" style={{ fontFamily: "Axiforma" }}>
              Branch:
            </strong>
            <h7
              className="ze1"
              style={{ paddingLeft: "20px", fontFamily: "Helvetica Now" }}>
              {branch}
            </h7>
          </li>
          <br />
          <br />
        </div>
        <br />
        <br />

        <div className="zea4">
          <li>
            <strong className="ze" style={{ fontFamily: "Axiforma" }}>
              Location:
            </strong>
            <h7
              className="ze1"
              style={{ paddingLeft: "10px", fontFamily: "Helvetica Now" }}>
              {location}
            </h7>
          </li>
          <br />
          <li>
            <strong className="ze" style={{ fontFamily: "Axiforma" }}>
              Email:
            </strong>
            <h7
              className="ze1"
              style={{ paddingLeft: "40px", fontFamily: "Helvetica Now" }}>
              {email}
            </h7>
          </li>
          <br />

          <li>
            <strong className="ze" style={{ fontFamily: "Axiforma" }}>
              Mobile:
            </strong>
            <h7
              className="ze1"
              style={{ paddingLeft: "30px", fontFamily: "Helvetica Now" }}>
              {phone}
            </h7>
          </li>

          <br />
        </div>
        <button className="but1" onClick={logout}>
          <span style={{ fontFamily: "Helvetica Now" }}>Logout</span>
          <svg
            viewBox="-5 -5 110 110"
            preserveAspectRatio="none"
            aria-hidden="true">
            <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
          </svg>
        </button>
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
    // </div>
  );
};

export default Dealerprofile;
