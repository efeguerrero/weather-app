import { City } from '../Types/city';
import { baseURL, options } from './config';

export const getCities = async (city: string): Promise<City[]> => {
  const response = await fetch(`${baseURL}/search.json?q=${city}`, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};
