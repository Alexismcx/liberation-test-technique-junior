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

export interface IHome {
  latestMovie: IMovie[];
}

const Home: NextPage<IHome> = ({ latestMovie }) => {
  const [moviesList, setMoviesList] = useState(latestMovie);
  const [sortOrder, setSortOrder] = useState("asc");

  const theme = useTheme();

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortMoviesByReleaseDate = (list, order) => {
    return [...list].sort((a, b) => {
      const comparison = a.release_date.localeCompare(b.release_date);
      return order === "asc" ? comparison : -comparison;
    });
  };

  const handleFilterLatest = () => {
    toggleSortOrder();
    setMoviesList(sortMoviesByReleaseDate(moviesList, sortOrder));
  };

  return (
    <Box bgcolor={theme.palette.secondary.main} sx={{ height: "100vh" }}>
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
    .get(
      "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023"
    )
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
