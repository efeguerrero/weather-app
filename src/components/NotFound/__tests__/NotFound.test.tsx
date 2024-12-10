import { render, screen, fireEvent } from '@testing-library/react';

import NotFound from '../NotFound';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NotFound', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders 404 heading', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<NotFound />);
    expect(screen.getByText('The route does not exist')).toBeInTheDocument();
  });

  it('renders home button', () => {
    render(<NotFound />);
    expect(screen.getByText('Go Back Home')).toBeInTheDocument();
  });

  it('navigates to home when button is clicked', () => {
    render(<NotFound />);

    const homeButton = screen.getByText('Go Back Home');
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
