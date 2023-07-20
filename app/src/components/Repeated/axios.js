import axios from "axios";

const instance = axios.create({
  // baseURL: "http://3.110.107.87:5000",
  baseURL: "http://localhost:5000",
});

export default instance;
