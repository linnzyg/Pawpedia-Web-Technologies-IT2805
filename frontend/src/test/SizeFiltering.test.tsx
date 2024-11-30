import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import SizeFiltering from '../components/SizeFiltering';

describe('SizeFiltering Component', () => {
  it('should render the size filtering dropdown', () => {
    const { asFragment } = render(<SizeFiltering onFilterChange={vi.fn()} filterBySize={null} />);
    
    // Snapshot test: Capture the component's rendered output
    expect(asFragment()).toMatchSnapshot();

    // Check if the dropdown is present
    const dropdown = screen.getByLabelText(/choose size/i);
    expect(dropdown).toBeInTheDocument();
  });

  it('should initialize with the provided filterBySize prop', () => {
    const { asFragment } = render(<SizeFiltering onFilterChange={vi.fn()} filterBySize={['Medium', 'Large']} />);
    
    // Snapshot test: Capture the component's rendered output
    expect(asFragment()).toMatchSnapshot();

    // Check if the correct sizes are selected initially
    const selectedSize = screen.getByText(/medium, large/i);
    expect(selectedSize).toBeInTheDocument();
  });
});
