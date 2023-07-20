import React, { useEffect, useState } from "react";
import axios from "../../Repeated/axios";
import Editprod from "./Editprod";
import "../../Repeated/font2.css";
import "../../Repeated/font.css";
import { useNavigate } from "react-router-dom";
import "./Product.css";
import { Modal, ModalBody } from "react-bootstrap";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";

function Product() {
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);
  // console.log(token);
  const navigate = useNavigate();
  const [showEditProd, setShowEditProd] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleEdit = (product) => {
    setSelectedProduct({
      ...product,
      status: product.status ? "Active" : "Inactive",
    });
    setShowEditProd(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/editproduct?sort=-createdAt", {
          withCredentials: true,
        });
        setProducts(response.data.data.reverse()); // Reverse the products array to display the newly added product at the top
      } catch (error) {
        console.log("error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = products
    ? Math.ceil(filteredProducts.length / itemsPerPage)
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
      <h1 style={{ fontFamily: "Axiforma" }} className="titleh">
        List of Products
      </h1>
      <div className="search__container">
        <input
          className="search__input"
          type="text"
          placeholder="Search Product"
          value={searchQuery}
          style={{ color: "black" }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <br />
      <br />

      <div className="pro1">
        <br />

        <h6 className="pro2">
          <strong>
            <ul>
              <li
                className="no-margin-top"
                style={{ color: "black", fontFamily: "Axiforma" }}>
                Add your Product
              </li>
            </ul>
          </strong>
        </h6>

        <button
          className="add-product"
          style={{ display: "flex", fontFamily: "Helvetica Now" }}
          onClick={() => navigate("/ManufactureLand/Product/Addproduct")}>
          Add Product
        </button>

        <div className="table-containeerr">
          <table className="tableerr">
            <thead style={{ fontFamily: "Axiforma" }}>
              <tr>
                <th>Product</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: "Helvetica Now" }}>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="3">No Products Available</td>
                </tr>
              ) : (
                currentItems.map((product) => (
                  <tr key={product._id}>
                    <td>{product.productName}</td>
                    <td>{product.status ? "Active" : "Inactive"}</td>
                    <td>
                      <button
                        className="Edit-btn"
                        onClick={() => handleEdit(product)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div
            className="pagination-container1"
            style={{ fontFamily: "Helvetica Now" }}>
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
      <Modal show={showEditProd} onHide={() => setShowEditProd(false)}>
        <ModalBody>
          <Editprod
            product={selectedProduct}
            onClose={() => setShowEditProd(false)}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Product;
