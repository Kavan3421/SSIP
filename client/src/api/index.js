import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/", // Adjust to your Flask server URL
});

// Register a new user
export const registerUser = async (data) => {
  try {
    const response = await API.post("/user/signup", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
};

// Login a user
export const UserSignIn = async (data) => {
  try {
    const response = await API.post("/user/signin", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
};

// Get data by date
export const getDataByDate = async (token, queryString) => {
  try {
    const response = await API.get(`/user/databydate${queryString}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
};

// Submit a contact message
export const contact = async (token, data) => {
  try {
    const response = await API.post("/user/contact", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
};
