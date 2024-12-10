export const baseURL = 'https://weatherapi-com.p.rapidapi.com';
export const apiKey = process.env.REACT_APP_RAPID_API_KEY || '';

export const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  },
};
