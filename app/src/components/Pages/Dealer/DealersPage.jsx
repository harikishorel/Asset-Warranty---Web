import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody } from "react-bootstrap";
import "./DealersPage.css";
import EditDealer from "./EditDealer";
import axios from "../../Repeated/axios";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import SendToken from "../../Responsive Header/SendToken";

function DealersPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);
  // console.log(token);
  const navigate = useNavigate();
  const [showEditDealer, setShowEditDealer] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState({});
  const [dealers, setDealers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleEdit = (dealer) => {
    setSelectedDealer({
      ...dealer,
      status: dealer.status ? "Active" : "Inactive",
    });

    // Move the selected dealer to the beginning of the array
    setDealers((prevDealers) => {
      const updatedDealers = prevDealers.filter(
        (item) => item._id !== dealer._id
      );
      return [dealer, ...updatedDealers];
    });

    setShowEditDealer(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/dealers", { withCredentials: true });
        // console.log("response data", response.data);
        const sortedDealers = [...response.data].reverse(); // Sort the dealers array in reverse order
        setDealers(sortedDealers);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const filtereddealers = dealers.filter((dealer) =>
    dealer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtereddealers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = dealers
    ? Math.ceil(filtereddealers.length / itemsPerPage)
    : 0;

  const handleNextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  return (
    <div className="bimgs">
      <br />
      <br />
      <h1 style={{ fontfamily: "Axiforma" }} className="titleh">
        List of Dealers
      </h1>
      <div class="search__container">
        <input
          class="search__input"
          type="text"
          placeholder="Search Dealer"
          value={searchQuery}
          style={{ color: "black" }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <br />
      <br />
      <div className="de1">
        <br />

        <h6 className="de2">
          <strong>
            <ul>
              <li
                class="no-margin-top"
                style={{
                  paddingright: "30px",
                  color: "black",
                  fontFamily: "Axiforma",
                }}>
                Create a Dealer to Sell the Products
              </li>
            </ul>
          </strong>
        </h6>

        <button
          className="add-dealer"
          style={{ display: "flex", fontFamily: "Helvetica Now" }}
          onClick={() => navigate("/ManufactureLand/dealers/AddDealer")}>
          Add Dealer
        </button>
        <br />
        <div>
          <div class="table-containerss">
            <table class="tabless">
              <thead style={{ fontFamily: "Axiforma" }}>
                <tr>
                  <th>Dealer Email</th>
                  <th>Dealer Name</th>
                  <th>Branch Name</th>
                  <th>Status</th>
                  <th>Edit Dealer</th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: "Helvetica Now" }}>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="5">No Dealers Available</td>
                  </tr>
                ) : (
                  currentItems.map((dealer) => (
                    <tr key={dealer._id}>
                      <td>{dealer.demail}</td>
                      <td>{dealer.name}</td>
                      <td>{dealer.branch}</td>
                      <td>{dealer.status ? "Active" : "Inactive"}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(dealer)}
                          className="Edit-btn">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="pagination-container1">
              <button
                className="pagination-button1"
                onClick={handlePrevPage}
                disabled={currentPage === 1}>
                {" "}
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
      <Modal show={showEditDealer} onHide={() => setShowEditDealer(false)}>
        <ModalBody>
          <EditDealer
            dealer={selectedDealer}
            onClose={() => setShowEditDealer(false)}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DealersPage;
