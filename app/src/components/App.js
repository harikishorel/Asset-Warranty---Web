import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import Landing from "./Pages/LandingPages/Landing";
import LoginPage from "./Pages/LoginPage/Login";
import ManufactureLand from "./Pages/LandingPages/ManufactureLand";
import Product from "./Pages/Product/Product";
import AddProduct from "./Pages/Product/Addproduct";
import DealersPage from "./Pages/Dealer/DealersPage";
import AddDealer from "./Pages/Dealer/AddDealer";
import Stock from "./Pages/Stock/Stock";
import CreateModal from "./Pages/Modal/CreateModal";
import Modalpage from "./Pages/Modal/ModalPage";
import CustomerView from "./CustomerPage/CustomerView";
import StockDetails from "./DealersPage/StockDetails";
import AddCust from "./DealersPage/AddCust";
import Dealerprofile from "./DealersPage/Dealerprofile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { abi } from "../artifacts/contracts/StockContract.sol/StockContract.json";
import { StockContract as address } from "../output.json";
import { ethers } from "ethers";
import DealerLand from "./Pages/LandingPages/DealerLand";
import CreateStock from "./Pages/Stock/CreateStock";
import Adminpage from "./AdminPage/Adminpage";
import SendToken from "./Responsive Header/SendToken";
import ResHead from "./Responsive Header/ResHead";
import DealHead from "./Responsive Header/DealHead";
import AdminLogin from "./AdminPage/AdminLogin/AdminLogin";
import Loader from "./Repeated/Loader";

const {
  getWeb3Modal,
  createWeb3Provider,
  connectWallet,
  EthereumContext,
  createContractInstance,
  log,
} = require("react-solidity-xdc3");
var connectOptions = {
  rpcObj: {
    50: "https://erpc.xinfin.network",
    51: "https://erpc.apothem.network",
    888: "http://13.234.98.154:8546",
  },
  network: "mainnet",
  toDisableInjectedProvider: true,
};

const App = () => {
  const [ethereumContext, setethereumContext] = useState({});
  const [connecting, setconnecting] = useState(false);
  const [connected, setConnected] = useState(false); // add new state variable

  const web3Modal = getWeb3Modal(connectOptions);
  const location = useLocation();

  useEffect(() => {
    const connectToEthereum = async () => {
      const instance = await web3Modal.connect();
      const { provider, signer } = await createWeb3Provider(instance);
      const stockcontract = await createContractInstance(
        address,
        abi,
        provider
      );
      const account = signer.getAddress();
      setethereumContext({ provider, account, stockcontract });
      log("Connect", "Get Address", await signer.getAddress());
      // console.log("Stockcontract::::::", stockcontract);
      setConnected(true);
      setconnecting(true);
    };

    connectToEthereum();
  }, []); // Call only once when the component mounts

  const connect = async (event) => {
    event.preventDefault();
    const instance = await web3Modal.connect();
    const { provider, signer } = await createWeb3Provider(instance);
    const account = await signer.getAddress();
    setethereumContext({ provider, account });
    // console.log("Connected to account:", account);
    setConnected(true);
    setconnecting(true);
    window.location.reload();
  };

  const showMtopbar =
    location.pathname !== "/LoginPage" &&
    location.pathname !== "/View" &&
    !location.pathname.startsWith("/View/") &&
    location.pathname !== "/DealerLand/Stock" &&
    !location.pathname.startsWith("/DealerLand/Stock/AddCustomer/") &&
    location.pathname !== "/DealerLand/Profile" &&
    location.pathname !== "/DealerLand" &&
    location.pathname !== "/DealerLand/Stock/AddCustomer" &&
    location.pathname !== "/" &&
    location.pathname !== "/ManufactureLand/Product/Addproduct" &&
    location.pathname !== "/ManufactureLand/ModelPage/AddModel" &&
    location.pathname !== "/ManufactureLand/dealers/AddDealer" &&
    location.pathname !== "/ManufactureLand/Stock/AddStock" &&
    location.pathname !== "/admin" &&
    location.pathname !== "/AdminLogin";

  const showDbar =
    location.pathname.startsWith("/DealerLand") &&
    location.pathname !== "/DealerLand/Stock/AddCustomer" &&
    !location.pathname.startsWith("/DealerLand/Stock/AddCustomer/") &&
    location.pathname !== "/DealerLand/Profile";
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/View" element={<CustomerView />} />
        <Route path="/View/:serialNumber" element={<CustomerView />} />
      </Routes>
      {showMtopbar && <ResHead connect={connect} />} {/* pass connected prop */}
      {showDbar && <DealHead connect={connect} />}
      <section className="App-content">
        <EthereumContext.Provider value={ethereumContext}>
          <Routes>
            <Route path="/ManufactureLand" element={<ManufactureLand />} />
            <Route path="/ManufactureLand/Product" element={<Product />} />
            <Route
              path="/ManufactureLand/Product/Addproduct"
              element={<AddProduct />}
            />
            <Route path="/ManufactureLand/dealers" element={<DealersPage />} />
            <Route
              path="/ManufactureLand/dealers/AddDealer"
              element={<AddDealer />}
            />
            <Route path="/ManufactureLand/ModelPage" element={<Modalpage />} />
            <Route
              path="/ManufactureLand/ModelPage/AddModel"
              element={<CreateModal />}
            />
            <Route path="/ManufactureLand/Stock" element={<Stock />} />
            <Route
              path="/ManufactureLand/Stock/AddStock"
              element={<CreateStock />}
            />
            <Route path="/ManufactureLand/SendToken" element={<SendToken />} />

            <Route path="/DealerLand" element={<DealerLand />} />
            <Route path="/DealerLand/Stock" element={<StockDetails />} />
            <Route path="/DealerLand/Profile" element={<Dealerprofile />} />
            <Route
              path="/DealerLand/Stock/AddCustomer/:serialNumber/:warranty"
              element={<AddCust />}
            />
            {/* <Route
              path="/DealerLand/Stock/AddCustomer/"
              element={<AddCust />}
            /> */}
            {/* <Route
              path="/View/:serialNumber/:name/:model/:warranty/:dealer"
              element={<CustomerView />}
            /> */}
            {/* <Route
              path="/View/:serialNumber/:name/:model/:warranty/:dealer/:customerName/:customerEmail/:salesDate"
              element={<CustomerView />}
            /> */}
            <Route path="/admin" element={<Adminpage />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />

            <Route path="/send" element={<SendToken />} />
            <Route path="/logo" element={<Loader />} />
          </Routes>
        </EthereumContext.Provider>
      </section>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
};

export default App;
