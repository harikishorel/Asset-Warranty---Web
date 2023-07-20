import React, { useState, useEffect } from "react";
import "./ATable.css";
import axios from "../Repeated/axios";

function ATable() {
  const [manufacturers, setManufacturer] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get("/admin");
      setManufacturer(data);
    };
    fetchdata();
  }, []);

  return (
    <div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Manufacturer Name</th>
              <th>Wallet Address</th>
              <th>Send Tokens</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers &&
              manufacturers.data.map((manufacturer) => (
                <tr key={manufacturer._id}>
                  <td>{manufacturer.name}</td>
                  <td>
                    <input
                      disabled
                      className="table-input"
                      type="text"
                      onfocus="this.select();"
                      onmouseup="return false;"
                      value={manufacturer.address}
                    ></input>
                  </td>
                  <td>
                    <button className="table-button">Send Tokens</button>
                  </td>
                </tr>
              ))}
          </tbody>
          {/* <tbody>
            <tr>
              <td>Cell 1</td>
              <td>
                <input
                  disabled
                  className="inputcust"
                  type="text"
                  value="asdfghjklqwertyuiopzxcvbnmqwertyuisedfrgtfrdesdfgdswdfdswe34rtgfdswe345tyhgvfcxswe34rtgvcxszaqwertyhbvcdxswerfgopsdfghjk"
                  onfocus="this.select();"
                  onmouseup="return false;"
                  style={{
                    cursor: "text",
                  }}
                ></input>
              </td>
              <td>
                <button className="table-button">Send Tokens</button>
              </td>
            </tr>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>
                <button className="table-button">Send Tokens</button>
              </td>
            </tr>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>
                <button className="Edit-mod">Send Tokens</button>
              </td>
            </tr>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>
                <button className="Edit-mod">Send Tokens</button>
              </td>
            </tr>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>
                <button className="Edit-mod">Send Tokens</button>
              </td>
            </tr>
          </tbody> */}
        </table>
      </div>
    </div>
  );
}

export default ATable;
