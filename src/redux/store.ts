import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./slices/contactSlice";

const store = configureStore({
  reducer: {
    contacts: contactSlice
  }
});

export default store;