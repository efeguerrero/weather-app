import { createContext, useContext, useEffect, useState } from 'react';
import { City } from '../Types/city';
import { Weather } from '../Types/weather';
import { getWeather } from '../api/Weather';

interface FavoriteCitiesContextProps {
  favoriteCities: City[];
  setFavoriteCities: React.Dispatch<React.SetStateAction<City[]>>;
  AddCityToFavorite: (city: City, weather: Weather) => void;
  RemoveCityFromFavorite: (city: City) => void;
  clearFavoriteCities: () => void;
  favoriteCitiesData: { city: City; weather: Weather }[];
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteCities, setFavoriteCities] = useState<City[]>([]);
  const [favoriteCitiesData, setFavoriteCitiesData] = useState<
    { city: City; weather: Weather }[]
  >([]);

  // Load favorite cities from Local Storage on first load and fetch weather data for each city.
  useEffect(() => {
    const favoriteCities: City[] = JSON.parse(
      localStorage.getItem('favoriteCities') || '[]'
    );
    if (favoriteCities) {
      setFavoriteCities(favoriteCities);
      const getFavoriteCitiesData = async () => {
        const favoriteCitiesData = await Promise.all(
          favoriteCities.map(async (city) => {
            const weather = await getWeather(city);
            return { city, weather };
          })
        );
        setFavoriteCitiesData(favoriteCitiesData);
        setIsLoading(false);
      };
      getFavoriteCitiesData();
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
        isLoading,
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
