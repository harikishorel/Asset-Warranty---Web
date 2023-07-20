import axios from "../../Repeated/axios.js";
import React, { useState, useEffect, useContext, useRef } from "react";
import "./CreateStock.css";
import "./AddStock.css";
import Loader from "../../Repeated/Loader.jsx";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");

function CreateStock() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });
  const [loading, setLoading] = useState(false);
  const showLoadingIndicator = () => {
    setLoading(true);
  };

  const hideLoadingIndicator = () => {
    setLoading(false);
  };

  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);
  // console.log(token);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const { provider, account, stockcontract } = useContext(EthereumContext);

  const addProduct = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const productName = selectedProduct ? selectedProduct.productName : "";
      const model = selectedModel ? selectedModel.modelName : "";
      const dealer = selectedDealer ? selectedDealer.name : "";
      const serialNumber = serialNumberRef.current.value;
      const warranty = warrantyRef.current.value;
      const amount = 1;
      const manufacture = token.email;
      const response = await executeTransaction(
        stockcontract,
        provider,
        "addProduct",
        [
          productName,
          model,
          dealer,
          serialNumber,
          warranty,
          amount,
          manufacture,
        ],
        1
      );
      log("addProduct", "hash", response.txHash);
      setLoading(false);

      if (response.txHash) {
        // Show success message
        Swal.fire({
          title: "Stock Added Successfully",
          icon: "success",
          confirmButtonText: "OK",
          cancelButtonText: "Close",
          showCancelButton: true,
          showCloseButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            showLoadingIndicator();
            navigate("/ManufactureLand/Stock");
          } else {
            window.location.reload();
          }
        });
      } else {
        // Show error message
        Toast.fire({
          text: "Please add the details correctly or Error in Transaction",
          icon: "error",
          cancelButtonText: "Close",
          showCancelButton: true,
          showConfirmButton: false,
        });
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      Toast.fire({
        text: "Transaction Failed",
        icon: "error",
        cancelButtonText: "Close",
        showCancelButton: true,
        showConfirmButton: false,
      });
    }
  };

  const fetchStock = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let serialNumber = "2";
    let response1 = await queryData(
      stockcontract,
      provider,
      "getProductBySerialNumber",
      [serialNumber]
    );
    // console.log("getProductBySerialNumber response", response1);
    setSubmitting(false);
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState("");

  const handleSelectProduct = async (product) => {
    const selectedProductId = product.productName;
    setSelectedProduct(product);
    setProductId(selectedProductId);
    try {
      const response = await axios.get(`/viewstock?productId=${product._id}`, {
        withCredentials: true,
      });

      const modelsForProduct = response.data.models
        .filter((model) => model.product === product._id)
        .filter((model) => model.status); // filter out models with status set to false
      setFilteredModels(modelsForProduct);
      setIsWarrantyDisabled(true);
    } catch (error) {
      console.error(error);
    }
  };

  const [products, setProducts] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [modelId, setModelId] = useState([]);

  const handleSelectModel = (model) => {
    const selectedModelId = model.modelName;

    setSelectedModel(model);
    setModelId(selectedModelId);
  };

  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);

  const [selectedDealer, setSelectedDealer] = useState(null);
  const [dealerId, setDealerId] = useState("");

  const handleSelectDealer = (dealer) => {
    const selectedDealerId = dealer.name;
    setSelectedDealer(dealer);
    setDealerId(selectedDealerId);
  };

  const warrantyRef = useRef("");
  const [isWarrantyDisabled, setIsWarrantyDisabled] = useState(true);

  const [dealers, setDealers] = useState([]);
  const serialNumberRef = useRef("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/viewstock", {
          withCredentials: true,
        });
        // console.log("response data", response.data);
        setProducts(response.data.products);
        setModels(response.data.models);
        setDealers(response.data.dealers);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="add-prod-img">
      <br />
      <div className="AD">
        <button
          className="backButon"
          onClick={() => navigate("/ManufactureLand/Stock")}>
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
      <div className="contstock">
        <br />
        <h2 className="model-head" style={{ fontFamily: "Axiforma" }}>
          Add a Stock
        </h2>

        <form className="login-form" onSubmit={addProduct}>
          <label
            className="modlabel"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text">
            Product
          </label>
          <Dropdown
            required
            className="dropdown-model"
            style={{ fontFamily: "Helvetica Now" }}>
            <Dropdown.Toggle variant="secondary">
              {selectedProduct ? selectedProduct.productName : "Select product"}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              {products && products.length > 0 ? (
                products
                  .filter((product) => product.status)
                  .map((product) => (
                    <Dropdown.Item
                      key={product._id}
                      active={selectedProduct === product}
                      onClick={() => handleSelectProduct(product)}>
                      {product.productName}
                    </Dropdown.Item>
                  ))
              ) : (
                <Dropdown.Item disabled>No products available</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <label
            className="modlabel"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text">
            Model
          </label>
          <Dropdown
            required
            className="dropdown-model"
            style={{ fontFamily: "Helvetica Now" }}>
            <Dropdown.Toggle variant="secondary">
              {selectedModel ? selectedModel.modelName : "Select Model"}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              {filteredModels.length > 0 ? (
                filteredModels.map((model) => (
                  <Dropdown.Item
                    key={model._id}
                    active={selectedModel === model}
                    onClick={() => handleSelectModel(model)}>
                    {model.modelName}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>No active model</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <label
            className="modlabel"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text">
            Dealer
          </label>
          <Dropdown
            required
            className="dropdown-model"
            style={{ fontFamily: "Helvetica Now" }}>
            <Dropdown.Toggle variant="secondary">
              {selectedDealer ? selectedDealer.name : "Select Dealer"}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              {dealers &&
                dealers
                  .filter((dealer) => dealer.status)
                  .map((dealer) => (
                    <Dropdown.Item
                      key={dealer._id}
                      active={selectedDealer === dealer}
                      onClick={() => handleSelectDealer(dealer)}>
                      {dealer.name}
                    </Dropdown.Item>
                  ))}
              {dealers &&
                dealers.filter((dealer) => dealer.status).length === 0 && (
                  <Dropdown.Item disabled>No active dealers</Dropdown.Item>
                )}
            </Dropdown.Menu>
          </Dropdown>
          <label
            className="modlabel"
            style={{ fontFamily: "Axiforma" }}
            htmlfor="text">
            Serial Number
          </label>
          <input
            required
            className="inputfield"
            id="outlined-required"
            name="model_id"
            placeholder="Serial Number"
            type="text"
            style={{ fontFamily: "Helvetica Now" }}
            ref={serialNumberRef}
          />
          <p className="hintMessage">
            &#8226; Special characters are not allowed.
          </p>

          <label
            className="modlabel"
            htmlFor="warranty"
            style={{ fontFamily: "Axiforma" }}>
            Warranty:
          </label>
          <input
            required
            id="warranty"
            className="inputfield"
            type="text"
            ref={warrantyRef}
            style={{ fontFamily: "Helvetica Now" }}
            value={selectedModel ? selectedModel.warranty : "Selct a Model"}
            disabled={!selectedProduct || !selectedModel || isWarrantyDisabled}
          />
          <br />
          <button
            id="singlebutton"
            style={{ fontFamily: "Axiforma" }}
            name="singlebutton"
            className="btM"
            // onClick={addProduct}
          >
            Add Stock
          </button>
        </form>
        <br />
      </div>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}>
          <Loader type="spin" />
        </div>
      )}
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
}

export default CreateStock;
