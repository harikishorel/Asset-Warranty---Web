import React, { useState, useContext, useEffect } from "react";
import axios from "../../Repeated/axios";
import "./AdminLogin.css";
import "../../Repeated/font.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");

function AdminLogin() {
  const navigate = useNavigate();
  const history = useNavigate();
  const [adminWallet, setAdminWallet] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function submitAdmin(e) {
    e.preventDefault();
    try {
      await axios
        .post(
          "/AdminLogin",
          {
            adminWallet,
            adminPassword,
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

            history("/admin", { state: { id: adminWallet } });
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
  const { account } = useContext(EthereumContext);
  // const [adminWalletadd, setAdminWalletadd] = useState('')
  useEffect(() => {
    if (account instanceof Promise) {
      account.then((address) => {
        const xdcAddress = address.replace(/^0x/, "xdc");

        setAdminWallet(xdcAddress);
      });
    } else if (account) {
      const xdcAddress = account.replace(/^0x/, "xdc");

      setAdminWallet(xdcAddress);
    }
  }, [account]);
  return (
    <div className="admin-background">
      <br />
      <h1
        className="head"
        style={{ fontFamily: "Axiforma", cursor: "pointer", color: "white" }}
        onClick={() => navigate("/")}>
        Asset Warranty
      </h1>
      <div className="login-box">
        <form
        //  onSubmit={submitAdmin}
        >
          <h1 className="admin-text">Admin</h1>
          <br />
          <div className="user-box">
            <input
              required
              type="text"
              placeholder="Your Wallet"
              id="adminWallet"
              name="adminWallet"
              value={adminWallet}
              onChange={(e) => {
                setAdminWallet(e.target.value);
              }}
            />
            <label style={{ fontSize: "14px" }}>Wallet Address</label>
          </div>
          <div className="user-box">
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              id="adminPassword"
              name="adminPassword"
              onChange={(e) => {
                setAdminPassword(e.target.value);
              }}
            />
            <span
              className="eye-icon-admin"
              onClick={() => setShowPassword(!showPassword)}>
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="eye-admin"
              />
            </span>
            <label style={{ fontSize: "14px" }}>Password</label>
          </div>
          <div className="adlogin-pos">
            <a type="submit" onClick={submitAdmin}>
              LOGIN
              <span></span>
            </a>
          </div>
        </form>
      </div>

      <div className="copy" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
    </div>
  );
}

export default AdminLogin;
