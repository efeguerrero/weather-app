import { City } from '../Types/city';
import { Weather } from '../Types/weather';

const baseURL = 'https://weatherapi-com.p.rapidapi.com';
const apiKey = process.env.REACT_APP_RAPID_API_KEY || '';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  },
};

export const getWeather = async (city: City): Promise<Weather> => {
  const coordinates = `${city.lat},${city.lon}`;

  const response = await fetch(
    `${baseURL}/current.json?q=${coordinates}`,
    options
  );

  // const response = await fetch(
  //   'https://run.mocky.io/v3/b08de06b-7e77-4b5c-9a3a-30909811cc12'
  // );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);

  return data;
};
