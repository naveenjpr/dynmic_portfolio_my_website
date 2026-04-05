import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../Redux/AdminSlice";

export const store = configureStore({
  reducer: {
    loginStore: loginSlice,
  },
});
