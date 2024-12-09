import { render, screen } from '@testing-library/react';
import CurrentDate from './CurrentDate';
import { format } from 'date-fns';

describe('CurrentDate', () => {
  it('renders the current date in the correct format', () => {
    const currentDate = format(new Date(), 'EEEE d, MMMM yyyy');

    render(<CurrentDate />);

    expect(screen.getByText(currentDate)).toBeInTheDocument();
  });
});
