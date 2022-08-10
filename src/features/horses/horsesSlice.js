import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const horsesSlice = createSlice({
  name: 'horses',
  initialState,
  reducers: {
    update: (state, action) => {
      state.raceData = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, setSocket } = horsesSlice.actions;

export default horsesSlice.reducer;
