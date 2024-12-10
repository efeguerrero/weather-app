import { createContext, useContext, useEffect, useState } from 'react';
import { City } from '../Types/city';
import { Weather } from '../Types/weather';
import { getWeather } from '../api/Weather';

interface FavoriteCitiesContextProps {
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
  const [favoriteCitiesData, setFavoriteCitiesData] = useState<
    { city: City; weather: Weather }[]
  >([]);

  // Load favorite cities data from Local Storage on first load and update weather data for each city.
  useEffect(() => {
    const favoriteCitiesData: { city: City; weather: Weather }[] = JSON.parse(
      localStorage.getItem('favoriteCitiesData') || '[]'
    );
    if (favoriteCitiesData) {
      const getFavoriteCitiesData = async () => {
        const newFavoriteCitiesData = await Promise.all(
          favoriteCitiesData.map(async (item) => {
            const newWeatherData = await getWeather(item.city);
            return { city: item.city, weather: newWeatherData };
          })
        );
        setFavoriteCitiesData(newFavoriteCitiesData);
        setIsLoading(false);
      };
      getFavoriteCitiesData();
    }
  }, []);

  const AddCityToFavorite = (city: City, weather: Weather) => {
    const newCitiesData = [...favoriteCitiesData, { city, weather }];
    setFavoriteCitiesData(newCitiesData);
    localStorage.setItem('favoriteCitiesData', JSON.stringify(newCitiesData));
  };

  const RemoveCityFromFavorite = (city: City) => {
    const newCitiesData = favoriteCitiesData.filter(
      (item) => item.city.id !== city.id
    );
    setFavoriteCitiesData(newCitiesData);
    localStorage.setItem('favoriteCitiesData', JSON.stringify(newCitiesData));
  };

  const clearFavoriteCities = () => {
    setFavoriteCitiesData([]);
    localStorage.removeItem('favoriteCities');
  };

  return (
    <FavoriteCitiesContext.Provider
      value={{
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
