import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export type SoundFile = {
  id: number;
  file: string;
  name: string;
  artist: string | null;
  poster: string | null;
  dateUploaded: Date;
};

export type AudioPlayer = {
  files: SoundFile[];
  currentSound: SoundFile;
  currentIndex: number;
  hasNext: boolean,
  hasPrev: boolean
};

const initialState: AudioPlayer = {
  files: [],
  currentSound: {
    id: 0,
    name: "",
    file: "",
    poster: null,
    artist: null,
    dateUploaded: new Date(),
  },
  currentIndex: -1,
  hasNext: false,
  hasPrev: false
};

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    incrementIndex(state) {
      if (!state.files[state.currentIndex + 1]) return;
      state.currentIndex++;
      state.currentSound = state.files[state.currentIndex];
    },
    decrementIndex(state) {
      state.hasPrev = !!state.files[state.currentIndex - 1]
      if (!state.files[state.currentIndex - 1]) return;
      state.currentIndex--;
      state.currentSound = state.files[state.currentIndex];
    },

    setCurrentIndex(state, payload: PayloadAction<number>) {
      state.hasNext = !!state.files[state.currentIndex + 1]
      state.hasPrev = !!state.files[state.currentIndex - 1]
      if (!state.files[payload.payload]) return;
      state.currentIndex = payload.payload;
      state.currentSound = state.files[payload.payload];
    },

    setFiles(state, payload: PayloadAction<SoundFile[]>) {
      state.files = payload.payload;
    },
  },
});

export const selectAudioPlayer = (state: RootState) => state.audioPlayer;
export const audioPlayerActions = audioPlayerSlice.actions;
export const audioPlayerReducer = audioPlayerSlice.reducer;
