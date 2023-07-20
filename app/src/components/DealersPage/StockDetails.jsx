import React, { useState, useEffect, useContext } from "react";
import "../Repeated/font.css";
import "./StockDetails.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import QRCode from "qrcode";

const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");

function StockDetails() {
  const [cookies, setCookie, removeCookie] = useCookies(["deal_sessionId"]);
  const token = jwtDecode(cookies.deal_sessionId);
  const dealerName = token.name;
  // console.log(dealerName);

  // console.log(token);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState([]);
  const { provider, account, stockcontract } = useContext(EthereumContext);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const name = token.name;
        const products = await queryData(
          stockcontract,
          provider,
          "getProductsByDealer",
          [name]
        );
        setStockData(products);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [stockcontract]);

  const navigate = useNavigate();

  function ViewProduct(
    name,
    model,
    dealer,
    serialNumber,
    warranty,
    customerName,
    customerEmail,
    salesDate
  ) {
    customerName = customerName || "NA";
    customerEmail = customerEmail || "NA";
    salesDate = salesDate || "NA";
    var canvas = document.createElement("canvas");
    var url = `http://${window.location.hostname}:3000/View/${serialNumber}`;
    // var url = `http://192.168.26.171:3001/View/${serialNumber}`;
    // var url = `http://192.168.26.171:3001/View/${serialNumber}/${name}/${model}/${warranty}/${dealer}`;
    QRCode.toCanvas(canvas, url).then(function () {
      Swal.fire({
        title: "QR Code",
        // icon: "success",
        html: '<canvas id="QRCodeCanvasPopup" style="display:block; margin:auto;"></canvas>',
        width: 350, // set a fixed width for the dialog
        heightAuto: false, // disable auto height
        customClass: {
          container: "qr-popup", // add a custom class to the container
        },
        scrollbarPadding: false, // disable scrollbar padding
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Download",
        cancelButtonText: "View",
        didOpen: function () {
          var popupCanvas = document.getElementById("QRCodeCanvasPopup");
          var ratio = 1; // adjust the size ratio of the QR code
          var size =
            Math.min(popupCanvas.offsetWidth, popupCanvas.offsetHeight) * ratio;
          var x = (popupCanvas.offsetWidth - size) / 2;
          var y = (popupCanvas.offsetHeight - size) / 2;
          popupCanvas.getContext("2d").drawImage(canvas, x, y, size, size);
          document.body.style.overflowX = "hidden";
        },
      }).then(function (result) {
        if (result.isConfirmed) {
          var dataURL = canvas.toDataURL();
          var link = document.createElement("a");
          // link.download = "qr-code.png";
          link.download = serialNumber + ".png";
          link.href = dataURL;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          // } else if (result.dismiss === Swal.DismissReason.cancel) {
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Check if customerName is empty or undefined
          if (!customerName) {
            // Assign a default value
            customerName = "NA";
          }

          // Check if customerEmail is empty or undefined
          if (!customerEmail) {
            // Assign a default value
            customerEmail = "NA";
          }

          // Check if salesDate is empty or undefined
          if (!salesDate) {
            // Assign a default value
            salesDate = "NA";
          }
          window.open(`/View/${serialNumber}`, "_blank");

          // window.location.href = `/View/${serialNumber}/${name}/${model}/${warranty}/${dealer}/${customerName}/${customerEmail}/${salesDate}`;
          // window.location.href = `/View/${serialNumber}/${name}/${model}/${warranty}/${dealer}`;
        }
      });
    });
  }
  // console.log(ViewProduct);

  function handleAddCustomerClick(serialNumber, warranty) {
    navigate(`/DealerLand/Stock/AddCustomer/${serialNumber}/${warranty}`);
  }
  // console.log(handleAddCustomerClick);

  const filteredstockData = stockData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredstockData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = stockData
    ? Math.ceil(filteredstockData.length / itemsPerPage)
    : 0;

  const handleNextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  return (
    <div>
      {/* <header className="head12">
        <Dealertop />
      </header> */}
      <br />
      <br />

      <h1 style={{ fontfamily: "Axiforma" }} className="titleh">
        Assigned Stocks
      </h1>
      <div class="search__container">
        <input
          class="search__input"
          type="text"
          placeholder="Search Product"
          value={searchQuery}
          style={{ color: "black" }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <br />
      <br />
      <div className="sd1">
        <h6 className="sd2">
          <strong>
            <ul>
              <li
                class="no-margin-top"
                style={{ fontFamily: "Axiforma", color: "black" }}>
                Stocks Assigned For You
              </li>
            </ul>
          </strong>
        </h6>
        <div class="table-conta">
          <table class="tableStock">
            <thead style={{ fontFamily: "Axiforma" }}>
              <tr>
                <th>Product Name</th>
                <th>Model Name</th>
                <th>Serial Number</th>
                <th>Status</th>
                <th>Warranty</th>
                <th>Customer Sales</th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: "Helvetica Now" }}>
              {loading ? (
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              ) : filteredstockData.length === 0 ? (
                <tr>
                  <td colSpan="4">
                    No Stocks Available or Connect Your Wallet
                  </td>
                </tr>
              ) : (
                currentItems.map((product, index) => (
                  <tr key={index}>
                    <td>{product[0]}</td>
                    <td>{product[1]}</td>
                    <td>{product[3]}</td>
                    {/* <td>{product[4]}</td> */}
                    <td>{product[5] ? "Sold" : "Available"}</td>
                    <td>
                      <button
                        className="view-mod"
                        onClick={() =>
                          ViewProduct(
                            product[0],
                            product[1],
                            product[2],
                            product[3],
                            product[4],
                            product[6],
                            product[7],
                            product[8]
                          )
                        }>
                        View
                      </button>
                    </td>
                    <td>
                      {/* <button
                        className="Edit-mod"
                        onClick={() =>
                          handleAddCustomerClick(product[3], product[4])
                        }
                      >
                        Sales
                      </button> */}
                      <button
                        className="Edit-mod"
                        onClick={() =>
                          handleAddCustomerClick(product[3], product[4])
                        }
                        disabled={product[5]}>
                        Sales
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <br />
          <br />
          <div className="pagination-container1">
            <button
              className="pagination-button1"
              onClick={handlePrevPage}
              disabled={currentPage === 1}>
              &#x276e; Prev
            </button>
            <span className="pagetext1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button2"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}>
              Next &#x276f;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockDetails;
