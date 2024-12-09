import { act, renderHook, waitFor } from '@testing-library/react';
import {
  FavoriteCitiesContextProvider,
  useFavoriteCitiesContext,
} from '../FavoriteCitiesContext';
import { getWeather } from '../../api/Weather';
import { createMockCity } from '../../__tests__/__mocks__/mockCity';
import { createMockWeather } from '../../__tests__/__mocks__/mockWeather';

jest.mock('../../api/Weather');
const mockGetWeather = getWeather as jest.MockedFunction<typeof getWeather>;

const mockCity = createMockCity({ name: 'London' });
const mockWeather = createMockWeather();

describe('FavoriteCitiesContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    mockGetWeather.mockResolvedValue(mockWeather);
  });

  it('should add a city to favorites', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FavoriteCitiesContextProvider>{children}</FavoriteCitiesContextProvider>
    );

    const { result } = renderHook(() => useFavoriteCitiesContext(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // No Other way to do this but to add act(). Otherwise we get the console warning
    act(() => {
      result.current.AddCityToFavorite(mockCity, mockWeather);
    });

    // We add this to wait for the state to update. Otherwise its undefined
    await waitFor(() => {
      expect(result.current.favoriteCities).toEqual([mockCity]);
      expect(result.current.favoriteCitiesData).toEqual([
        { city: mockCity, weather: mockWeather },
      ]);
      expect(
        JSON.parse(localStorage.getItem('favoriteCities') || '[]')
      ).toEqual([mockCity]);
    });
  });

  it('should remove a city from favorites', async () => {
    const initialCities = [mockCity];
    localStorage.setItem('favoriteCities', JSON.stringify(initialCities));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FavoriteCitiesContextProvider>{children}</FavoriteCitiesContextProvider>
    );

    const { result } = renderHook(() => useFavoriteCitiesContext(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.RemoveCityFromFavorite(mockCity);
    });

    await waitFor(() => {
      expect(result.current.favoriteCities).toEqual([]);
      expect(result.current.favoriteCitiesData).toEqual([]);
    });
  });

  it('should clear all favorite cities', async () => {
    const initialCities = [mockCity, { ...mockCity, id: 2 }];
    localStorage.setItem('favoriteCities', JSON.stringify(initialCities));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FavoriteCitiesContextProvider>{children}</FavoriteCitiesContextProvider>
    );

    const { result } = renderHook(() => useFavoriteCitiesContext(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.clearFavoriteCities();
    });

    await waitFor(() => {
      expect(result.current.favoriteCities).toEqual([]);
      expect(result.current.favoriteCitiesData).toEqual([]);
    });
  });

  it('should load favorite cities from localStorage on mount', async () => {
    const initialCities = [mockCity];
    localStorage.setItem('favoriteCities', JSON.stringify(initialCities));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FavoriteCitiesContextProvider>{children}</FavoriteCitiesContextProvider>
    );

    const { result } = renderHook(() => useFavoriteCitiesContext(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.favoriteCities).toEqual(initialCities);
  });
});
