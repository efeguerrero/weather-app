import { render, screen } from '@testing-library/react';
import Favorites from '../index';
import { useFavoriteCitiesContext } from '../../../context/FavoriteCitiesContext';

// Mock the context hook
jest.mock('../../../context/FavoriteCitiesContext');

// Mock already tested components!
jest.mock('../../../components/Weather/WeatherSummaryCard', () => ({
  WeatherSummaryCard: () => <div data-testid="weather-summary-card" />,
}));

jest.mock('../../../components/common/currentDate/CurrentDate', () => ({
  __esModule: true,
  default: () => <div data-testid="current-date" />,
}));

const mockFavoriteCities = [
  {
    city: { id: '1', name: 'London' },
    weather: { temp: 20 },
  },
  {
    city: { id: '2', name: 'Paris' },
    weather: { temp: 25 },
  },
];

describe('Favorites', () => {
  it('renders weather cards when favorite cities exist', () => {
    (useFavoriteCitiesContext as jest.Mock).mockReturnValue({
      favoriteCitiesData: mockFavoriteCities,
      isLoading: false,
    });

    render(<Favorites />);

    const weatherCards = screen.getAllByTestId('weather-summary-card');
    expect(weatherCards).toHaveLength(2);
  });

  it('renders no favorites message when favorite cities list is empty', () => {
    (useFavoriteCitiesContext as jest.Mock).mockReturnValue({
      favoriteCitiesData: [],
      isLoading: false,
    });

    render(<Favorites />);

    expect(screen.getByText('No favorite cities exist.')).toBeInTheDocument();
  });
});
