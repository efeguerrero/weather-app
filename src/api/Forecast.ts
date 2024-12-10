import { City } from '../Types/city';
import { WeatherForecast } from '../Types/weather';
import { baseURL, options } from './config';

export const getWeatherForecast = async (
  city: City
): Promise<WeatherForecast> => {
  // const coordinates = `${city.lat},${city.lon}`;

  // const response = await fetch(
  //   `${baseURL}/forecast.json?q=${coordinates}&days=5`,
  //   options
  // );

  const response = await fetch(
    'https://run.mocky.io/v3/70bfdf56-0beb-4480-827b-81daf21b8943'
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);

  return data;
};

// This function retrieves the weather forecast for a city for the next 5 days. It includes data for the current date but it is not real time.
