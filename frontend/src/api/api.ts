import axios from "axios";

const API_URL = "http://localhost:3000";

// สร้าง instance ของ axios
const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// interceptor สำหรับ response
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ดึง access_token จาก localStorage
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`; // ถ้ามี access_token ให้แนบไปกับ request
  }
  return config;
});

export default API;
