import axios from "axios";

const API_URL = "http://localhost:3000";

export interface LoginData {
  // interface สำหรับ login
  email: string;
  password: string;
}

export interface RegisterData {
  // interface สำหรับ register
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await axios.post(`${API_URL}/login`, data); // ส่งข้อมูลที่ได้รับจาก form ไปยัง API เพื่อ login
  console.log("Login response:", response.data);
  if (response.data.access_token) {
    localStorage.setItem("token", response.data.access_token); // เก็บ access_token ลงใน localStorage
  }
  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await axios.post(`${API_URL}/register`, data); // ส่งข้อมูลที่ได้รับจาก form ไปยัง API เพื่อสร้าง User ใหม่
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token"); // ลบ access_token ออกจาก localStorage
  window.location.href = "/login"; // กลับไปยังหน้า Login
};

export const getToken = () => {
  return localStorage.getItem("token"); // ดึง access_token จาก localStorage
};
