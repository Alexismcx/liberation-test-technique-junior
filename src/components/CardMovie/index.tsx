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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export interface ICardMovie {
  title: string;
  id: number;
  overview: string;
  releaseDate: string;
  posterPath: string;
  handleClickDetails: (id: number) => void;
  handleAddFavorite: (id: number, title: string, posterPath: string) => void;
  listFavoritedMovies: { id: number; title: string; posterPath: string }[];
}

const CardMovie: React.FC<ICardMovie> = ({
  title,
  id,
  overview,
  releaseDate,
  posterPath,
  handleClickDetails,
  handleAddFavorite,
  listFavoritedMovies,
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
        <Box width="100%" display="flex" justifyContent={"space-between"}>
          <Button variant="contained" onClick={() => handleClickDetails(id)}>
            Details
          </Button>
          <Box display="flex" alignItems="center">
            <Typography>Like</Typography>
            <Button onClick={() => handleAddFavorite(id, title, posterPath)}>
              {listFavoritedMovies.some((movie) => movie.id === id) ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </Button>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default CardMovie;
