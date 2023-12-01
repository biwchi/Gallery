import { configureStore } from "@reduxjs/toolkit";
import { mediaViewerReducer } from "./mediaViewerSlice";
import { audioPlayerReducer } from "./audioPlayerSlice";
import { themeReducer } from "./themeSlice";

const store = configureStore({
  reducer: {
    mediaViewer: mediaViewerReducer,
    audioPlayer: audioPlayerReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
