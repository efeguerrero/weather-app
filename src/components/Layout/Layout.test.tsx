import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import Layout from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
}));

describe('Layout', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the app title', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(screen.getByText('Weather App')).toBeInTheDocument();
  });

  it('renders filled home icon and outlined favorite icon when on home route', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(screen.getByTestId('HomeIcon')).toBeInTheDocument();
    expect(screen.getByTestId('FavoriteBorderIcon')).toBeInTheDocument();
  });

  it('renders outlined home icon and filled favorite icon when on favorites route', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/favorites' });

    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(screen.getByTestId('HomeOutlinedIcon')).toBeInTheDocument();
    expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument();
  });

  it('navigates to home when home icon is clicked', async () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    await userEvent.click(screen.getByTestId('HomeIcon'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigates to favorites when favorite icon is clicked', async () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    await userEvent.click(screen.getByTestId('FavoriteBorderIcon'));
    expect(mockNavigate).toHaveBeenCalledWith('/favorites');
  });

  it('renders the Outlet component', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});
