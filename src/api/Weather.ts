import { City } from '../Types/city';
import { Weather } from '../Types/weather';
import { baseURL, options } from './config';

export const getWeather = async (city: City): Promise<Weather> => {
  const coordinates = `${city.lat},${city.lon}`;

  const response = await fetch(
    `${baseURL}/current.json?q=${coordinates}`,
    options
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};

// This fetch gets the REAL TIME weather data for a city.
