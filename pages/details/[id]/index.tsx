import api from "api";

import { Box, useTheme, Container, Typography, Grid } from "@mui/material";
import CardDetailsMovie from "components/CardDetailsMovie";

import { getDetailsMovieUrl } from "api/movieDb";
import { getSuggestedMovies } from "api/movieDb";
import { IMovie } from "api/movieDb";
import { IDetailsMovie } from "api/movieDb";
import CardMovie from "components/CardMovie";
import { useMovies } from "hooks/useMovies";

export interface IDetails {
  detailsMovie: IDetailsMovie;
  listSuggestedMovies: IMovie[];
}

const DetailsMovie: React.FC<IDetails> = ({
  detailsMovie,
  listSuggestedMovies,
}) => {
  const { models, operations } = useMovies();

  const { listFavoritedMovies } = models;
  const { handleAddFavorite, handleClickDetails } = operations;

  const { overview, title, release_date, id, poster_path } = detailsMovie;

  const theme = useTheme();

  return (
    <Box bgcolor={theme.palette.secondary.main}>
      <Box component="section" pt={10} pb={5}>
        <Container
          maxWidth="lg"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box>
            <CardDetailsMovie
              overview={overview}
              title={title}
              posterPath={poster_path}
              releaseDate={release_date}
              id={id}
            ></CardDetailsMovie>
          </Box>
          <Box></Box>
        </Container>
      </Box>
      <Box component="section" py={3}>
        <Container maxWidth="lg">
          <Typography
            sx={{ textTransform: "uppercase" }}
            variant="h1"
            mb={5}
            color={theme.palette.text.secondary}
          >
            Suggestions Films
          </Typography>
          <Grid rowSpacing={3} container>
            {listSuggestedMovies?.map(
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

export default DetailsMovie;

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const getDetailsMovie = await api
    .get(getDetailsMovieUrl(id))
    .then((response) => {
      return response?.data;
    });
  const getSuggestedMovie = await api
    .get(getSuggestedMovies(id))
    .then((response) => {
      return response?.data?.results;
    });

  return {
    props: {
      detailsMovie: getDetailsMovie,
      listSuggestedMovies: getSuggestedMovie,
    },
  };
};
