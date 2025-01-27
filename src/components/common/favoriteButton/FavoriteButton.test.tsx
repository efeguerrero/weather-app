import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavoriteButton from './FavoriteButton';
import { useFavoriteCitiesContext } from '../../../context/FavoriteCitiesContext';
import { createMockCity } from '../../../__tests__/__mocks__/mockCity';
import { createMockWeather } from '../../../__tests__/__mocks__/mockWeather';
import userEvent from '@testing-library/user-event';

jest.mock('../../../context/FavoriteCitiesContext', () => ({
  useFavoriteCitiesContext: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('FavoriteButton', () => {
  it('renders correctly with non-favorite city', () => {
    const city = createMockCity();
    const weather = createMockWeather();
    (useFavoriteCitiesContext as jest.Mock).mockReturnValue({
      favoriteCitiesData: [],
      AddCityToFavorite: jest.fn(),
      RemoveCityFromFavorite: jest.fn(),
    });

    render(<FavoriteButton city={city} weather={weather} />);

    expect(screen.getByRole('button')).toBeInTheDocument();

    expect(
      screen.getByTestId('FavoriteBorderOutlinedIcon')
    ).toBeInTheDocument();
  });

  it('renders correctly with favorite city', () => {
    const city = createMockCity();
    const weather = createMockWeather();
    (useFavoriteCitiesContext as jest.Mock).mockReturnValue({
      favoriteCitiesData: [{ city, weather }],
      AddCityToFavorite: jest.fn(),
      RemoveCityFromFavorite: jest.fn(),
    });

    render(<FavoriteButton city={city} weather={weather} />);

    expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument();
  });

  it('adds city to favorites on click when not a favorite', async () => {
    const city = createMockCity();
    const weather = createMockWeather();
    const addCityToFavorite = jest.fn();
    (useFavoriteCitiesContext as jest.Mock).mockReturnValue({
      favoriteCitiesData: [],
      AddCityToFavorite: addCityToFavorite,
      RemoveCityFromFavorite: jest.fn(),
    });

    render(<FavoriteButton city={city} weather={weather} />);

    await userEvent.click(screen.getByRole('button'));
    expect(addCityToFavorite).toHaveBeenCalledWith(city, weather);
  });

  it('removes city from favorites on click when a favorite', async () => {
    const city = createMockCity();
    const weather = createMockWeather();
    const removeCityFromFavorite = jest.fn();
    (useFavoriteCitiesContext as jest.Mock).mockReturnValue({
      favoriteCitiesData: [{ city, weather }],
      AddCityToFavorite: jest.fn(),
      RemoveCityFromFavorite: removeCityFromFavorite,
    });

    render(<FavoriteButton city={city} weather={weather} />);

    await userEvent.click(screen.getByRole('button'));

    expect(removeCityFromFavorite).toHaveBeenCalledWith(city);
  });
});
