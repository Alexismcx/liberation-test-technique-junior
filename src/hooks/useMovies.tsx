import { IListMoviesFavorite } from "api/movieDb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  IMovieSlice,
  setFavoritedMovies,
  setRatedMovies,
} from "slices/movieSlice";

export const useMovies = () => {
  const dispatch = useDispatch();
  const { listFavoritedMovies, listRatedMovies } = useSelector(
    (state: { movies: IMovieSlice }) => state.movies
  );

  const router = useRouter();

  useEffect(() => {
    const storedFavoritedMovies = localStorage.getItem("favoritedMovies");
    if (storedFavoritedMovies)
      dispatch(setFavoritedMovies(JSON.parse(storedFavoritedMovies)));

    const storedRatedMovies = localStorage.getItem("ratedMoviesList");
    if (storedRatedMovies)
      dispatch(setRatedMovies(JSON.parse(storedRatedMovies)));
  }, []);

  const handleClickDetails = (id): void => {
    router.push(`/details/${id}`);
  };

  const saveFavoriteListLocalStorage = (newList: IListMoviesFavorite[]) => {
    dispatch(setFavoritedMovies(newList));
    localStorage.setItem("favoritedMovies", JSON.stringify(newList));
  };

  const saveRatedMoviesLocalStorage = (newList: IListMoviesFavorite[]) => {
    dispatch(setRatedMovies(newList));
    localStorage.setItem("ratedMoviesList", JSON.stringify(newList));
  };

  const handleAddFavorite = (
    id: number,
    title: string,
    posterPath: string
  ): void => {
    const existingIndex = listFavoritedMovies.findIndex(
      (movie) => movie.id === id
    );

    if (existingIndex !== -1) {
      const updatedList = listFavoritedMovies.filter(
        (_, index) => index !== existingIndex
      );
      saveFavoriteListLocalStorage(updatedList);
    } else {
      const updatedList = [...listFavoritedMovies, { id, title, posterPath }];
      saveFavoriteListLocalStorage(updatedList);
    }
  };

  const handleChangeRating = (value: number, id: number): void => {
    const existingIndex = listRatedMovies.findIndex((movie) => movie.id === id);

    if (existingIndex !== -1) {
      const updatedList = listRatedMovies.map((movie, index) =>
        index === existingIndex ? { ...movie, value } : movie
      );
      saveRatedMoviesLocalStorage(updatedList);
    } else {
      const updatedList = [...listRatedMovies, { id, value }];
      saveRatedMoviesLocalStorage(updatedList);
    }
  };

  return {
    models: { listFavoritedMovies, listRatedMovies },
    operations: {
      handleAddFavorite,
      handleClickDetails,
      handleChangeRating,
    },
  };
};
