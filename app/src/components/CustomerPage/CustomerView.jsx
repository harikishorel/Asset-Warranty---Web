import React, { useState, useEffect } from "react";
import axios from "../Repeated/axios";
import "./CustomerView.css";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
const Web3 = require("xdc3");
const contractAbi =
  require("../../artifacts/contracts/StockContract.sol/StockContract.json").abi;

function CustomerView() {
  const { serialNumber } = useParams();

  const [productName, setProductName] = useState("");
  const [model, setModel] = useState("");
  const [dealer, setDealer] = useState("");
  const [sales, setSales] = useState("");
  const [customer, setCustomer] = useState("");
  const [num, setNum] = useState("");
  const [warranty, setWarranty] = useState("");

  const sendWarranty = async (file) => {
    const formData = new FormData();
    formData.append("warrantyFile", file);

    try {
      const response = await axios.post(`/warrantyView/${warranty}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      window.open(response.data, "_blank");
    } catch (error) {
      console.error("Error uploading warranty file:", error);
    }
  };

  useEffect(() => {
    const contractAddress = "0x78b60b155D3B5c3b34Cb56e8d084422a922385EE";

    // const provider = "https://erpc.apothem.network";
    const provider = "http://13.234.98.154:8546";

    const web3 = new Web3(new Web3.providers.HttpProvider(provider));

    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    const obj = { serialNumber };
    const serial = obj.serialNumber;
    let productName = "";
    // console.log("productname", productName);

    // console.log(serial);
    contract.methods
      .getProductBySerialNumber(serial)
      .call()
      .then((result) => {
        const productName = result[0];
        setProductName(productName);
        const model = result[1];
        setModel(model);
        const dealer = result[2];
        setDealer(dealer);
        const customer = result[5] || "NOT SOLD";
        setCustomer(customer);
        const num = result[6] || "NOT SOLD";
        setNum(num);
        const sales = result[7];
        setSales(sales);
        const warranty = result[8];
        setWarranty(warranty);
      })
      .catch((error) => {
        console.error("Error calling getproductBySerialNumber:", error);
      });
  }, []);
  // const productName = result[0];

  // const viewWarranty = async (fileName) => {
  //   const fileRef = ref(storage, `files/${fileName}`);

  //   // Extract the first part of the filename before the `_` character
  //   const shortFileName = fileName.slice(0, fileName.indexOf("_"));

  //   try {
  //     const url = await getDownloadURL(fileRef);
  //     window.open(url, "_blank");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div className="me">
      <div>
        <br />
        <div className="mer1">
          <div
            className="mer2"
            style={{ fontFamily: "Axiforma" }}
            // onClick={() => navigate("/ManufactureLand")}
          >
            Asset Warranty
          </div>
          <br></br>
          <h3 className="mer3" style={{ fontFamily: "Axiforma" }}>
            Know Your Product
          </h3>
        </div>
        <br />
        <br />

        <div
          className="mer4"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <br />
          <h5
            style={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "Axiforma",
            }}
          >
            Customer Details
          </h5>
          <br />
          <div
            className="invoiceDealer"
            style={{ fontFamily: "Helvetica Now" }}
          >
            <div>Customer Name : </div>
            <div>{customer}</div>

            <div>Phone Number : </div>
            <div>{num}</div>
          </div>
        </div>
        <br />
        <br />
        <div
          className="mer5"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <br />
          <h5
            style={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "Axiforma",
            }}
          >
            Product Details
          </h5>
          <br />
          <div className="Productdet" style={{ fontFamily: "Helvetica Now" }}>
            <div>Product Name : </div>
            <div>{productName}</div>

            <div>Model : </div>
            <div>{model}</div>

            <div>Dealer Name : </div>
            <div>{dealer}</div>

            <div>Serial No : </div>
            <div>{serialNumber}</div>

            <div>Sales Date : </div>
            <div>{sales}</div>
            {/* 
            <div>Status : </div>
            <div>{}</div> */}
          </div>
        </div>
      </div>
      <br />
      <br />
      <h6 style={{ textAlign: "center", fontFamily: "Helvetica Now" }}>
        View your Warranty file by Clicking below :
      </h6>
      <br />
      <button
        class="continue-application"
        style={{ display: "flex", justifyContent: "centre", margin: "auto" }}
        // onClick={() => viewWarranty(warranty)}
        onClick={() => sendWarranty(warranty)}
      >
        <div>
          <div class="pencil"></div>
          <div class="folder">
            <div class="top">
              <svg viewBox="0 0 24 27">
                <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
              </svg>
            </div>
            <div class="paper"></div>
          </div>
        </div>
        View My Warranty
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <div className="head2" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div> */}
      <div className="headlogin" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
    </div>
  );
}

export default CustomerView;
