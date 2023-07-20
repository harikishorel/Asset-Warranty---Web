import React, { useState, useEffect } from "react";
import axios from "../../Repeated/axios";
import "../../Repeated/font2.css";
import "../../Repeated/font.css";
import "./CreateModal.css";
import { Dropdown } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";

const CreateModal = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);
  // console.log(token);
  const history = useNavigate();
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState("");

  const [modelName, setModelName] = useState("");
  const [modelDes, setModelDescription] = useState("");
  const [warranty, setWarranty] = useState("");
  // console.log(warranty);
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProductId(product.productName);
  };

  const handleModelNameChange = (e) => {
    setModelName(e.target.value);
  };

  const handleModelDescriptionChange = (e) => {
    setModelDescription(e.target.value);
  };

  // const handleAddModel = (e) => {
  //   e.preventDefault();
  //   axios
  //     .patch(`/AddModal/${selectedProduct.productName}`, {
  //       modelName: modelName,
  //       modelDes: modelDes,
  //       warranty: warranty,
  //     })
  //     .then((res) => {
  //       if (res.data.message === "success") {
  //         Swal.fire({
  //           title: "Model Saved Successfully",
  //           icon: "success",
  //           confirmButtonText: "OK",
  //           cancelButtonText: "Close",
  //           showCancelButton: true,
  //           showCloseButton: true,
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             history("/ManufactureLand/ModelPage");
  //           }
  //         });
  //       }
  //       setSelectedProduct(null);
  //       setModelName("");
  //       setModelDescription("");
  //       setWarranty("");
  //     })
  //     .catch((e) => {
  //       Toast.fire({
  //         text: "Please add the details correctly",
  //         icon: "error",
  //         cancelButtonText: "Close",
  //         showCancelButton: true,
  //         showConfirmButton: false,
  //       });
  //       console.log(e);
  //     });
  // };

  const [products, setProducts] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get("/AddModal", { withCredentials: true });
      setProducts(data);
    };
    fetchdata();
  }, []);
  // function handleUpload(event) {
  //   event.preventDefault();

  //   // Get the uploaded file
  //   const fileInput = document.querySelector('input[name="warranty"]');
  //   const file = fileInput.files[0];

  //   // Create a FormData object and append the file to it
  //   const formData = new FormData();
  //   formData.append("warrantyFile", file);

  //   // Send the file to the API endpoint using Axios
  //   axios
  //     .post("/upload", formData)
  //     .then((response) => {
  //       console.log("File upload successful:", response.data);
  //       // TODO: Do something with the response, like display a success message
  //       const warranty = `${response.data.fileHash}.${response.data.fileName}`;
  //       setWarranty(warranty);
  //     })
  //     .catch((error) => {
  //       console.error("File upload failed:", error);
  //       // TODO: Do something with the error, like display an error message
  //     });
  // }
  const sendWarranty = async (fileName) => {
    const formData = new FormData();
    formData.append("warrantyFile", fileName);

    try {
      const response = await axios.post("/api/upload-warranty", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Warranty file uploaded successfully!");
    } catch (error) {
      console.error("Error uploading warranty file:", error);
    }
  };
  // Define a new function to handle the form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Get the uploaded file
      const fileInput = document.querySelector('input[name="warranty"]');
      const file = fileInput.files[0];

      // Create a FormData object and append the file to it
      const formData = new FormData();
      formData.append("warrantyFile", file);

      // Send the file to the API endpoint using Axios
      const uploadResponse = await axios.post("/upload", formData);
      // console.log("File upload successful:", uploadResponse.data);

      // Get the warranty value from the response
      const warranty = `${uploadResponse.data.fileHash}.${uploadResponse.data.fileName}`;

      // Send the model details to the API endpoint using Axios
      const addModelResponse = await axios.patch(
        `/AddModal/${selectedProduct.productName}`,
        {
          modelName: modelName,
          modelDes: modelDes,
          warranty: warranty,
        }
      );

      // console.log("Model added successfully:", addModelResponse.data);

      // Show a success message
      Swal.fire({
        title: "Model Saved Successfully",
        icon: "success",
        confirmButtonText: "OK",
        cancelButtonText: "Close",
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          history("/ManufactureLand/ModelPage");
        }
      });

      // Clear the form values
      setSelectedProduct(null);
      setModelName("");
      setModelDescription("");
      setWarranty("");
    } catch (error) {
      // Show an error message if either function fails
      Toast.fire({
        text: "Please add the details correctly",
        icon: "error",
        cancelButtonText: "Close",
        showCancelButton: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="add-prod-img">
      <br />
      <div className="AD">
        <button
          className="backButon"
          onClick={() => navigate("/ManufactureLand/ModelPage")}>
          <svg
            height="36"
            width="36"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024">
            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
          </svg>
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

      <div className="Add-list">
        <br />
        <h2 className="model-head" style={{ fontFamily: "Axiforma" }}>
          Add a Model
        </h2>
        {/* <form className="modal-form" > */}

        <form
          className="modal-form"
          // onSubmit={(event) => {
          //   handleAddModel(event);
          //   handleUpload(event);
          // }}
          onSubmit={handleFormSubmit}>
          <label
            className="modlabel"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text">
            Product Name
          </label>
          <div>
            <Dropdown
              className="dropdown-model"
              style={{ fontFamily: "Helvetica Now" }}>
              <Dropdown.Toggle variant="secondary">
                {selectedProduct
                  ? selectedProduct.productName
                  : "Select Product"}
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                {products &&
                  products.data
                    .filter((product) => product.status)
                    .map((product) => (
                      <Dropdown.Item
                        key={product._id}
                        active={selectedProduct === product}
                        onClick={() => handleSelectProduct(product)}>
                        {product.productName}
                      </Dropdown.Item>
                    ))}
                {products &&
                  products.data.filter((product) => product.status).length ===
                    0 && (
                    <Dropdown.Item disabled>No Active Products</Dropdown.Item>
                  )}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <label
            className="modlabel"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text">
            Model Name
          </label>
          <input
            required
            className="inputfield"
            name="model_id"
            placeholder="Name"
            type="text"
            style={{ fontFamily: "Helvetica Now" }}
            value={modelName}
            onChange={handleModelNameChange}
          />
          <label
            className="modlabel"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text">
            Model Description
          </label>
          <textarea
            required
            className="inputfield"
            name="description_name"
            placeholder="Description"
            type="text"
            style={{ fontFamily: "Helvetica Now" }}
            value={modelDes}
            onChange={handleModelDescriptionChange}
          />
          <label
            className="modlabel"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text">
            Warranty File
          </label>
          <input
            required
            type="file"
            className="inputfield"
            name="warranty"
            style={{ fontFamily: "Helvetica Now" }}
            // onChange={(event) => {
            //   // setFileUpload(event.target.files[0]);
            //   // handleFileChange(event);
            //   // handleWarranty(event);
            // }}
          />
          <br />
          <button
            id="singlebutton"
            name="singlebutton"
            className="btM"
            style={{ fontFamily: "Axiforma" }}>
            Add Model
          </button>

          <br />
        </form>
      </div>
      <div
        className="headlogin"
        style={{
          fontFamily: "Axiforma",
          backgroundColor: "transparent",
          paddingTop: "20px",
          marginBottom: "-100px",
        }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
    </div>
  );
};

export default CreateModal;
