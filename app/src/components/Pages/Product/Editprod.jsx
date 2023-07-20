import React, { useState } from "react";
import "./Editprod.css";
import axios from "../../Repeated/axios";
import "../../Repeated/font2.css";
import "../../Repeated/font.css";
import Swal from "sweetalert2";

function Editprod({ product, onClose }) {
  const [productName, setProductName] = useState(product.productName);
  const [productDes, setProductDes] = useState(product.productDes);
  const [status, setStatus] = useState(!!product.status);
  const Error = Swal.mixin({
    toast: true,
    position: "top-end",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/editProduct/${product._id}`, {
        productName,
        productDes,
        status,
      });
      //     onClose();
      //   } catch (e) {
      //     console.error(e);
      //   }
      // };
      Error.fire({
        title: "Product Saved Successfully",
        icon: "success",
        // confirmButtonText: "OK",
        // cancelButtonText: "Close",
        // showCancelButton: true,
        // showConfirmButton: false,
        // showCloseButton: true,
      }).then(() => {
        window.location.reload(); // reload the current page
      });

      onClose();
    } catch (e) {
      Error.fire({
        text: "Update the details correctly",
        icon: "error",
        cancelButtonText: "Close",
        showCancelButton: true,
        showConfirmButton: false,
      });
      console.log(e);
    }
  };

  return (
    <div>
      <br />
      <div>
        <h2 className="title-prod" style={{ fontFamily: "Axiforma" }}>
          Edit Product
        </h2>
        <form className="form-product" style={{ fontFamily: "Helvetica Now" }}>
          <label
            className="labelform"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text">
            Product Name
          </label>
          <input
            className="edit-input"
            id="product_id"
            name="product_id"
            placeholder="Name"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <br />
          <label
            className="labelform"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text">
            Product Description
          </label>
          <textarea
            className="edit-input"
            id="product_name"
            name="product_name"
            placeholder="Description"
            type="textarea"
            value={productDes}
            onChange={(e) => setProductDes(e.target.value)}
          />
          <div className="wrapper">
            <input
              type="radio"
              name="status"
              id="active"
              value="true"
              checked={status === true}
              onChange={() => setStatus(true)}
            />
            <label className="option" htmlFor="active">
              <div className="dot"></div>
              <span>Active</span>
            </label>
            <input
              type="radio"
              name="status"
              id="inactive"
              value="false"
              checked={status === false}
              onChange={() => setStatus(false)}
            />
            <label className="option" htmlFor="inactive">
              <div className="dot"></div>
              <span>Inactive</span>
            </label>
          </div>

          <button
            // id="product-save"
            // name="product-save"
            className="product-save"
            onClick={handleSave}>
            Save
          </button>
          <br />
          <button
            // id="product-close"
            // name="product-close"
            className="product-close"
            onClick={onClose}>
            Close
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}

export default Editprod;
