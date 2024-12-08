import { IconButton } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { City } from '../../Types/city';
import { useFavoriteCitiesContext } from '../../context/FavoriteCitiesContext';
import { Weather } from '../../Types/weather';

interface FavoriteButtonProps {
  city: City;
  weather: Weather;
}

function FavoriteButton({ city, weather }: FavoriteButtonProps) {
  const { favoriteCities, AddCityToFavorite, RemoveCityFromFavorite } =
    useFavoriteCitiesContext();

  const isFavorite = favoriteCities.some((favCity) => favCity.id === city.id);

  const handleClick = () => {
    if (isFavorite) {
      RemoveCityFromFavorite(city);
    } else {
      AddCityToFavorite(city, weather);
    }
  };

  return (
    <IconButton
      color="secondary"
      onClick={handleClick}
      sx={{
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.1)',
        },
      }}
    >
      {isFavorite ? <Favorite /> : <FavoriteBorderOutlinedIcon />}
    </IconButton>
  );
}

export default FavoriteButton;