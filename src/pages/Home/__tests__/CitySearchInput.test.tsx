import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearchInput from '../CitySearchInput';
import { getCities } from '../../../api/Cities';
import { createMockCity } from '../../../__tests__/__mocks__/mockCity';


jest.mock('../../../api/Cities');
const mockedGetCities = getCities as jest.MockedFunction<typeof getCities>;

const mockCities = [
  createMockCity({
    id: 1,
    name: 'London',
    region: 'England',
    country: 'UK',
  }),
  createMockCity({
    id: 2,
    name: 'Paris',
    region: 'Ile-de-France',
    country: 'France',
  }),
];

describe('CitySearchInput', () => {
  const mockSetSelectedCity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedGetCities.mockResolvedValue(mockCities);
  });

  it('renders the search input with placeholder text', () => {
    render(
      <CitySearchInput
        selectedCity={null}
        setSelectedCity={mockSetSelectedCity}
      />
    );
    expect(
      screen.getByPlaceholderText('Search for a city...')
    ).toBeInTheDocument();
  });
  it('allows user to type in the search input', async () => {
    render(
      <CitySearchInput
        selectedCity={null}
        setSelectedCity={mockSetSelectedCity}
      />
    );

    const input = screen.getByPlaceholderText(
      'Search for a city...'
    ) as HTMLInputElement;
    await userEvent.type(input, 'London');

    expect(input.value).toBe('London');
  });

  it('displays fetched cities in dropdown', async () => {
    render(
      <CitySearchInput
        selectedCity={null}
        setSelectedCity={mockSetSelectedCity}
      />
    );

    const input = screen.getByPlaceholderText('Search for a city...');
    await userEvent.type(input, 'Lon');

    //
    await waitFor(() => {
      expect(mockedGetCities).toHaveBeenCalledWith('Lon');
    });

    await waitFor(() => {
      expect(screen.getByText('London, England, UK')).toBeInTheDocument();
    });
  });

  it('calls setSelectedCity when a city is selected', async () => {
    render(
      <CitySearchInput
        selectedCity={null}
        setSelectedCity={mockSetSelectedCity}
      />
    );

    const input = screen.getByPlaceholderText('Search for a city...');
    await userEvent.type(input, 'Lon');

    await waitFor(() => {
      expect(screen.getByText('London, England, UK')).toBeInTheDocument();
    });

    const cityOption = screen.getByText('London, England, UK');
    await userEvent.click(cityOption);

    expect(mockSetSelectedCity).toHaveBeenCalledWith(mockCities[0]);
  });

  it('shows "No Cities" when no results are found', async () => {
    mockedGetCities.mockResolvedValueOnce([]);

    render(
      <CitySearchInput
        selectedCity={null}
        setSelectedCity={mockSetSelectedCity}
      />
    );

    const input = screen.getByPlaceholderText('Search for a city...');
    await userEvent.type(input, 'NonExistentCity');

    await waitFor(() => {
      expect(screen.getByText('No Cities')).toBeInTheDocument();
    });
  });
});
