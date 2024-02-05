import { configureStore } from "@reduxjs/toolkit";

import combineReducers from "./combine";

const store = configureStore({
  reducer: combineReducers,
  devTools: true,
});

export default store;
