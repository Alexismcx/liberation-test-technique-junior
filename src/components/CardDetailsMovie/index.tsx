import {
  Card,
  useTheme,
  CardContent,
  Typography,
  Rating,
  Box,
} from "@mui/material";

export interface ICardDetailsMovie {
  title: string;
  id: number;
  overview: string;
  releaseDate: string;
  posterPath: string;
  listRatedMovies: { id: number; value: number }[];
  handleChangeRating: (id: number, value: number) => void;
}

const CardDetailsMovie: React.FC<ICardDetailsMovie> = ({
  title,
  id,
  overview,
  releaseDate,
  posterPath,
  listRatedMovies,
  handleChangeRating,
}) => {
  const theme = useTheme();
  return (
    <Card sx={{ maxWidth: 500, width: "900px" }}>
      <Box display="flex" position="relative">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{
            height: 350,
            width: "100%",
            objectFit: "cover",
            background: `linear-gradient(rgba(0, 75, 170, 0.5), rgba(0,0,0,0)), url('https://image.tmdb.org/t/p/w500/${posterPath}')`,
          }}
        >
          <Typography
            variant="h2"
            color={theme.palette.text.secondary}
            textTransform="uppercase"
            textAlign="center"
          >
            {title}
          </Typography>
          <Rating
            name="size-medium"
            defaultValue={0}
            value={listRatedMovies.find((movie) => movie.id === id)?.value || 0}
            onChange={(e, newValue) => handleChangeRating(newValue, id)}
          />
        </Box>
      </Box>
      <CardContent>
        <Box display="flex" justifyContent="center" gap={2}>
          <Typography variant="body1">{releaseDate}</Typography>
        </Box>
        <Typography
          textAlign="center"
          color={theme.palette.text.primary}
          variant="body2"
        >
          {overview}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardDetailsMovie;
