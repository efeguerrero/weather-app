import { render, screen } from '@testing-library/react';
import WeatherInfo from '../WeatherInfo';
import { City } from '../../../Types/city';
import { Weather } from '../../../Types/weather';
import { createMockCity } from '../../../__tests__/__mocks__/mockCity';
import { createMockWeather } from '../../../__tests__/__mocks__/mockWeather';

// Mock the custom components
jest.mock('../../../components/Weather/WeatherInfoCard', () => ({
  WeatherInfoCard: () => <div data-testid="weather-info-card" />,
}));

jest.mock('../../../components/Weather/WeatherSummaryCard', () => ({
  WeatherSummaryCard: () => <div data-testid="weather-summary-card" />,
}));

const mockCity: City = createMockCity();

const mockWeather: Weather = createMockWeather();

describe('WeatherInfo', () => {
  it('shows loading spinner when isLoading is true', () => {
    render(<WeatherInfo selectedCity={null} weather={null} isLoading={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows welcome message when no city is selected', () => {
    render(
      <WeatherInfo selectedCity={null} weather={null} isLoading={false} />
    );

    expect(
      screen.getByText(/Welcome to your Weather App!/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Search and select a city/i)).toBeInTheDocument();
  });

  it('shows error message when weather data is not available', () => {
    render(
      <WeatherInfo selectedCity={mockCity} weather={null} isLoading={false} />
    );

    expect(
      screen.getByText(/We could not retrieve the weather data/i)
    ).toBeInTheDocument();
  });

  it('renders weather information when all data is available', () => {
    render(
      <WeatherInfo
        selectedCity={mockCity}
        weather={mockWeather}
        isLoading={false}
      />
    );

    // We check if the mocked summary card is rendered. Component is already tested in the WeatherSummaryCard.test.tsx
    expect(screen.getByTestId('weather-summary-card')).toBeInTheDocument();

    // We check if all 4 info cards are rendered. Component is already tested in the WeatherInfoCard.test.tsx
    const infoCards = screen.getAllByTestId('weather-info-card');
    expect(infoCards).toHaveLength(4);
  });
});
