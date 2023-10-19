import {
  Card,
  useTheme,
  CardContent,
  Typography,
  CardActions,
  Box,
} from "@mui/material";

export interface ICardDetailsMovie {
  title: string;
  id: number;
  overview: string;
  releaseDate: string;
  posterPath: string;
}

const CardDetailsMovie: React.FC<ICardDetailsMovie> = ({
  title,
  id,
  overview,
  releaseDate,
  posterPath,
}) => {
  const theme = useTheme();
  return (
    <Card sx={{ maxWidth: 500, width: "900px" }}>
      <Box display="flex" position="relative">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: 350,
            width: "100%",
            objectFit: "cover",
            backgroundImage: `url('https://image.tmdb.org/t/p/w500/${posterPath}')`,
            filter: "brightness(50%)",
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
      <CardActions></CardActions>
    </Card>
  );
};

export default CardDetailsMovie;
