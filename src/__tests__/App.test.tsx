import { render } from '@testing-library/react';
import App from '../App';

// Mock the router component to avoid actual routing
jest.mock('../router/AppRouter', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-router">Router Content</div>,
}));

// Mock the FavoriteCitiesContextProvider to avoid actual context usage
jest.mock('../context/FavoriteCitiesContext', () => ({
  __esModule: true,
  FavoriteCitiesContextProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div data-testid="mock-favorites-provider">{children}</div>,
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});
