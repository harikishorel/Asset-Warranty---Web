import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import "./ResHead.css";

function DealHead({ connect, connected }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["deal_sessionId"]);
  const token = jwtDecode(cookies.deal_sessionId);
  //    const handleClick = () => {
  //      const navBar = document.querySelector(".nav-bar");
  //      navBar.classList.toggle("active");
  //    };
  const logout = () => {
    removeCookie("deal_sessionId");

    navigate("/", { replace: true });
  };
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 5 }}>
      <nav style={{ fontFamily: "Axiforma" }}>
        <div
          className="logo"
          style={{ fontFamily: "Axiforma", cursor: "pointer" }}
          onClick={() => navigate("/DealerLand")}
        >
          Asset Warranty
        </div>
        <input
          type="checkbox"
          id="click"
          checked={click}
          onChange={handleClick}
        />
        <label htmlFor="click" className="menu-btn">
          <i className="fas fa-bars"></i>
        </label>
        <ul>
          <li>
            <a
              onClick={() => navigate("/DealerLand/Stock")}
              style={{
                color: "white",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              Stock
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate("/DealerLand/Profile")}
              style={{ color: "white", cursor: "pointer" }}
              onMouseEnter={(e) => {
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              Profile
            </a>
          </li>

          <li>
            <a
              onClick={logout}
              style={{ color: "white", cursor: "pointer" }}
              onMouseEnter={(e) => {
                e.target.style.color = "red";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              Logout
            </a>
          </li>
          <li>
            <a
              className="active"
              style={{
                textDecoration: "none",
                cursor: "pointer",
              }}
              onClick={connect}
            >
              {connected ? "Connected" : "Connect"}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default DealHead;
