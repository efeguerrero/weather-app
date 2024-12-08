import { createContext, useContext, useEffect, useState } from 'react';
import { City } from '../Types/city';
import { Weather } from '../Types/weather';

interface FavoriteCitiesContextProps {
  favoriteCities: City[];
  setFavoriteCities: React.Dispatch<React.SetStateAction<City[]>>;
  AddCityToFavorite: (city: City, weather: Weather) => void;
  RemoveCityFromFavorite: (city: City) => void;
  clearFavoriteCities: () => void;
  favoriteCitiesData: { city: City; weather: Weather }[];
}

interface FavoriteCitiesContextProviderProps {
  children: React.ReactNode;
}

export const FavoriteCitiesContext = createContext<
  FavoriteCitiesContextProps | undefined
>(undefined);

export const FavoriteCitiesContextProvider = ({
  children,
}: FavoriteCitiesContextProviderProps) => {
  const [favoriteCities, setFavoriteCities] = useState<City[]>([]);
  const [favoriteCitiesData, setFavoriteCitiesData] = useState<
    { city: City; weather: Weather }[]
  >([]);

  useEffect(() => {
    const favoriteCities = localStorage.getItem('favoriteCities');
    if (favoriteCities) {
      setFavoriteCities(JSON.parse(favoriteCities));
    }
  }, []);

  const AddCityToFavorite = (city: City, weather: Weather) => {
    const newCities = [...favoriteCities, city];
    setFavoriteCities(newCities);
    localStorage.setItem('favoriteCities', JSON.stringify(newCities));
    setFavoriteCitiesData([...favoriteCitiesData, { city, weather }]);
  };

  const RemoveCityFromFavorite = (city: City) => {
    const newCities = favoriteCities.filter((c) => c.id !== city.id);
    // Add functionality to remove weather from favoriteCitiesWeather
    setFavoriteCities(newCities);
    localStorage.setItem('favoriteCities', JSON.stringify(newCities));
  };

  const clearFavoriteCities = () => {
    setFavoriteCities([]);
    setFavoriteCitiesData([]);
    localStorage.removeItem('favoriteCities');
  };

  return (
    <FavoriteCitiesContext.Provider
      value={{
        favoriteCities,
        setFavoriteCities,
        AddCityToFavorite,
        RemoveCityFromFavorite,
        clearFavoriteCities,
        favoriteCitiesData,
      }}
    >
      {children}
    </FavoriteCitiesContext.Provider>
  );
};

export function useFavoriteCitiesContext() {
  const context = useContext(FavoriteCitiesContext);
  if (context === undefined) {
    throw new Error(
      'useFavoriteCitiesContext must be used within a FavoriteCitiesContextProvider'
    );
  }
  return context;
}
