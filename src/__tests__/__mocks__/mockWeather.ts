import { Weather } from '../../Types/weather';

export const createMockWeather = (overrides: Partial<Weather> = {}): Weather => {
  return {
    location: {
      name: 'Mock City',
      region: 'Mock Region',
      country: 'Mock Country',
      lat: 0.0,
      lon: 0.0,
      tz_id: 'UTC',
      localtime_epoch: 1234567890,
      localtime: '2024-03-20 12:00',
    },
    current: {
      last_updated_epoch: 1234567890,
      last_updated: '2024-03-20 12:00',
      temp_c: 20,
      temp_f: 68,
      is_day: 1,
      condition: {
        text: 'Sunny',
        icon: 'https://mock-weather-icon.com/sunny.png',
        code: 1000,
      },
      wind_mph: 5,
      wind_kph: 8,
      wind_degree: 180,
      wind_dir: 'S',
      pressure_mb: 1013,
      pressure_in: 29.92,
      precip_mm: 0,
      precip_in: 0,
      humidity: 65,
      cloud: 0,
      feelslike_c: 20,
      feelslike_f: 68,
      windchill_c: 20,
      windchill_f: 68,
      heatindex_c: 20,
      heatindex_f: 68,
      dewpoint_c: 13,
      dewpoint_f: 55,
      vis_km: 10,
      vis_miles: 6,
      uv: 5,
      gust_mph: 7,
      gust_kph: 11,
    },
    ...overrides,
  };
};
