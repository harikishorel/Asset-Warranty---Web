// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPhoneNumber } from "firebase/auth";

// const OTP = {
  
//     apiKey: "AIzaSyCmbbLh-piAJVo1uVe6XT3T2vHXLaOngxw",
//     authDomain: "asset-verify-ad7ff.firebaseapp.com",
//     projectId: "asset-verify-ad7ff",
//     storageBucket: "asset-verify-ad7ff.appspot.com",
//     messagingSenderId: "278927696848",
//     appId: "1:278927696848:web:6c93770ee63626106e0fd5",
//     measurementId: "G-0G8PY9G1M6"
// };
// const app = initializeApp(OTP);
// export const auth = getAuth(app);
// export  {signInWithPhoneNumber}



// For OTP configuration
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

const otpConfig = {
  apiKey: "AIzaSyCmbbLh-piAJVo1uVe6XT3T2vHXLaOngxw",
  authDomain: "asset-verify-ad7ff.firebaseapp.com",
  projectId: "asset-verify-ad7ff",
  storageBucket: "asset-verify-ad7ff.appspot.com",
  messagingSenderId: "278927696848",
  appId: "1:278927696848:web:6c93770ee63626106e0fd5",
  measurementId: "G-0G8PY9G1M6"
};

const otpApp = initializeApp(otpConfig, "OTP");
export const auth = getAuth(otpApp);
export { signInWithPhoneNumber };