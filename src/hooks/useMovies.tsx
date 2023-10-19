import { IListMoviesFavorite } from "api/movieDb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useMovies = () => {
  const [listFavoritedMovies, setListFavoritedMovies] = useState<
    IListMoviesFavorite[]
  >([]);
  const [listRatedMovies, setListRatedMovies] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const storedFavoritedMovies = localStorage.getItem("favoritedMovies");
    if (storedFavoritedMovies)
      setListFavoritedMovies(JSON.parse(storedFavoritedMovies));

    const storedRatedMovies = localStorage.getItem("ratedMoviesList");
    if (storedRatedMovies) setListRatedMovies(JSON.parse(storedRatedMovies));
  }, []);

  const handleClickDetails = (id): void => {
    router.push(`/details/${id}`);
  };

  const saveFavoriteListLocalStorage = (newList: IListMoviesFavorite[]) => {
    setListFavoritedMovies(newList);
    localStorage.setItem("favoritedMovies", JSON.stringify(newList));
  };

  const saveRatedMoviesLocalStorage = (newList: IListMoviesFavorite[]) => {
    setListRatedMovies(newList);
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
