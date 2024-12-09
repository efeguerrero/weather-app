import { getWeather } from '../Weather';
import { createMockCity } from '../../__tests__/__mocks__/mockCity';

// Mock city data
const mockCity = createMockCity();

const mockWeatherData = {
  location: {
    name: 'London',
    country: 'UK',
  },
  current: {
    temp_c: 18,
    condition: {
      text: 'Partly cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
    },
    humidity: 72,
    wind_kph: 15,
  },
};

describe('Weather API', () => {
  global.fetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch current weather successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    const data = await getWeather(mockCity);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://run.mocky.io/v3/b08de06b-7e77-4b5c-9a3a-30909811cc12'
    );
    expect(data).toEqual(mockWeatherData);
  });

  it('should handle API error responses', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(getWeather(mockCity)).rejects.toThrow(
      'Error: 500 Internal Server Error'
    );

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
