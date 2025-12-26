import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchState } from "../config/types";

const initialState: SearchState = {
  searchQuery: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = "";
    },
  },
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;
