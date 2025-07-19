import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.user.push(action.payload);
    },
    removeUser: (state, action) => {
        state.user = state.user.filter((user) => user._id !== action.payload._id);
    },
  },
});


export const { addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;