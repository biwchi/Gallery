import { AppFile } from "@/services/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

type MediaViewer = {
  files: AppFile[];
  currentFileIndex: number;
  isOpened: boolean;
  zoom: number;
  isMoveable: {
    moveable: boolean;
    x: boolean;
    y: boolean;
  };
};

const initialState: MediaViewer = {
  files: [],
  currentFileIndex: -1,
  zoom: 1,
  isOpened: false,
  isMoveable: {
    moveable: false,
    x: false,
    y: false,
  },
};

export const mediaViewerSlice = createSlice({
  name: "mediaViewer",
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<AppFile[]>) => {
      state.files = action.payload;
    },
    setCurrentFileIndex: (state, action: PayloadAction<number>) => {
      state.currentFileIndex = action.payload;
    },
    incrementZoom: (state) => {
      if (state.zoom === 4) return;
      state.zoom++;
    },
    decrementZoom: (state) => {
      if (state.zoom === 1) return;
      state.zoom--;
    },
    currentFileIndexIncrement: (state) => {
      if (!state.files[state.currentFileIndex + 1]) return;
      state.currentFileIndex++;
      state.zoom = 1;
    },
    currentFileIndexDecrement: (state) => {
      if (!state.files[state.currentFileIndex - 1]) return;
      state.currentFileIndex--;
      state.zoom = 1;
    },
    toggleMoveable: (
      state,
      action: PayloadAction<{
        moveable: boolean;
        x: boolean;
        y: boolean;
      }>,
    ) => {
      state.isMoveable = action.payload;
    },
    toggleMediaViewer: (state, action: PayloadAction<boolean>) => {
      state.isOpened = action.payload;
      if (!action.payload) state.zoom = 1;
    },
  },
});

export const selectMediaViewer = (state: RootState) => state.mediaViewer;
export const mediaViewerActions = mediaViewerSlice.actions;
export const mediaViewerReducer = mediaViewerSlice.reducer;
