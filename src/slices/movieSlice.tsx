import { createSlice } from "@reduxjs/toolkit";
import { IListRatedMovies } from "api/movieDb";
import { IListMoviesFavorite } from "api/movieDb";

export interface IMovieSlice {
  listFavoritedMovies: IListMoviesFavorite[];
  listRatedMovies: IListRatedMovies[];
}

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    listFavoritedMovies: [],
    listRatedMovies: [],
  },
  reducers: {
    setFavoritedMovies: (state, action) => {
      state.listFavoritedMovies = action.payload;
    },
    setRatedMovies: (state, action) => {
      state.listRatedMovies = action.payload;
    },
    addFavoriteMovie: (state, action) => {
      state.listFavoritedMovies.push(action.payload);
    },
    removeFavoriteMovie: (state, action) => {
      state.listFavoritedMovies = state.listFavoritedMovies.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const {
  setFavoritedMovies,
  setRatedMovies,
  addFavoriteMovie,
  removeFavoriteMovie,
} = moviesSlice.actions;

export default moviesSlice.reducer;
