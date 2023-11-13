import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
    isBlocked:false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.isBlocked = false;
      localStorage.removeItem("userInfo");
    },
    blockUser: (state) =>{
      state.isBlocked = true;
    }
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
