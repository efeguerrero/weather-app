import { render, screen } from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import { useFavoriteCitiesContext } from '../../../context/FavoriteCitiesContext';
import { WeatherSummaryCard } from '../WeatherSummaryCard';
import { createMockCity } from '../../../__tests__/__mocks__/mockCity';
import { createMockWeather } from '../../../__tests__/__mocks__/mockWeather';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../context/FavoriteCitiesContext', () => ({
  useFavoriteCitiesContext: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('WeatherSummaryCard', () => {
  it('renders city name, region, and country', () => {
    const city = createMockCity({
      name: 'Buenos Aires',
      region: 'Distrito Federal',
      country: 'Argentina',
    });
    const weather = createMockWeather();
    (useFavoriteCitiesContext as jest.Mock).mockReturnValue({
      favoriteCities: [],
      AddCityToFavorite: jest.fn(),
      RemoveCityFromFavorite: jest.fn(),
    });
    render(
      <WeatherSummaryCard
        selectedCity={city}
        weather={weather}
        showDetailsButton={false}
      />
    );

    expect(screen.getByText('Buenos Aires')).toBeInTheDocument();
    expect(screen.getByText('Distrito Federal, Argentina')).toBeInTheDocument();
  });

  it('renders weather condition and temperature', () => {
    const city = createMockCity();
    const weather = createMockWeather({
      current: {
        ...createMockWeather().current,
        temp_c: 25,
        condition: {
          ...createMockWeather().current.condition,
          text: 'Sunny',
          icon: 'icon.png',
          code: 1000,
        },
      },
    });
    (useFavoriteCitiesContext as jest.Mock).mockReturnValue({
      favoriteCities: [],
      AddCityToFavorite: jest.fn(),
      RemoveCityFromFavorite: jest.fn(),
    });

    render(
      <WeatherSummaryCard
        selectedCity={city}
        weather={weather}
        showDetailsButton={false}
      />
    );

    expect(screen.getByText('25°')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByAltText('Sunny')).toHaveAttribute('src', 'icon.png');
  });

  it('renders the details button when showDetailsButton is true', () => {
    const city = createMockCity();
    const weather = createMockWeather();
    (useFavoriteCitiesContext as jest.Mock).mockReturnValue({
      favoriteCities: [],
      AddCityToFavorite: jest.fn(),
      RemoveCityFromFavorite: jest.fn(),
    });
    render(
      <BrowserRouter>
        <WeatherSummaryCard
          selectedCity={city}
          weather={weather}
          showDetailsButton={true}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Extended Forecast')).toBeInTheDocument();
  });

  it('does not render the details button when showDetailsButton is false', () => {
    const city = createMockCity();
    const weather = createMockWeather();
    (useFavoriteCitiesContext as jest.Mock).mockReturnValue({
      favoriteCities: [],
      AddCityToFavorite: jest.fn(),
      RemoveCityFromFavorite: jest.fn(),
    });

    render(
      <WeatherSummaryCard
        selectedCity={city}
        weather={weather}
        showDetailsButton={false}
      />
    );

    expect(screen.queryByText('Extended Forecast')).not.toBeInTheDocument();
  });
});
