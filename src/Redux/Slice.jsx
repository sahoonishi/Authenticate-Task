import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("movies")) ?? [];

const slice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addToWatchList: (state, action) => {
      state.push(action.payload);
    },
    deleteFromWatchList: (state, action) => {
      //console.log(action.payload);
      //console.log(state);
      //localStorage.removeItem("movies");
      return  state.filter((movie) => movie.imdbID !== action.payload);
      // localStorage.setItem("movies", JSON.stringify(state));
    },
  },
});

export const { addToWatchList, deleteFromWatchList } = slice.actions;

export default slice.reducer;
