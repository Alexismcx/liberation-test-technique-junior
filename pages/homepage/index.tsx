import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Grid,
  Button,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import CardMovie from "components/CardMovie";

import api from "api";
import { getLatestMoviesUrl } from "api/movieDb";
export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IListMoviesFavorite {
  id: number;
  title: string;
  posterPath: string;
}

export interface IHome {
  latestMovie: IMovie[];
}

const Home: NextPage<IHome> = ({ latestMovie }) => {
  const [moviesList, setMoviesList] = useState<IMovie[]>(latestMovie);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [listFavoritedMovies, setListFavoritedMovies] = useState<
    IListMoviesFavorite[]
  >([]);

  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const storedData = localStorage.getItem("favoritedMovies");
    if (storedData) setListFavoritedMovies(JSON.parse(storedData));
  }, []);

  const toggleSortOrder = (): void => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortMoviesByReleaseDate = (list, order): IMovie[] => {
    return [...list].sort((a, b) => {
      const comparison = a.release_date.localeCompare(b.release_date);
      return order === "asc" ? comparison : -comparison;
    });
  };

  const handleFilterLatest = (): void => {
    toggleSortOrder();
    setMoviesList(sortMoviesByReleaseDate(moviesList, sortOrder));
  };

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

  return (
    <Box bgcolor={theme.palette.secondary.main}>
      <Box component="section" py={10}>
        <Container maxWidth="lg">
          <Box>
            <Typography
              sx={{ textTransform: "uppercase" }}
              variant="h1"
              color={theme.palette.text.secondary}
            >
              Liberation Movies
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" onClick={handleFilterLatest}>
              Filterez par ordre de sortie
            </Button>
          </Box>
          <Grid rowSpacing={3} container>
            {moviesList?.map(
              ({ title, id, overview, release_date, poster_path }) => (
                <Grid key={id} item lg={4} md={6} sm={12}>
                  <CardMovie
                    id={id}
                    title={title}
                    releaseDate={release_date}
                    overview={overview}
                    posterPath={poster_path}
                    handleClickDetails={handleClickDetails}
                    handleAddFavorite={handleAddFavorite}
                    listFavoritedMovies={listFavoritedMovies}
                  />
                </Grid>
              )
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export const getServerSideProps = async () => {
  const getLatestMovies = await api
    .get(getLatestMoviesUrl())
    .then((response) => {
      return response?.data?.results;
    });

  return {
    props: {
      latestMovie: getLatestMovies,
    },
  };
};

export default Home;
