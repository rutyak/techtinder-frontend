import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feeds",
  initialState: null,
  reducers: {
    addFeeds: (state, action) => action.payload,
    removeFeeds: () => null,
  },
});

export const { addFeeds, removeFeeds } = feedSlice.actions;

export default feedSlice.reducer;
