import { createSlice } from "@reduxjs/toolkit";
import { apiCall } from "./api";

const initialState = {
  userId: "",
  userName: "",
  token: "",
  expiryDate: 0,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    apiRequested: (state, action) => {
      console.log(action);
      state.errorMessage = action.payload.error;
      state.loading = true;
    },
    apiRequestSuccess: (state, action) => {
      state.errorMessage = "";
      state.loading = false;
    },
    apiRequestFailed: (state, action) => {
      state.errorMessage = action.payload.error;
      state.loading = false;
    },
    signUp: (state, action) => {
      state.loading = false;
    },
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
      state.expiryDate = action.payload.expiryDate;
      state.loading = false;
    },
  },
});

export const {
  apiRequested,
  apiRequestSuccess,
  apiRequestFailed,
  signUp,
  login,
} = authSlice.actions;
export default authSlice.reducer;

// Action Creators

const url = "/auth";

export const putSignUp = (signUpData) =>
  apiCall({
    url: url + "/signup",
    method: "PUT",
    data: signUpData,
    onStart: apiRequested.type,
    onSuccess: signUp.type,
    onError: apiRequestFailed.type,
  });

export const postLogin = (loginData) =>
  apiCall({
    url: url + "/login",
    method: "POST",
    data: loginData,
    onStart: apiRequested.type,
    onSuccess: login.type,
    onError: apiRequestFailed.type,
  });
