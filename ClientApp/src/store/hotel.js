import { createSlice } from "@reduxjs/toolkit";
import { apiCall } from "./api";

const initialState = {
  hotels: [],
  hotelsByRating: [],
  hotelsBySearchKey: [],
  loading: false,
  error: null,
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState: initialState,
  reducers: {
    apiRequest: (state, action) => {
      state.loading = true;
    },
    apiRequestFailed: (state, action) => {
      state.loading = false;
    },
    getHotels: (state, action) => {
      state.hotels = action.payload.hotels;
      state.loading = false;
    },
    getHotelsByRating: (state, action) => {
      state.hotelsByRating = action.payload.hotels;
      state.loading = false;
    },
    getHotelsBySearchKey: (state, action) => {
      state.hotelsBySearchKey = action.payload.hotels;
      state.loading = false;
    },
  },
});

export const {
  apiRequest,
  apiRequestFailed,
  getHotels,
  getHotelsByRating,
  getHotelsBySearchKey,
} = hotelSlice.actions;
export default hotelSlice.reducer;

// Creator actions

const url = "/hotel";

export const loadHotels = () =>
  apiCall({
    url: url + "/hotels",
    method: "GET",
    onStart: apiRequest.type,
    onSuccess: getHotels.type,
    onError: apiRequestFailed.type,
  });
export const loadHotelsByRating = () =>
  apiCall({
    url: url + "/byrating",
    method: "GET",
    onStart: apiRequest.type,
    onSuccess: getHotelsByRating.type,
    onError: apiRequestFailed.type,
  });
export const loadHotelsBySearchKey = (keyword) =>
  apiCall({
    url: url + `/search?destination=${keyword}`,
    method: "GET",
    onStart: apiRequest.type,
    onSuccess: getHotels.type,
    onError: apiRequestFailed.type,
  });
