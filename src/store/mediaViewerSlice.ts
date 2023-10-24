import { AppFile } from "@/global";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

type MediaViewer = {
  files: AppFile[];
  isOpened: boolean;
};

const initialState: MediaViewer = {
  files: [],
  isOpened: false,
};

export const mediaViewerSlice = createSlice({
  name: "mediaViewer",
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<AppFile[]>) => {
      state.files = action.payload;
    },
    toggleMediaViewer: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        state.isOpened = !state.isOpened;
        return;
      }

      state.isOpened = action.payload;
    },
  },
});

export const selectMediaViewer = (state: RootState) => state.mediaViewer;
export const mediaViewerActions = mediaViewerSlice.actions;
export const mediaViewerReducer = mediaViewerSlice.reducer;
