import { configureStore } from "@reduxjs/toolkit";
import { mediaViewerReducer } from "./mediaViewerSlice";

const store = configureStore({
  reducer: {
    mediaViewer: mediaViewerReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
