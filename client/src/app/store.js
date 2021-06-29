import { configureStore } from "@reduxjs/toolkit";
import trelloReducer from "../features/trello";

const store = configureStore({
  reducer: {
    trello: trelloReducer,
  },
});

export default store;
