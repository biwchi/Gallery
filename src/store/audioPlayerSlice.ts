import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export type SoundFile = {
  file: string;
  name: string;
  artist?: string;
  poster?: string;
};

export type AudioPlayer = {
  files: SoundFile[];
  currentSound: SoundFile;
  currentIndex: number;
};

const initialState: AudioPlayer = {
  files: [],
  currentSound: {
    name: "",
    file: "",
  },
  currentIndex: -1,
};

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    incrementIndex(state) {
      state.currentIndex++;
      state.currentSound = state.files[state.currentIndex]
    },
    decrementIndex(state) {
      state.currentIndex--;
      state.currentSound = state.files[state.currentIndex]
    },

    setCurrentIndex(state, payload: PayloadAction<number>) {
      state.currentIndex = payload.payload;
      state.currentSound = state.files[payload.payload]
    },

    setFiles(state, payload: PayloadAction<SoundFile[]>) {
      state.files = payload.payload;
    },
  },
});

export const selectAudioPlayer = (state: RootState) => state.audioPlayer;
export const audioPlayerActions = audioPlayerSlice.actions;
export const audioPlayerReducer = audioPlayerSlice.reducer;
