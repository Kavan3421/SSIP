import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.admin;
      localStorage.setItem("SurveilEye-app-token", action.payload.token);
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("SurveilEye-app-token");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
