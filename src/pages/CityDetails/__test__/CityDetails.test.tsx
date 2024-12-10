import { render, screen, waitFor } from '@testing-library/react';
import CityDetails from '../index';
import { createMockCity } from '../../../__tests__/__mocks__/mockCity';
import { createMockWeather } from '../../../__tests__/__mocks__/mockWeather';

// Mock useParams with a configurable cityId
const mockUseParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockUseParams(),
}));

// Mock the components that are already tested!
jest.mock('../../../components/common/currentDate/CurrentDate', () => ({
  __esModule: true,
  default: () => <div data-testid="current-date" />,
}));

jest.mock('../../Home/WeatherInfo', () => ({
  __esModule: true,
  default: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="weather-info" data-loading={isLoading} />
  ),
}));

jest.mock('../../../components/Weather/ExtendedForecast', () => ({
  __esModule: true,
  default: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="extended-forecast" data-loading={isLoading} />
  ),
}));

const mockCity = createMockCity({ id: 1 });
const mockWeather = createMockWeather();
const mockWeatherForecast = {
  forecast: {
    forecastday: [],
  },
};

jest.mock('../../../api/Forecast', () => ({
  getWeatherForecast: () => Promise.resolve(mockWeatherForecast),
}));

// Mock context data!
const mockFavoriteCitiesData = [
  {
    city: mockCity,
    weather: mockWeather,
  },
];

jest.mock('../../../context/FavoriteCitiesContext', () => ({
  ...jest.requireActual('../../../context/FavoriteCitiesContext'),
  useFavoriteCitiesContext: () => ({
    favoriteCitiesData: mockFavoriteCitiesData,
  }),
}));

describe('CityDetails', () => {
  it('renders all components when city is found', async () => {
    mockUseParams.mockReturnValue({ cityId: '1' });
    render(<CityDetails />);

    expect(screen.getByTestId('current-date')).toBeInTheDocument();
    expect(screen.getByTestId('weather-info')).toBeInTheDocument();
    expect(screen.getByTestId('extended-forecast')).toBeInTheDocument();

    const weatherInfo = screen.getByTestId('weather-info');
    expect(weatherInfo.getAttribute('data-loading')).toBe('false');

    const extendedForecast = screen.getByTestId('extended-forecast');
    expect(extendedForecast.getAttribute('data-loading')).toBe('true');

    await waitFor(() => {
      expect(extendedForecast.getAttribute('data-loading')).toBe('false');
    });
  });

  it('displays error message when city is not found', () => {
    mockUseParams.mockReturnValue({ cityId: '999' });
    render(<CityDetails />);
    expect(screen.getByText('City not found')).toBeInTheDocument();
  });
});
