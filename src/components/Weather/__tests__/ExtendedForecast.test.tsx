import { render, screen } from '@testing-library/react';
import ExtendedForecast from '../ExtendedForecast';
import { mockWeatherForecast } from '../../../__tests__/__mocks__/mockWeatherForecast';
import { WeatherForecast } from '../../../Types/weather';

describe('ExtendedForecast', () => {
  it('renders loading state', () => {
    render(<ExtendedForecast weatherForecast={null} isLoading={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error message when no forecast data', () => {
    render(<ExtendedForecast weatherForecast={null} isLoading={false} />);
    expect(screen.getByText(/No weather forecast found/i)).toBeInTheDocument();
  });

  it('renders forecast data correctly', () => {
    render(
      <ExtendedForecast
        weatherForecast={mockWeatherForecast as unknown as WeatherForecast}
        isLoading={false}
      />
    );

    expect(screen.getByText('Extended Forecast')).toBeInTheDocument();

    expect(screen.getByText('Wednesday')).toBeInTheDocument();
    expect(screen.getByText('Thursday')).toBeInTheDocument();
    expect(screen.getByText('Friday')).toBeInTheDocument();
    expect(screen.getByText('Saturday')).toBeInTheDocument();
    expect(screen.getByText('Sunday')).toBeInTheDocument();

    expect(screen.getByText('21°')).toBeInTheDocument();
    expect(screen.getByText('12°')).toBeInTheDocument();
    expect(screen.getByText('23°')).toBeInTheDocument();
    expect(screen.getByText('14°')).toBeInTheDocument();
    expect(screen.getByText('18°')).toBeInTheDocument();
    expect(screen.getByText('11°')).toBeInTheDocument();
    expect(screen.getByText('25°')).toBeInTheDocument();
    expect(screen.getByText('15°')).toBeInTheDocument();
    expect(screen.getByText('24°')).toBeInTheDocument();
    expect(screen.getByText('13°')).toBeInTheDocument();
  });
});
