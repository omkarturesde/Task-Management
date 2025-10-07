import { configureStore } from "@reduxjs/toolkit";
import Login from "./slice/Login";

const Store = configureStore({
  reducer: {
    login: Login,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
export type RootState = ReturnType<typeof configureStore>;
