import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  useTheme,
  CardActions,
  Box,
  Button,
} from "@mui/material";

export interface ICardMovie {
  title: string;
  id: number;
  overview: string;
  releaseDate: string;
  posterPath: string;
}

const CardMovie: React.FC<ICardMovie> = ({
  title,
  id,
  overview,
  releaseDate,
  posterPath,
}) => {
  const theme = useTheme();
  return (
    <Card sx={{ maxWidth: 380, width: "360px" }}>
      <CardMedia
        component="img"
        sx={{ height: 500, objectFit: "cover", width: "100%" }}
        image={`https://image.tmdb.org/t/p/w500${posterPath}`}
        title="green iguana"
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography
            fontWeight="bold"
            gutterBottom
            variant="h4"
            component="div"
          >
            {title}
          </Typography>
          <Typography variant="body1">{releaseDate}</Typography>
        </Box>
        <Typography color={theme.palette.text.primary} variant="body2">
          {overview.substring(0, 100) + "..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">Details</Button>
      </CardActions>
    </Card>
  );
};

export default CardMovie;
