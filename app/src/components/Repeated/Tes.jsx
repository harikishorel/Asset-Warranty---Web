import Carousel from "react-bootstrap/Carousel";
import React from "react";
import "./Tes.css";

function Tes() {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <div className="v4">
          <br />
          <div className="v3">
            <img
              className="v1"
              src="https://www.linkpicture.com/q/blockchain-icon-4.png"
              alt=""
            />
            <li className="v2" style={{ fontFamily: "Axiforma" }}>
              <h4>
                <strong style={{ opacity: "1.0" }}>BLOCKCHAIN</strong>
              </h4>
              {/* Blockchain ensures the authenticity and integrity of asset
              warranty information by creating a secure and transparent ledger
              that is decentralized and difficult to tamper with. It streamlines
              the claims process and reduces the risk of fraud, making the
              warranty system more trustworthy. */}
              Blockchain guarantees the authenticity and truthfulness of an
              asset. By establishing a safe and open ledger, you can record
              warranty information which is decentralised and challenging to
              manipulate. It simplifies claims procedure and lowers the
              possibility of fraud, making the guarantee system more reliable
            </li>
          </div>
          <br />
        </div>
        <br />
        <br />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div className="v4">
          <br />
          <div className="v3">
            <img
              className="v11"
              src="https://www.linkpicture.com/q/decentralization-decentralized-structure-icon-vector-removebg-preview-1.png"
              alt=""
            />
            <li className="v2" style={{ fontFamily: "Axiforma" }}>
              <h4>
                <strong style={{ opacity: "1.0" }}>DECENTRALIZATION</strong>
              </h4>
              Decentralised asset warranty uses blockchain to store warranty
              information in a tamper-proof and transparent way. Claims are
              automatically verified and executed by the network, making the
              process more efficient, secure, and trustworthy.
            </li>
          </div>
          <br />
        </div>
        <br />
        <br />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div className="v4">
          <br />
          <div className="v3">
            <img
              className="v12"
              src="https://www.linkpicture.com/q/Screenshot_2023-03-21_130313-removebg-preview.png"
              alt=""
            />
            <li className="v2" style={{ fontFamily: "Axiforma" }}>
              <h4>
                <strong style={{ opacity: "1.0" }}>SECURED</strong>
              </h4>
              {/* Security in asset warranty ensures that the warranty is valid and
              the asset is protected from unauthorized access or damage. This
              includes product authentication, access control, data protection,
              and other measures to ensure the authenticity of the product and
              protect personal information. */}
              Security in an asset warranty ensures that the warranty is valid
              and The asset is protected from unauthorised access or damage.
              This includes product authentication, access control, data
              protection, and other measures to ensure the authenticity of the
              product and protect personal information.
            </li>
          </div>
          <br />
        </div>
        <br />
        <br />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div className="v4">
          <br />
          <div className="v3">
            <img
              className="v13"
              src="https://i.ibb.co/42Q1Ckb/Trust-1-removebg-preview.png"
              alt=""
            />
            <li className="v2" style={{ fontFamily: "Axiforma" }}>
              <h4>
                <strong style={{ opacity: "1.0" }}>TRUST</strong>
              </h4>
              {/* Trust in blockchain is based on its inherent security and
              transparency through decentralized consensus mechanisms and
              cryptography. Transactions are verified by a network of nodes,
              eliminating the need for trust in a central authority.
              Transparency allows all parties to view and verify transactions,
              reducing the need for trust between them. */}
              Trust in blockchain is based on its inherent security and
              transparency through decentralised consensus mechanisms and
              cryptography. Transactions are verified by a network of nodes,
              eliminating the need for trust in a central authority.
              Transparency allows all parties to view and verify transactions,
              reducing the need for trust between them.
            </li>
          </div>
          <br />
        </div>
        <br />
        <br />
      </Carousel.Item>
    </Carousel>
  );
}

export default Tes;
