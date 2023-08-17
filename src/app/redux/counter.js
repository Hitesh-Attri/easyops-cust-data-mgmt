import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dltID: null,
  customersData: [],
  updateID: null,
  editCustomerObj: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setDltId: (state, action) => {
      state.dltID = action.payload;
    },
    setCustomersData: (state, action) => {
      state.customersData = action.payload;
    },
    setUpdateID: (state, action) => {
      state.updateID = action.payload;
    },
    setEditCustomerObj: (state, action) => {
      state.editCustomerObj = action.payload;
    },
    appendCustomersData: (state, action) => {
      state.customersData = [...state.tasksData, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDltId,
  appendCustomersData,
  setCustomersData,
  setUpdateID,
  setEditCustomerObj,
} = counterSlice.actions;

export default counterSlice.reducer;
