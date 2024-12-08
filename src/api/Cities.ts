import { Cities } from '../Types';

const baseURL = 'https://weatherapi-com.p.rapidapi.com';
const apiKey = process.env.REACT_APP_RAPID_API_KEY || '';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  },
};

export const getCities = async (city: string): Promise<Cities[]> => {
  try {
    const response = await fetch(`${baseURL}/search.json?q=${city}`, options);

    if (!response.ok) {
      console.log(response.status);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
