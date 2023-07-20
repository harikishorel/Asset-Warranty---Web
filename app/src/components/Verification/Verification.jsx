import { useState } from "react";
import "./Verification.css";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth, signInWithPhoneNumber } from "./firebase.config";
import { RecaptchaVerifier } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
// import { auth, signInWithPhoneNumber } from "../../../firebase";
// import { RecaptchaVerifier } from "firebase/auth";

function Verification() {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        // console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          //OTP
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <h5>Enter your OTP</h5>

                <OtpInput
                  color={"black"}
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>

                <br />
                <button
                  style={{ width: "150px" }}
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span style={{ color: "black" }}>Verify OTP</span>
                </button>
              </>
            ) : (
              //verify your phone number
              <div className="VerifyPH">
                <br />
                <>
                  <h1 style={{ fontSize: "20px", marginLeft: "22px" }}>
                    Enter Your Phone Number To Verify
                  </h1>
                  <div className="" style={{ marginLeft: "24px" }}>
                    <BsTelephoneFill size={25} />
                  </div>
                  <br />

                  <PhoneInput
                    style={{ marginLeft: "25px" }}
                    country={"in"}
                    value={ph}
                    onChange={setPh}
                  />
                  <br />
                  <button
                    style={{
                      width: "200px",
                      height: "30px",
                      marginLeft: "25px",
                    }}
                    onClick={onSignup}
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && (
                      <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    <span style={{ color: "green" }}>Send code via sms</span>
                  </button>
                </>
                <br />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Verification;
