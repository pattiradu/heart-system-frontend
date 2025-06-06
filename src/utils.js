import axios from "axios";

const backend = axios.create({
  baseURL: "https://hypertension-4q25.onrender.com/",
  // baseURL: "http://localhost:5000",
});

export default backend;
