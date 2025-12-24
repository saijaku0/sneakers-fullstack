import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SessionState, User } from "./types";

export const initialState: SessionState = {
  isAuth: false,
  token: null,
  user: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.isAuth = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setUser, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
