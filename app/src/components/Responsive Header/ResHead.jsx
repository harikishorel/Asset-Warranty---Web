import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./ResHead.css";
// import { Modal, ModalBody } from "react-bootstrap";
import Modal from "react-modal";
import SendToken from "./SendToken";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.min.css";

function ResHead({ connect, connected }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);

  const logout = () => {
    removeCookie("manu_sessionId");

    navigate("/", { replace: true });
  };

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 5 }}>
      <nav style={{ fontFamily: "Axiforma" }}>
        <div
          className="logo"
          style={{ fontFamily: "Axiforma", cursor: "pointer" }}
          onClick={() => navigate("/ManufactureLand")}
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
              onClick={() => {
                // navigate("/send");
                navigate("/ManufactureLand/SendToken");
              }}
              // onClick={handleOpenModal}
              style={{ color: "white", cursor: "pointer" }}
              onMouseEnter={(e) => {
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              Send
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate("/ManufactureLand/Product")}
              style={{ color: "white", cursor: "pointer" }}
              onMouseEnter={(e) => {
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              Product
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate("/ManufactureLand/ModelPage")}
              style={{ color: "white", cursor: "pointer" }}
              onMouseEnter={(e) => {
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              Model
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate("/ManufactureLand/dealers")}
              style={{ color: "white", cursor: "pointer" }}
              onMouseEnter={(e) => {
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              Dealer
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate("/ManufactureLand/Stock")}
              style={{ color: "white", cursor: "pointer" }}
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

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Token Send Popup"
        className="token-showup"
      >
        <SendToken onClose={handleCloseModal} />
      </Modal>
    </div>
  );
}

export default ResHead;
