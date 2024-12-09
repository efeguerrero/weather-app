import { render, screen } from '@testing-library/react';
import { WeatherInfoCard } from '../WeatherInfoCard';

describe('WeatherInfoCard', () => {
  it('renders wind speed info correctly', () => {
    render(<WeatherInfoCard icon="Air" title="Wind Speed" value="10 km/h" />);

    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    expect(screen.getByText('10 km/h')).toBeInTheDocument();
  });

  it('renders humidity info correctly', () => {
    render(<WeatherInfoCard icon="WaterDrop" title="Humidity" value="75%" />);

    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders pressure info correctly', () => {
    render(
      <WeatherInfoCard icon="Pressure" title="Pressure" value="1015 hPa" />
    );

    expect(screen.getByText('Pressure')).toBeInTheDocument();
    expect(screen.getByText('1015 hPa')).toBeInTheDocument();
  });

  it('renders cloud cover info correctly', () => {
    render(<WeatherInfoCard icon="Cloud" title="Cloud Cover" value="25%" />);

    expect(screen.getByText('Cloud Cover')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
  });
});
