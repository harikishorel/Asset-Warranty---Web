import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "../../Repeated/axios";
import "../../Repeated/font2.css";
import "../../Repeated/font.css";
import "./Adddproduct.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

function AddProduct() {
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);
  // console.log(token);
  // console.log(cookies.manu_sessionId);

  const navigate = useNavigate();
  const history = useNavigate();
  const [productName, setProductName] = useState("");
  const [productDes, setProductDes] = useState("");
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });

  const addproduct = (e) => {
    e.preventDefault();

    const manufacturerEmail = token.email;
    // console.log(manufacturerEmail);

    axios
      .post(
        "/ManufactureLand/Product/Addproduct",
        {
          productName,
          productDes,
          manufacturerEmail,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.message === "success") {
          Swal.fire({
            title: "Product Saved Successfully",
            icon: "success",
            confirmButtonText: "OK",
            cancelButtonText: "Close",
            showCancelButton: true,
            showCloseButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              history("/ManufactureLand/Product");
            }
          });
        }
        setProductName("");
        setProductDes("");
      })
      .catch((e) => {
        Toast.fire({
          text: "Please add the details correctly",
          icon: "error",
          cancelButtonText: "Close",
          showCancelButton: true,
          showConfirmButton: false,
        });
        console.log(e);
      });
  };

  return (
    <div className="add-prod-img">
      <br />
      {/* <h1
        className="head"
        style={{ fontFamily: "Axiforma", cursor: "pointer" }}
        onClick={() => navigate("/ManufactureLand")}
      >
        Asset Warranty
      </h1> */}

      <div className="AD">
        <button
          className="backButon"
          onClick={() => navigate("/ManufactureLand/Product")}>
          <svg
            height="36"
            width="36"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024">
            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
          </svg>
          {/* <span>Back</span> */}
        </button>
        <h1
          className="backhead"
          style={{
            fontFamily: "Axiforma",
            cursor: "pointer",
            marginLeft: "-30px",
          }}>
          Asset Warranty
        </h1>
      </div>
      <br />

      <br />
      <br />

      <div className="Add-list" style={{ fontFamily: "Helvetica Now" }}>
        {/* <form class="form-horizontal"> */}
        <br />
        <h2 className="p1" style={{ fontFamily: "Axiforma" }}>
          Add Product
        </h2>
        <br />
        <form className="proform" onSubmit={addproduct}>
          <label
            className="label-text"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text">
            Product Name
          </label>
          <input
            required
            className="p2"
            name="product_id"
            placeholder="Name"
            type="text"
            style={{ fontFamily: "Helvetica Now" }}
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
          />

          {/* <div className="add2"> */}
          <label
            className="label-text"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text">
            Product Description
          </label>
          <textarea
            required
            className="p2"
            name="product_name"
            placeholder="Description"
            type="textarea"
            style={{ fontFamily: "Helvetica Now" }}
            onChange={(e) => setProductDes(e.target.value)}
            value={productDes}
          />
          {/* </div> */}
          <br />
          <button
            className="btP"
            type="submit"
            // onClick={addproduct}
          >
            Add product
          </button>
          <br />
        </form>
        {/* </form> */}
        {/* <div className="head2" style={{ fontFamily: "Axiforma" }}>
          Copyright &copy; 2023 | Asset Warranty
        </div> */}
      </div>
      {/* <br />
      <br />
      <br /> */}
      <div className="copy" style={{ fontFamily: "Axiforma", color: "black" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
      {/* <div className="headlogin" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div> */}
    </div>
  );
}

export default AddProduct;
