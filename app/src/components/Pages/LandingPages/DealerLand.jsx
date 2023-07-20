import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DealerLand.css";
import "../../Repeated/font2.css";
import "../../Repeated/font.css";
import Bottom from "../../Repeated/Bottom";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";

function DealerLand() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["deal_sessionId"]);
  const token = jwtDecode(cookies.deal_sessionId);
  // console.log(token);

  useEffect(() => {
    function handleScrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    const button = document.querySelector(".up");
    button.addEventListener("click", handleScrollToTop);
    return () => {
      button.removeEventListener("click", handleScrollToTop);
    };
  }, []);

  const rows = document.querySelectorAll(".twop > div");

  rows.forEach((row) => {
    row.addEventListener("click", () => {
      row.classList.toggle("animate");
    });
  });

  return (
    <div>
      {/* <header className="head12">
        <Dealertop />
      </header> */}

      <div className="topc">
        <div
          className="coxtn"
          style={{ fontFamily: "Axiforma", paddingBottom: "70px" }}>
          <h1 style={{ color: "red", fontSize: "45px" }}>Assign and manage</h1>

          <h2 style={{ fontSize: "30px", fontFamily: "Axiforma" }}>
            your products here
          </h2>
          <br />
          <h2
            style={{
              fontSize: "17px",
              color: "grey",
              width: "400px",
              fontFamily: "Helvetica Now",
            }}>
            By developing a comprehensive warranty strategy, understanding
            warranty terms and conditions, and handling warranty claims
            efficiently, manufacturers and dealers can provide customers with
            high-quality products and services and maintain customer
            satisfaction.
            {/* Developing a comprehensive warranty strategy, understanding warranty
            terms and conditions, and handling warranty claims efficiently,
            manufacturers and dealers can provide customers with high-quality
            products and services and maintain customer satisfaction.
           */}
          </h2>
        </div>
        <div className="img-lod">
          <img
            className="img11"
            src="https://timebusinessnews.com/wp-content/uploads/CriticalAssetTracking-1600x945-01-1-800x445.jpg"></img>
        </div>
      </div>
      <div className="twop" style={{ fontFamily: "Helvetica Now" }}>
        <div className="row1">
          <br />
          <div className="logo">
            <img
              src="https://www.linkpicture.com/q/manufacturer.png"
              type="image"
              alt="Logo 1"
            />
          </div>
          <h2
            style={{
              fontSize: "25px",
              fontWeight: "600",
              fontFamily: "Axiforma",
            }}>
            MANUFACTURER
          </h2>
          <br />
          <h2 style={{ fontSize: "15px", fontWeight: "400" }}>
            {/* Manufacturers are responsible for adding products to their inventory
            and managing dealer allocations by efficiently assigning available
            stock to authorized dealers, ensuring a streamlined distribution
            process. */}
            Manufacturers are responsible for adding products to their inventory
            and managing dealer allocations by efficiently assigning available
            stock to authorised dealers, ensuring a streamlined distribution
            process.
          </h2>
          <br />
        </div>
        <div className="row2">
          <br />
          <div className="logo">
            <img
              src="https://www.linkpicture.com/q/broker.png"
              type="image"
              alt="Logo 2"
            />
          </div>

          <h2
            style={{
              fontSize: "25px",
              fontWeight: "600",
              fontFamily: "Axiforma",
            }}>
            DEALER
          </h2>
          <br />
          <h2 style={{ fontSize: "15px", fontWeight: "400" }}>
            {/* Authorized dealers are responsible for managing their allocated
            stock, maintaining accurate inventory counts, and facilitating sales
            transactions to ensure optimal product availability and customer
            satisfaction. */}
            Authorised dealers are responsible for managing their allocated
            stock, maintaining accurate inventory counts, and facilitating sales
            transactions to ensure optimal product availability and customer
            satisfaction.
          </h2>
          <br />
        </div>
        <div className="row3">
          <br />
          <div className="logo">
            <img
              src="https://www.linkpicture.com/q/customer_3.png"
              type="image"
              alt="Logo 3"
            />
          </div>

          <h2
            style={{
              fontSize: "25px",
              fontWeight: "600",
              fontFamily: "Axiforma",
            }}>
            CUSTOMER
          </h2>
          <br />
          <h2 style={{ fontSize: "15px", fontWeight: "400" }}>
            {/* Customers can access product details and warranty information by
            scanning the QR code, which enables quick and convenient access to
            essential information, enhancing the overall customer experience.
           */}
            Customers can access product details and warranty information by
            scanning the QR code, which enables quick and convenient access to
            essential information, enhancing the overall customer experience.
          </h2>
          <br />
        </div>
      </div>

      <div className="part3">
        <div className="floating">
          <img
            className="flow"
            src="https://www.inpixon.com/hs-fs/hubfs/website_graphics/diagrams/how-rtls-works-diagram.png?width=2411&height=1668&name=how-rtls-works-diagram.png"></img>
        </div>
        <div className="pc">
          <h2 className="t1" style={{ fontFamily: "Axiforma" }}>
            Tracking made easy
          </h2>
          <br />
          <h7
            classname="t2"
            style={{
              fontSize: "14px",
              color: "#beceda",
              fontFamily: "Helvetica Now",
            }}>
            {/* Using web 3 and blockchain technology can make tracking of assets
            and their warranty status easier and more secure. With blockchain,
            asset ownership can be recorded immutably and transparently,
            reducing fraud and errors in the warranty process. Web 3
            technologies can enable easy access to this information via
            decentralized applications, making it simpler for both consumers and
            businesses to track asset ownership and warranty claims */}
            Using Web 3 and blockchain technology can make asset tracking and
            their warranty status easier and more secure. With blockchain, Asset
            ownership can be recorded immutably and transparently, reducing
            fraud and errors in the warranty process. Web 3 Technologies can
            enable easy access to this information via decentralised
            applications, making it simpler for both consumers and businesses to
            track asset ownership and warranty claims.{" "}
          </h7>

          <br />
          <br />
          <br />
          <br />
          <br />
          <button className="up">↑</button>
        </div>
      </div>

      <div className="manu-footer">
        <Bottom />
      </div>
    </div>
  );
}

export default DealerLand;
