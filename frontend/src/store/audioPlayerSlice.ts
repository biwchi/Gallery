import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { AppFile } from "@/services/types";

export type AudioPlayer = {
  files: AppFile[];
  currentIndex: number;
  hasNext: boolean;
  hasPrev: boolean;
};

const initialState: AudioPlayer = {
  files: [],
  currentIndex: -1,
  hasNext: false,
  hasPrev: false,
};

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    incrementIndex(state) {
      if (!state.files[state.currentIndex + 1]) {
        state.files = [];
        state.currentIndex = -1;
        return;
      }
      state.currentIndex++;
    },
    decrementIndex(state) {
      if (!state.files[state.currentIndex - 1]) {
        state.files = [];
        state.currentIndex = -1;
        return;
      }
      state.currentIndex--;
    },

    setCurrentIndex(state, payload: PayloadAction<number>) {
      if (!state.files[payload.payload]) {
        state.files = [];
        state.currentIndex = -1;
        return;
      }
      state.currentIndex = payload.payload;
    },

    setFiles(state, payload: PayloadAction<AppFile[]>) {
      state.files = payload.payload;
    },
  },
});

export const selectAudioPlayer = (state: RootState) => state.audioPlayer;
export const audioPlayerActions = audioPlayerSlice.actions;
export const audioPlayerReducer = audioPlayerSlice.reducer;
