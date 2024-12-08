import { createContext, useContext, useEffect, useState } from 'react';
import { City } from '../Types/city';

interface FavoriteCitiesContextProps {
  favoriteCities: City[];
  setFavoriteCities: React.Dispatch<React.SetStateAction<City[]>>;
  AddCityToFavorite: (city: City) => void;
  RemoveCityFromFavorite: (city: City) => void;
  clearFavoriteCities: () => void;
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

  useEffect(() => {
    const favoriteCities = localStorage.getItem('favoriteCities');
    if (favoriteCities) {
      setFavoriteCities(JSON.parse(favoriteCities));
    }
  }, []);

  const AddCityToFavorite = (city: City) => {
    const newCities = [...favoriteCities, city];
    setFavoriteCities(newCities);
    localStorage.setItem('favoriteCities', JSON.stringify(newCities));
  };

  const RemoveCityFromFavorite = (city: City) => {
    const newCities = favoriteCities.filter((c) => c.id !== city.id);
    setFavoriteCities(newCities);
    localStorage.setItem('favoriteCities', JSON.stringify(newCities));
  };

  const clearFavoriteCities = () => {
    setFavoriteCities([]);
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
