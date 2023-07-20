import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResHead.css";
import "../Repeated/font.css";

function LandHead() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 5 }}>
      <nav style={{ backgroundColor: "white", fontFamily: "Axiforma" }}>
        <div
          className="logo"
          style={{ fontFamily: "Axiforma", cursor: "pointer", color: "black" }}
          onClick={() => navigate("/")}
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
          <i className="fas fa-bars" style={{ color: "black" }}></i>
        </label>
        <ul>
          <li>
            <a
              className="active"
              style={{
                cursor: "pointer",
                fontFamily: "Axiforma",
                fontWeight: "bolder",
                fontSize: "20px",
              }}
              onClick={() => navigate("/LoginPage")}
            >
              Login
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LandHead;
