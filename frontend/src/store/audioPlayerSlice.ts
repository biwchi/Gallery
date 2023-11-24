import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { AppFile } from '@/services/types';

export type AudioPlayer = {
  files: AppFile[];
  currentSound: AppFile;
  currentIndex: number;
  hasNext: boolean,
  hasPrev: boolean
};

const initialState: AudioPlayer = {
  files: [],
  currentSound: {
    id: number;
    title: string;
    fileName: 'string';
    type: 'audio';
    size: 0;
    fileUrl: '';
    dateUploaded: '';

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
