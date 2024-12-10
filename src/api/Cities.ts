import { City } from '../Types/city';
import { baseURL, options } from './config';

export const getCities = async (city: string): Promise<City[]> => {
  // const response = await fetch(`${baseURL}/search.json?q=${city}`, options);
  const response = await fetch(
    'https://run.mocky.io/v3/9e817c6f-dcdc-4344-a3e5-2df558df791c'
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};
