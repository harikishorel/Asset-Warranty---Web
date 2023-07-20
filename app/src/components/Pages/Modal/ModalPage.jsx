import React, { useEffect, useState } from "react";
import axios from "../../Repeated/axios";
import "../../Repeated/font2.css";
import { useNavigate } from "react-router-dom";
import "./ModalPage.css";
import { Modal, ModalBody } from "react-bootstrap";
import EditModal from "./EditModal";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";

function Modalpage() {
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);
  // console.log(token);
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
  const [showEditMod, setShowEditMod] = useState(false);
  const [selectedModal, setSelectedModal] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [warranty, setWarranty] = useState("");
  // console.log("warranties:", warranty);
  const handleEdit = (model) => {
    setSelectedModal({
      ...model,
      status: model.status ? "Active" : "Inactive",
    });
    setShowEditMod(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/ModalPage", {
          withCredentials: true,
        });
        setModels(response.data);
        const data = response.data;
        const warranty = data.map((obj) => obj.warranty);
        setWarranty(warranty);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };

    fetchData(); // Fetch models initially

    // Fetch models again whenever a new model is added
    if (models.length > 0) {
      fetchData();
    }
  }, [models.length]);

  const sendWarranty = async (modelId, warrantyFile) => {
    const formData = new FormData();
    formData.append("warrantyFile", warrantyFile);

    try {
      const response = await axios.post(`/warranty/${modelId}`, formData, {
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      console.log("Warranty file uploaded successfully!");
      window.open(response.data, "_blank");
    } catch (error) {
      console.error("Error uploading warranty file:", error);
    }
  };
  // sendWarranty('322e1ec6b50a7a50feb733c9c496738bf2989b75b400600f6ee7ba1ef33cb396')

  const filteredmodels = models.filter((model) =>
    model.modelName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredmodels.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = models
    ? Math.ceil(filteredmodels.length / itemsPerPage)
    : 0;

  const handleNextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  return (
    <div>
      <br />
      <br />
      <h1 style={{ fontfamily: "Axiforma" }} className="titleh">
        List of Model
      </h1>
      <div class="search__container">
        <input
          class="search__input"
          type="text"
          placeholder="Search Model"
          value={searchQuery}
          style={{ color: "black" }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <br />
      <br />

      <div className="moo1">
        <br />
        {/* <div className="moo3"> */}
        <h6 className="moo2">
          <strong>
            <ul>
              <li
                class="no-margin-top"
                style={{ color: "black", fontFamily: "Axiforma" }}>
                Upgrade your product details in model
              </li>
            </ul>
          </strong>
        </h6>

        <button
          className="add-mod"
          style={{ display: "flex", fontFamily: "Helvetica Now" }}
          onClick={() => navigate("/ManufactureLand/ModelPage/AddModel")}>
          Add Model
        </button>

        <div>
          <div class="ta1ble-container">
            <table class="ta1ble">
              <thead style={{ fontFamily: "Axiforma" }}>
                <tr>
                  <th>Product Name</th>
                  <th>Model Name</th>
                  <th>Status</th>
                  <th>Warranty</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: "Helvetica Now" }}>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="5">No Models Available</td>
                  </tr>
                ) : (
                  [...currentItems].reverse().map((model) => (
                    <tr key={model._id}>
                      <td>{model.product?.productName}</td>
                      <td>{model.modelName}</td>
                      <td>{model.status ? "Active" : "Inactive"}</td>
                      <td>
                        <button
                          className="view-mod"
                          onClick={() => sendWarranty(model._id, warranty)}>
                          View
                        </button>
                      </td>
                      <td>
                        <button
                          className="Edit-mod"
                          onClick={() => handleEdit(model)}>
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
      <Modal show={showEditMod} onHide={() => setShowEditMod(false)}>
        <ModalBody>
          <EditModal
            model={selectedModal}
            onClose={() => setShowEditMod(false)}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Modalpage;
