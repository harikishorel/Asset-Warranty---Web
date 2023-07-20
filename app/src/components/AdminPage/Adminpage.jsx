import React, { useEffect, useRef, useState, useContext } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.min.css";
import "./Adminpage.css";
import "./ATable.css";
import axios from "../Repeated/axios";
import Modal from "react-modal";
import ATable from "./ATable";
import "./base.css";
import { useNavigate } from "react-router-dom";
import Createmanu from "./Createmanu";
import TokenSend from "./TokenSend";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";

const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");

function Adminpage() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["admin_sessionId"]);
  const token = jwtDecode(cookies.admin_sessionId);
  // console.log(token);

  const logout = () => {
    removeCookie("admin_sessionId");

    navigate("/", { replace: true });
  };

  const [manufacturers, setManufacturer] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get("/admin");
      setManufacturer(data);
      // console.log(data);
    };
    fetchdata();
  }, []);

  const [submitting, setSubmitting] = useState(false);

  const { provider, account, stockcontract } = useContext(EthereumContext);

  const address = useRef("");

  const mint = async (event, companyaddress) => {
    event.preventDefault();
    setSubmitting(true);

    const amount = 20;

    const response = await executeTransaction(
      stockcontract,
      provider,
      "transfer",
      [companyaddress, amount],
      0
    );
    log("mint", "hash", response.txHash);

    setSubmitting(false);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleAddManufactureClick = () => {
    setShowPopup(true);
  };

  const handlePopupClick = (event) => {
    event.stopPropagation();
  };

  const handleWindowClick = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (showPopup) {
      window.addEventListener("click", handleWindowClick);
    } else {
      window.removeEventListener("click", handleWindowClick);
    }
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [showPopup]);

  const containerRef = useRef(null);
  let scroll = null;

  useEffect(() => {
    scroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      multiplier: 1,
    });
    scroll.init();
    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []);

  const handlePopupContainerClick = (event) => {
    event.stopPropagation();
  };
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = manufacturers
    ? manufacturers.data.slice(indexOfFirstRow, indexOfLastRow)
    : [];

  const totalPages = manufacturers
    ? Math.ceil(manufacturers.data.length / rowsPerPage)
    : 0;

  const handleNextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const [searchQuery, setSearchQuery] = useState("");

  // const [showTokenSendPopup, setShowTokenSendPopup] = useState(false);
  // const [showAnotherPopup, setShowAnotherPopup] = useState(false);

  // const handleTokenSendClick = () => {
  //   setShowTokenSendPopup(true);
  // };

  // const handleAnotherClick = () => {
  //   setShowAnotherPopup(true);
  // };
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [selectedAdd, setSelectedAdd] = useState({});
  const handleEdit = (manufacturer) => {
    setSelectedAdd({
      ...manufacturer,
    });
    setShowModal(true);
  };

  return (
    <body className="moon" ref={containerRef} data-scroll-container>
      <section className="scroll-sectiontop" data-scroll-section>
        <div className="Ap">
          <div className="Ap1" style={{ width: "350px" }}>
            Asset Warranty
          </div>
          {/* <button className="Ap2">Connect</button> */}
          <button
            className="Ap2"
            style={{ marginLeft: "225px" }}
            onClick={logout}>
            Logout
          </button>
        </div>
      </section>
      <div ref={containerRef} data-scroll-container>
        <section className="scroll-section1" data-scroll-section>
          <div className="Ap3">
            <div>
              <h3 className="introh">
                SecureKloud Platform: Streamline Your Manufacturing, Boost Your
                Security
              </h3>
              <br />
              <h5 className="introp" data-scroll data-scroll-speed="1">
                The use of cryptocurrency tokens suggests that the platform
                employs the latest technology and provides an innovative
                solution to the challenges of secure manufacturing processes.
              </h5>
            </div>

            <div className="Ap4" data-scroll data-scroll-speed="2">
              <button class="Ap5" onClick={handleAddManufactureClick}>
                Add Manufacture
              </button>
            </div>
          </div>
        </section>

        <section
          className="scroll-section2"
          id="my-section"
          data-scroll-section>
          <h3 className="tablehead">LIST OF MANUFACTURERS</h3>

          <p
            data-scroll-class="scroll-class"
            data-scroll
            data-scroll-speed="1.5">
            <div class="search-manufact">
              <input
                class="search-manufacturer"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <br />
            <br />
            <div className="table-container">
              {/* <table className="custom-table">
                <thead>
                  <tr>
                    <th>Manufacturer Name</th>
                    <th>Wallet Address</th>
                    <th>Send Tokens</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows
                    .filter((manufacturer) =>
                      manufacturer.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((manufacturer) => (
                      <tr key={manufacturer._id}>
                        <td>{manufacturer.name}</td>
                        <td>
                          <input
                            disabled
                            className="table-input"
                            type="text"
                            onfocus="this.select();"
                            onmouseup="return false;"
                            ref={address}
                            value={manufacturer.address}
                          ></input>
                        </td>
                        <td>
                          <button
                            className="table-button"
                            onClick={() => handleEdit(manufacturer)}
                          >
                            Send Tokens
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table> */}
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Manufacturer Name</th>
                    <th>Wallet Address</th>
                    <th>Send Tokens</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.length === 0 ? (
                    <tr>
                      <td colSpan="3">No manufacturers available</td>
                    </tr>
                  ) : (
                    currentRows
                      .filter((manufacturer) =>
                        manufacturer.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .reverse()
                      .map((manufacturer) => (
                        <tr key={manufacturer._id}>
                          <td>{manufacturer.name}</td>
                          <td>
                            <input
                              disabled
                              className="table-input"
                              type="text"
                              onfocus="this.select();"
                              onmouseup="return false;"
                              ref={address}
                              value={manufacturer.address}></input>
                          </td>
                          <td>
                            <button
                              className="table-button"
                              onClick={() => handleEdit(manufacturer)}>
                              Send Tokens
                            </button>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </p>

          <div className="pagination-container">
            <button
              className="pagination-button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}>
              Prev
            </button>
            <span className="pagetext">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </section>
      </div>
      <br />
      {showPopup && (
        <div className="popup" onClick={handlePopupContainerClick}>
          <Createmanu />
        </div>
      )}

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Token Send Popup"
        className="token-popup">
        <TokenSend manufacturer={selectedAdd} onClose={handleCloseModal} />
      </Modal>
    </body>
  );
}

export default Adminpage;
