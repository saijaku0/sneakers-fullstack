import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SessionState {
  isAuth: boolean;
  token: string | null;
  user: {
    username: string;
    email: string;
  } | null;
}

const initialState: SessionState = {
  isAuth: false,
  token: null,
  user: null,
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string; user: { username: string; email: string } }>) => {
            state.isAuth = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.isAuth = false;
            state.token = null;
            state.user = null;
        },
    },
});

export const { setCredentials, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
