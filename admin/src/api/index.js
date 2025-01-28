import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/", // Adjust to your Flask server URL
});

// Login a user
export const AdminSignIn = async (data) => API.post("/admin/signin", data);

// Get data by date
export const getDataByDate = async (token, queryString) =>
  await API.get(`/admin/databydate${queryString}`, {
    headers: { Authorization: `Bearer ${token}` },
  });