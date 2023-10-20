import { NextPage } from "next";
import { useState } from "react";

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
import { IMovie } from "api/movieDb";
import { useMovies } from "hooks/useMovies";

export interface IHome {
  latestMovie: IMovie[];
}

const Home: NextPage<IHome> = ({ latestMovie }) => {
  const [moviesList, setMoviesList] = useState<IMovie[]>(latestMovie);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const { models, operations } = useMovies();

  const { listFavoritedMovies, listRatedMovies } = models;
  const { handleAddFavorite, handleClickDetails, handleChangeRating } =
    operations;

  const theme = useTheme();

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
                    handleChangeRating={handleChangeRating}
                    listRatedMovies={listRatedMovies}
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
