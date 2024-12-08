import { useFavoriteCitiesContext } from '../../context/FavoriteCitiesContext';

const Favorites = () => {
  const { favoriteCities } = useFavoriteCitiesContext();
  return <div>Favorites</div>;
};

export default Favorites;
