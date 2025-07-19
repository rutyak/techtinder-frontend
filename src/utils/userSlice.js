import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
        state.users = state.users.filter((users) => users._id !== action.payload._id);
    },
  },
});


export const { addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;