import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth";
import hotelReducer from "./hotel";
import error from "./middleware/error";
import api from "./middleware/api";

const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api, error],
});

export default store;
