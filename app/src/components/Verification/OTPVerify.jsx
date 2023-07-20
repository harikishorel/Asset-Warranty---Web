/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from "react";
import "./OTPVerify.css";
import { BsFillShieldLockFill } from "react-icons/bs";

function OTPVerify() {
  const inputs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length === 1 && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    } else if (e.target.value.length === 0 && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && e.target.value.length === 0 && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="otp-container">
      <form className="formotp">
        <p className="heading">Verify</p>
        <div className="otp-img">
          <BsFillShieldLockFill size={30} />
        </div>
        <div className="box">
          <input
            className="inputotp"
            type="password"
            maxLength="1"
            autoFocus
            ref={(el) => (inputs.current[0] = el)}
            onInput={(e) => handleInput(e, 0)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
          />
          <input
            className="inputotp"
            type="password"
            maxLength="1"
            ref={(el) => (inputs.current[1] = el)}
            onInput={(e) => handleInput(e, 1)}
            onKeyDown={(e) => handleKeyDown(e, 1)}
          />
          <input
            className="inputotp"
            type="password"
            maxLength="1"
            ref={(el) => (inputs.current[2] = el)}
            onInput={(e) => handleInput(e, 2)}
            onKeyDown={(e) => handleKeyDown(e, 2)}
          />
          <input
            className="inputotp"
            type="password"
            maxLength="1"
            ref={(el) => (inputs.current[3] = el)}
            onInput={(e) => handleInput(e, 3)}
            onKeyDown={(e) => handleKeyDown(e, 3)}
          />
          <input
            className="inputotp"
            type="password"
            maxLength="1"
            ref={(el) => (inputs.current[4] = el)}
            onInput={(e) => handleInput(e, 4)}
            onKeyDown={(e) => handleKeyDown(e, 4)}
          />
          <input
            className="inputotp"
            type="password"
            maxLength="1"
            ref={(el) => (inputs.current[5] = el)}
            onInput={(e) => handleInput(e, 5)}
            onKeyDown={(e) => handleKeyDown(e, 5)}
          />
        </div>
        <br />
        <br />
        <br />
        <br />
        <button
          className="btC"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          type="button"
        >
          <span>Verify</span>
        </button>
      </form>
    </div>
  );
}

export default OTPVerify;
