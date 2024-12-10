import { getWeatherForecast } from '../Forecast';
import { createMockCity } from '../../__tests__/__mocks__/mockCity';

// Mock city data
const mockCity = createMockCity();

const mockWeatherData = {
  location: {
    name: 'London',
    country: 'UK',
  },
  forecast: {
    forecastday: [],
  },
};

describe('Forecast API', () => {
  global.fetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch weather forecast successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    const data = await getWeatherForecast(mockCity);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual(mockWeatherData);
  });

  it('should handle API error responses', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(getWeatherForecast(mockCity)).rejects.toThrow(
      'Error: 500 Internal Server Error'
    );

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
