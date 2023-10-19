import { IListMoviesFavorite } from "api/movieDb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useMovies = () => {
  const [listFavoritedMovies, setListFavoritedMovies] = useState<
    IListMoviesFavorite[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("favoritedMovies");
    if (storedData) setListFavoritedMovies(JSON.parse(storedData));
  }, []);

  const handleClickDetails = (id): void => {
    router.push(`/details/${id}`);
  };

  const saveFavoriteListLocalStorage = (newList: IListMoviesFavorite[]) => {
    setListFavoritedMovies(newList);
    localStorage.setItem("favoritedMovies", JSON.stringify(newList));
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

  return {
    models: { listFavoritedMovies },
    operations: {
      handleAddFavorite,
      handleClickDetails,
    },
  };
};
