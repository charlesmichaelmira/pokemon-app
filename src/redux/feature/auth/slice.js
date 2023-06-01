import { createSlice } from "@reduxjs/toolkit";
import * as reducers from "./actionTypes";

const name = "auth";
const initialState = {
  authInfo: {},
};

const slice = createSlice({
  initialState,
  reducers,
  name,
});

export default slice;
