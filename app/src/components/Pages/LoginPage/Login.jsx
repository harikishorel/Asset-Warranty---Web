import React, { useState } from "react";
import axios from "../../Repeated/axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../../Repeated/font.css";
import "../../Repeated/font2.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const history = useNavigate();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [demail, setdEmail] = useState("");
  const [dpassword, setdPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function submitMan(e) {
    e.preventDefault();
    try {
      await axios
        .post(
          "/",
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data === "exist") {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
              showCloseButton: true,
            });

            history("/ManufactureLand", { state: { id: email } });
          } else if (res.data == "notexist") {
            Swal.fire({
              icon: "error",
              text: "There is no such user",
            });
          }
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong Details",
          });
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
  async function submitDeal(e) {
    e.preventDefault();
    try {
      await axios
        .post(
          "/Loginpage",
          {
            demail,
            dpassword,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data === "exist") {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
              showCloseButton: true,
            });

            history("/DealerLand", { state: { id: demail } });
          } else if (res.data == "notexist") {
            Swal.fire({
              icon: "error",
              text: "There is no such user",
            });
          }
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong Details",
          });
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <br />

      <h1
        className="head"
        style={{ fontFamily: "Axiforma", cursor: "pointer" }}
        onClick={() => navigate("/")}>
        Asset Warranty
      </h1>

      <div className="admin-button-bt">
        <button className="admin-bt" onClick={() => navigate("/AdminLogin")}>
          <span> Admin</span>
        </button>
      </div>
      <br />
      <div>
        <br />
        <div className="can">
          <div className="img">
            <br />
            <div className="boxcont">
              <br />
              <h2 className="title">Welcome</h2>
              <Tabs
                defaultActiveKey="Manufacturer"
                id="justify-tab-example"
                className="mb-3"
                justify
                // style={{
                //   color: "green",
                //   backgroundColor: "black",
                //   borderRadius: "10px",
                // }}
                style={{ fontFamily: "Helvetica Now" }}>
                {/* Manufacturer login */}
                <Tab eventKey="Manufacturer" title="Manufacturer">
                  <form
                    className="login-form"
                    action="POST"
                    onSubmit={submitMan}>
                    <label
                      className="Email-btn"
                      htmlfor="email"
                      style={{ fontFamily: "Axiforma" }}>
                      Email
                    </label>
                    <input
                      required
                      className="wn"
                      type="email"
                      placeholder="Your email"
                      id="email"
                      name="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      style={{ fontFamily: "Helvetica Now" }}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <br />
                    <label
                      className="Email-btn"
                      htmlfor="password"
                      style={{ fontFamily: "Axiforma" }}>
                      Password
                    </label>
                    <div className="input-container">
                      <input
                        required
                        className="wn"
                        type={showPassword ? "text" : "password"}
                        placeholder="*********"
                        id="password"
                        name="password"
                        style={{ fontFamily: "Helvetica Now", width: "100%" }}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <span
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}>
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className="eye"
                        />
                      </span>
                    </div>
                    <br />
                    <button
                      className="bt"
                      type="submit"
                      style={{ fontFamily: "Axiforma" }}
                      // onClick={submitMan}
                    >
                      Log In
                    </button>
                    <br />
                  </form>
                </Tab>
                {/* Dealer Login */}
                <Tab eventKey="Dealer" title="Dealer">
                  <form
                    className="login-form"
                    action="POST"
                    onSubmit={submitDeal}>
                    <label
                      className="Email-btn"
                      htmlfor="email"
                      style={{ fontFamily: "Axiforma" }}>
                      Email
                    </label>
                    <input
                      required
                      className="wn"
                      type="email"
                      placeholder="Your email"
                      id="email"
                      name="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      style={{ fontFamily: "Helvetica Now" }}
                      onChange={(e) => {
                        setdEmail(e.target.value);
                      }}
                    />
                    <br />
                    {/* <label
                      className="Email-btn"
                      htmlfor="password"
                      style={{ fontFamily: "Axiforma" }}>
                      Password
                    </label>
                    <input
                      required
                      className="wn"
                      type="password"
                      placeholder="*********"
                      id="password"
                      name="password"
                      style={{ fontFamily: "Helvetica Now" }}
                      onChange={(e) => {
                        setdPassword(e.target.value);
                      }}
                    /> */}

                    <label
                      className="Email-btn"
                      htmlFor="password"
                      style={{ fontFamily: "Axiforma" }}>
                      Password
                    </label>
                    <div className="input-container">
                      <input
                        required
                        className="wn"
                        type={showPassword ? "text" : "password"}
                        placeholder="*********"
                        id="password"
                        name="password"
                        style={{ fontFamily: "Helvetica Now", width: "100%" }}
                        onChange={(e) => {
                          setdPassword(e.target.value);
                        }}
                      />
                      <span
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}>
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className="eye"
                        />
                      </span>
                    </div>

                    <br />
                    <button
                      className="bt"
                      type="submit"
                      style={{ fontFamily: "Axiforma" }}
                      // onClick={submitDeal}
                    >
                      Log In
                    </button>
                    <br />
                  </form>
                </Tab>
              </Tabs>
              {/* <form className="login-form" action="POST">
                <label className="Email-btn" htmlfor="email">
                  Email
                </label>
                <input
                  className="wn"
                  type="email"
                  placeholder="Your email"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <br />
                <label className="Email-btn" htmlfor="password">
                  Password
                </label>
                <input
                  className="wn"
                  type="password"
                  placeholder="*********"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <br />
                <button className="bt" type="submit" onClick={submit}>
                  Log In
                </button>
                <br />
              </form> */}
            </div>
          </div>
        </div>
      </div>
      <div className="copy" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
      {/* <div className="headlogin" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div> */}
    </div>
  );
};

export default LoginPage;
