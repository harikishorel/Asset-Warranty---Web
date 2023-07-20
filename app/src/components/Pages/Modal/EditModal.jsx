import React, { useState } from "react";
import axios from "../../Repeated/axios";
import "../../Repeated/font2.css";
import Swal from "sweetalert2";

function EditModal({ model, onClose }) {
  const [modelName, setModalName] = useState(model.modelName);
  const [modelDes, setModalDes] = useState(model.modelDes);
  const [status, setStatus] = useState(!!model.status); // <-- initialize status as boolean
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/editModal/${model._id}`, {
        modelName,
        modelDes,
        status,
      });
      Toast.fire({
        title: "Model Saved Successfully",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });

      onClose();
    } catch (e) {
      Toast.fire({
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
          Edit Model
        </h2>
        <form className="form-product" style={{ fontFamily: "Helvetica Now" }}>
          <label
            className="labelform"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text"
          >
            Model Name
          </label>
          <input
            className="edit-input"
            id="product_id"
            name="product_id"
            placeholder="Name"
            type="text"
            value={modelName}
            onChange={(e) => setModalName(e.target.value)}
          />
          <br />
          <label
            className="labelform"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text"
          >
            Model Description
          </label>
          <textarea
            className="edit-input"
            id="product_name"
            name="product_name"
            placeholder="Description"
            type="textarea"
            value={modelDes}
            onChange={(e) => setModalDes(e.target.value)}
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
            id="product-save"
            name="product-save"
            className="product-save"
            onClick={handleSave}
 >
            Save
          </button>
          <br />
          <button
            id="product-close"
            name="product-close"
            className="product-close"
            onClick={onClose}
          >
            Close
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}

export default EditModal;

         
