import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

import adminReducer from "./slices/adminAuthSlice"
import tutorAuthSlice from "./slices/tutorAuthSlice";
import courseDetailsSlice from "./slices/courseDetailsSlice";
// import courseDetailsSlice from "./slices/courseDetailsSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    adminAuth:adminReducer,
    tutorAuth: tutorAuthSlice,
    courseAuth: courseDetailsSlice 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware,apiSlice.middleware),

  devTools: true,
});

export default store;
