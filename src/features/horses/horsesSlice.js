import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  maxWidth: 15,
  isRaceEnded: false,
  latestRaceData: undefined,
  winner: undefined,
};

export const horsesSlice = createSlice({
  name: 'horses',
  initialState,
  reducers: {
    updateLatestRaceData: (state, action) => {
      state.latestRaceData = action.payload;
    },
    zoomIn: (state) => {
      state.maxWidth += 1;
    },
    zoomOut: (state) => {
      state.maxWidth -= 1;
    },
    endTheRace: (state) => {
      state.isRaceEnded = true;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateLatestRaceData, zoomIn, zoomOut, endTheRace, setWinner } =
  horsesSlice.actions;

export default horsesSlice.reducer;
