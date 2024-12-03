import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Search from '../components/Search'; // Adjust import path if needed

describe('Search Component', () => {
  it('should render the search input field', () => {
    const { asFragment } = render(<Search searchByName="" onSearchChange={vi.fn()} />);

    // Snapshot test: Capture the component's rendered output
    expect(asFragment()).toMatchSnapshot();

    // Check if the input field is rendered
    const inputElement = screen.getByPlaceholderText('Search...');
    expect(inputElement).toBeInTheDocument();
  });

  it('should call onSearchChange with the correct value when typing', () => {
    const mockOnSearchChange = vi.fn();
    const { asFragment } = render(<Search searchByName="" onSearchChange={mockOnSearchChange} />);

    // Simulate typing 'Golden Retriever' into the search input
    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'Golden Retriever' } });

    // Snapshot test: Capture the component's rendered output after change
    expect(asFragment()).toMatchSnapshot();

    // Check if the onSearchChange function is called with the correct value
    expect(mockOnSearchChange).toHaveBeenCalledWith('Golden Retriever');
  });

  it('should show the correct value in the input', () => {
    const { asFragment } = render(<Search searchByName="Golden" onSearchChange={vi.fn()} />);

    // Snapshot test: Capture the component's rendered output
    expect(asFragment()).toMatchSnapshot();

    const inputElement = screen.getByPlaceholderText('Search...');
    // Check if the input field contains the correct value
    expect(inputElement).toHaveValue('Golden');
  });
});
