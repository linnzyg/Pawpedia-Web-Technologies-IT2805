import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import NameSorting from '../components/DogBreedGallery/SortFilterOrSearch/SortingMenu';

describe('NameSorting Component', () => {
  it('should render correctly with initial sort option', () => {
    const { asFragment } = render(<NameSorting onSortChange={vi.fn()} sortOption="asc" />);

    expect(asFragment()).toMatchSnapshot();

    const dropdown = screen.getByLabelText(/choose sorting/i);
    expect(dropdown).toBeInTheDocument();
  });
});
