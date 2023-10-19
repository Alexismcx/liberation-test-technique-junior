import api from "api";

import { Box, useTheme, Container } from "@mui/material";
import CardDetailsMovie from "components/CardDetailsMovie";

export interface IDetailsMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IDetails {
  detailsMovie: IDetailsMovie;
}

const DetailsMovie: React.FC<IDetails> = ({ detailsMovie }) => {
  const { overview, title, release_date, id, poster_path } = detailsMovie;
  console.log("detailsMovie", detailsMovie);

  const theme = useTheme();

  return (
    <Box bgcolor={theme.palette.secondary.main} sx={{ height: "100vh" }}>
      <Box component="section" py={10}>
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
        </Container>
      </Box>
    </Box>
  );
};

export default DetailsMovie;

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const getDetailsMovie = await api.get(`/movie/${id}`).then((response) => {
    return response?.data;
  });

  return {
    props: {
      detailsMovie: getDetailsMovie,
    },
  };
};
